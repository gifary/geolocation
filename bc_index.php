<!DOCTYPE html>
<html>
<head>
	<title>Geolocation</title>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<!-- <link href="http://hrms.sas-hospitality.com/css/all.css" rel="stylesheet" type="text/css" /> -->
	<style type="text/css">
		body {
			font-family: Arial, Helvetica, sans-serif;
		}

		table {
			font-size: 1em;
		}

		.ui-draggable, .ui-droppable {
			background-position: top;
		}
	</style>
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
<form action="data.php" method="post">
	<label> Suburb/Postcode </label>
	<input type="text" name="name" id="name" class="ui-autocomplete-input">
	<input type="hidden" name="postcode" id="postcode">
	<label> Distance</label>
	<input type="number" min="1" name="distance" id="distance">
	<input type="submit" name="SUBMIT">
</form>
</body>
<script type="text/javascript">
	$('#name').autocomplete({
        source:'autocomplete.php',
        minlength:2,
        autoFocus:true,
        select:function(e,ui)
        {
            $('#postcode').val(ui.item.data);
            $('#name').val(ui.item.value);
        }
    });
</script>
</html>