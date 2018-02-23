<?php
	error_reporting(E_ALL);
	ini_set('display_errors', TRUE);
	ini_set('display_startup_errors', TRUE);
	$term = $_GET['term'];
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://v0.postcodeapi.com.au/suburbs.json?q=$term",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "GET"
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);
	if ($err) {
	  echo "cURL Error #:" . $err;
	} else {
		$data = json_decode($response);
		$results=null;
		foreach ($data as $k) {
            $results[]=['value'=>$k->name ."-".$k->postcode,'data'=>$k->postcode];
        }
        header('Content-Type: application/json');
        echo json_encode($results);
	}
?>