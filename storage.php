<?php
var_dump(getenv('PATH'));
var_dump(exec('which ffmpeg'));
var_dump(ini_get('open_basedir'));
var_dump(is_file(exec('which ffmpeg')));
var_dump(is_executable(exec('which ffmpeg')));
?>