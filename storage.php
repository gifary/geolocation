<?php
require __DIR__ . '/vendor/autoload.php';
$FFmpeg = new FFmpeg;
$FFmpeg->input( 'tes.wav' )->output( 'tes.flac' )->ready();
echo "done";
?>