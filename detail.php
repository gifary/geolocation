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
				'lng'=>$k->longitude
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
        var coords = JSON.parse('<?php echo $dataMapJson ?>');

        // Construct the polygon.
        var draw = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        draw.setMap(map);

        // Add a listener for the click event.
        // draw.addListener('click', showArrays);

        infoWindow = new google.maps.InfoWindow;
      }

      /** @this {google.maps.Polygon} */
      function showArrays(event) {
        // Since this polygon has only one path, we can call getPath() to return the
        // MVCArray of LatLngs.
        var vertices = this.getPath();

        var contentString = '<b>Bermuda Triangle polygon</b><br>' +
            'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
            '<br>';

        // Iterate over the vertices.
        for (var i =0; i < vertices.getLength(); i++) {
          var xy = vertices.getAt(i);
          contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
              xy.lng();
        }

        // Replace the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);

        infoWindow.open(map);
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAamC8mmFuHPiEX_R6xxOfdTC-ChuVOiew&callback=initMap">
    </script>
</body>
</html>