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
use \CloudConvert\Api;

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
    return false;
}
// Check file size

// Allow certain file formats
if($imageFileType != "wav"  ) {
    echo "Sorry, only wav files are allowed.";
    return false;
}
// Check if $uploadOk is set to 0 by an error
if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        
	$ffmpeg = FFMpeg\FFMpeg::create([
		'ffmpeg.binaries'  => '/usr/bin/ffmpeg',
	    'ffprobe.binaries' => '/usr/bin/ffprobe',
	    'timeout'          => 3600, // The timeout for the underlying process
	    'ffmpeg.threads'   => 12,   // The number of threads that FFMpeg should use
	]);
	$audio = $ffmpeg->open($target_file);

	$format = new FFMpeg\Format\Audio\Flac();
	// $format->setAudioCodec("flac");
	$format->on('progress', function ($audio, $format, $percentage) {
	    echo "$percentage % transcoded";
	});

	$format
	    ->setAudioChannels(1)
	    ->setAudioKiloBitrate(256);

	$name="audio".substr(md5(mt_rand()), 0, 7);
	$audio->save($format, $name.".flac");
	unlink($target_file);
	//upload to gs
	
	// Upload a file to the bucket.
	/*$storage = new StorageClient([
	    'projectId' => $projectId,
	    'keyFilePath' => $serviceAccountPath
	]);
	$bucketName = 'job-portal-1497237615263.appspot.com';
	$bucket = $storage->bucket($bucketName);
	$name="audio".substr(md5(mt_rand()), 0, 7).".wav";
	$bucket->upload(
	    fopen($target_file, 'r'),[
        	'name' => $name
    	]
	);
	$bucket->upload(
	    fopen($target_file, 'r'),
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

    
    $object = $storage->bucket($bucketName)->object($name);

    $options = [
	    'encoding' => 'LINEAR16',
	    "language_code"=> "en-US"
		// "sampleRateHertz"=> 16000
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
    $text='';
    if ($operation->isComplete()) {
        $results = $operation->results();
        foreach ($results as $result) {
            $text.= " ".$result->alternatives()[0]['transcript'];
        }
    }
    unlink($target_file);
    //delete on google storage
    $object->delete();
    echo $text;
    return true;*/

} else {
    echo "Sorry, there was an error uploading your file.";
    return false;
}

