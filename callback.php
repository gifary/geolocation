<?php
require __DIR__ . '/vendor/autoload.php';
use \CloudConvert\Api;
use \CloudConvert\Process;
$api = new Api("5d8_IG9VCT-hAkjBAMuZtDbXp3FsjVG8A6ZSMRR4GTnqIr4-HNtriRoP6N-4P_b8Sx_3BO47-lcog5oJWQNbqg");

$process = new Process($api, $_REQUEST['url']);
$process->refresh()->download("xxx.flac");