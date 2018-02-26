<?php
/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

# [START speech_quickstart]
# Includes the autoloader for libraries installed with composer
require __DIR__ . '/vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Exception;
use Google\Cloud\Speech\SpeechClient;
use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Core\ExponentialBackoff;

# Your Google Cloud Platform project ID
$projectId = 'job-portal-1497237615263';

# Instantiates a client

$serviceAccountPath =__DIR__ . '/google.json';



$target_dir = "resources/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size

// Allow certain file formats
if($imageFileType != "wav"  ) {
    echo "Sorry, only wav files are allowed.";
    $uploadOk = 0;
    return false;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    return false;
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        
    	$fileName = $target_file;

    	
		$ffmpeg = FFMpeg\FFMpeg::create();
		$audio = $ffmpeg->open($fileName);

		$format = new FFMpeg\Format\Audio\Flac();
		$format->on('progress', function ($audio, $format, $percentage) {
		    echo "$percentage % transcoded";
		});

		$format
		    ->setAudioChannels(1)
		    ->setAudioKiloBitrate(256);
		$name="audio".substr(md5(mt_rand()), 0, 7);
		$audio->save($format, $name.".flac");
		unlink($fileName);
		//upload to gs
		$storage = new StorageClient([
		    'projectId' => $projectId,
		    'keyFilePath' => $serviceAccountPath
		]);
		$bucketName = 'job-portal-1497237615263.appspot.com';

		
		$bucket = $storage->bucket($bucketName);

		// Upload a file to the bucket.
		

		$bucket->upload(
		    fopen($name.".flac", 'r')
		);
		$bucket->upload(
		    fopen($name.".flac", 'r'),
		    [
		        'predefinedAcl' => 'publicRead'
		    ]
		);
		//show transcript
		// Create the speech client
	    $speech = new SpeechClient([
	        'projectId' => $projectId,
		    'languageCode' => 'en-US',
		    'keyFilePath' => $serviceAccountPath
	    ]);

	    
	    $object = $storage->bucket($bucketName)->object($name.".flac");

	    $options = [
		    'encoding' => 'FLAC',
    		"sampleRateHertz"=> 8000
		];

	    // Create the asyncronous recognize operation
	    $operation = $speech->beginRecognizeOperation(
	        $object,
	        $options
	    );

	    // Wait for the operation to complete
	    $backoff = new ExponentialBackoff(10);
	    $backoff->execute(function () use ($operation) {
	        // print('Waiting for operation to complete' . PHP_EOL);
	        $operation->reload();
	        if (!$operation->isComplete()) {
	            throw new Exception('Job has not yet completed', 500);
	        }
	    });

	    // Print the results
	    if ($operation->isComplete()) {
	    	$text='';
	        $results = $operation->results();
	        foreach ($results as $result) {
	            $text.= " ".$result->alternatives()[0]['transcript'];
	        }
	    }
	    unlink($name.".flac");
	    echo $text;
	    return true;

    } else {
        echo "Sorry, there was an error uploading your file.";
        return false;
    }
}




