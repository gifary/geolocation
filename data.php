<?php
	
	//get geolocation first
	function getLongLat($postcode){
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "http://v0.postcodeapi.com.au/suburbs.json?postcode=$postcode",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET"
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);
		$res = json_decode($response);
		$data = array(
			'latitude'=>0,
			'longitude'=>0
		);
		
		foreach ($res as $k) {
			$data = array(
				'latitude'=>$k->latitude,
				'longitude'=>$k->longitude
			);
			break;
		}

		return $data;
	}

	function listSuburb($distance,$latitude,$longitude){
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "http://v0.postcodeapi.com.au/radius.json?distance=$distance&latitude=$latitude&longitude=$longitude",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET"
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		$html = "<table border=1>
			<thead>
				<tr>
					<td>suburb</td>
					<td>Postcode</td>
				</tr>
			</thead>
			<tbody>";
		$data = json_decode($response);
		foreach ($data as $k) {
			$html.="<tr><td>$k->name</td>";
			$html.="<td>$k->postcode</td></tr>";
		}
		$html.="</tbody></table>";

		echo $html;
	}

	$distance = $_POST['distance']*1000;
	$postcode = $_POST['postcode'];
	if(empty($distance) || empty($postcode)){
		echo "parameter distance and postcode required";
		return false;
	}
	if((int)$distance<0){
		echo "distance not valid";
		return false;
	}

	$data = getLongLat($postcode);
	if(empty($data['latitude'])){
		echo "postcode not valid";
		return false;
	}
	listSuburb((int)$distance,$data['latitude'],$data['longitude']);

?>