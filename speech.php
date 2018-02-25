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

# Imports the Google Cloud client library
use Google\Cloud\Speech\SpeechClient;

# Your Google Cloud Platform project ID
$projectId = 'job-portal-1497237615263';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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
        $speech = new SpeechClient([
		    'projectId' => $projectId,
		    'languageCode' => 'en-US',
		    'keyFilePath' => $serviceAccountPath,
		    
		]);

		# The name of the audio file to transcribe
		$fileName = $target_file;

		# The audio file's encoding and sample rate
		$options = [
		    'encoding' => 'LINEAR16'
		];

		# Detects speech in the audio file
		$results = $speech->recognize(fopen($fileName, 'r'), $options);
		$text='';
		foreach ($results as $result) {
		    $text.= " ".$result->alternatives()[0]['transcript'];
		}
		echo $text;

		# [END speech_quickstart]
		return true;
    } else {
        echo "Sorry, there was an error uploading your file.";
        return false;
    }
}




