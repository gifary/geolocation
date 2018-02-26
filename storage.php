<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require __DIR__ . '/vendor/autoload.php';
use \CloudConvert\Api;
 
$api = new Api("5d8_IG9VCT-hAkjBAMuZtDbXp3FsjVG8A6ZSMRR4GTnqIr4-HNtriRoP6N-4P_b8Sx_3BO47-lcog5oJWQNbqg");
 
$api->convert([
    "inputformat" => "wav",
    "outputformat" => "flac",
    "input" => "upload",
    "converteroptions" => [
        "audio_codec" => "FLAC",
        "audio_channels" => "1",
        "audio_frequency" => "8000",
    ],
    "file" => fopen('tes.wav', 'r'),
])
->wait() ->download();
?>