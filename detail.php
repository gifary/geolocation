<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 50%;
        width: 50%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
</head>
<body>
	<?php include 'data.php'  ?>
	<?php 
		$dataMap=[];
		foreach ($list_postcode as $k) {
			$dataMap[] =array(
				'lat'=>$k->latitude,
				'lng'=>$k->longitude,
        'name' => $k->name
			);	
		}
		$dataMapJson= json_encode($dataMap);
	?>
	<div id="map" style="margin:50px;">
		
	</div>
    <script>

      // This example creates a simple polygon representing the Bermuda Triangle.
      // When the user clicks on the polygon an info window opens, showing
      // information about the polygon's coordinates.

      var map;
      var infoWindow;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: <?php echo $dataMap[0]['lat'] ?>, lng: <?php echo $dataMap[0]['lng'] ?>},
          mapTypeId: 'terrain'
        });

        // Define the LatLng coordinates for the polygon.
        /*var coords = JSON.parse('//<?php echo $dataMapJson ?>');

        // Construct the polygon.
        var draw = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        draw.setMap(map);*/
        infowindow = new google.maps.InfoWindow();
        <?php for($i=0; $i<count($dataMap); $i++ ) { ?>
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(<?php echo $dataMap[$i]['lat'] ?>, <?php echo $dataMap[$i]['lng'] ?>),
              map: map
            });
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<?php echo $dataMap[$i]['name'] ?>');
                infowindow.open(map, marker);
              }
            })(marker, <?php echo $i; ?>));
        <?php } ?>

        // Add a listener for the click event.
        infoWindow = new google.maps.InfoWindow;
      }
      
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAamC8mmFuHPiEX_R6xxOfdTC-ChuVOiew&callback=initMap">
    </script>
</body>
</html>