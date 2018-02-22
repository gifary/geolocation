$(document).ready(function() {
	var assetId = [];
	$('.stock-chart').each(function() {
		var id = $(this).parents('.card').attr('id');
		if(id.split('-').length === 1) {
			assetId.push(id);
			assetId.push(id + '-mobile')
		} else {
			assetId.push(id);
		}
	});
	var chart = new cryptoChart();
	charts = chart.createAssetChart(assetId);
	
	for(var key in charts) {
		var keySplit = key.split('-');
		let chart = charts[key];
		var data = chart.dataProvider;
		var conversion = chartData[keySplit[0]].conversion;
		
		for(var i = 0; i < conversion.length; i++) {
			var date = moment(conversion[i].crawledTime);
			data.push({
				value: conversion[i].value,
				date: date.format('DD MMMM'),
				time: date.format('HH:mm:ss')
			});
		}
		var lastConversion = conversion[conversion.length -1];
		$('#' + key).find('#asset-dollarvalue').text(lastConversion.value.toFixed(2));
		$('#' + key).find('#asset-dollarvalue').data('price-id', lastConversion.id);
		
		chart.dataProvider = data;
		chart.validateData();
	}
	
	$('.tooltips').tooltip();
	$.fn.followTo = function (pos) {
		var $this = this,
			$window = $(window);
		
		var maxScroll = $(document).height() - $window.height();
		
		$window.on('resize', function() {
			maxScroll = $(document).height() - $window.height();
		});
		
		$window.scroll(function (e) {
			if ($window.scrollTop() >= (maxScroll * 0.95)) {
				$this.css({
					position: 'relative',
					bottom: pos
				});
			} else {
				$this.css({
					position: 'fixed',
					bottom: 0
				});
			}
		});
	};
	
	$('.portfolio-toggle').followTo(0);
	
	
	new socket(assetId, 'wss://api.cryptoempire.io:8767');

	

});	