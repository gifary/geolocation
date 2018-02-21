(function() {
	'use strict';
	
	var CryptoChart = function() {
		var _this = this;
		
		_this.createAssetChart = createAssetChart;
		_this.createPortfolioPieChart = createPortfolioPieChart;
		_this.createPortfolioLineChart = createPortfolioLineChart;
		_this.getChartInstance = getChartInstance;
		
		function createAssetChart(ids) {
			var result = [];
			
			for(var i = 0; i < ids.length; i++) {
				var chart;
				var assetName = ids[i];
				var element = $('#' + assetName).find('#chart')[0];
				var split = assetName.split('-');
				
				if(split.length >= 1 && split[1] === 'mobile') {
					chart = assetChartMobile(element);
				} else if(split.length >= 1 && split[1] === 'mobileheader') {
					chart = assetChartDesktop(element, true)
				} else {
					chart = assetChartDesktop(element);
				}
				
				result[assetName] = chart;
			}
			return result;
		}
		
		function createPortfolioPieChart(id, data, displayLegend) {
			var chart;
			if(displayLegend === true) {
				chart = AmCharts.makeChart(id, {
					type: 'pie',
					outlineColor: '#1A2667',
					glueToTheEnd: true,
					outlineThickness: 0,
					outlineAlpha: 0,
					processTimeout: 1000,
					fixedPosition: true,
					addClassNames: true,
					balloon: {
						adjustBorderColor: false,
						borderColor: false,
						color: '#000000',
						cornerRadius: 3,
						fillColor: '#000000',
						fillAlpha: 1
					},
					legend: {
						position: 'right',
						autoMargins: true,
						align: 'center',
						color: '#FFFFFF',
						valueText: '[[close]]',
						markerLabelGap: 5,
						labelWidth: 55,
						maxColumns: 2,
						markerSize: 10
					},
					dataProvider: data,
					titleField: 'asset',
					valueField: 'value',
					balloonText: '[[asset]]: [[class]] [[id]] ($[[value]])',
					labelRadius: 5,
					radius: '42%',
					innerRadius: '60%',
					colorField: 'color',
					export: {
						enabled: true
					}
				});
			} else {
				chart = AmCharts.makeChart(id, {
					type: 'pie',
					processTimeout: 1000,
					glueToTheEnd: true,
					outlineColor: '#1A2667',
					outlineThickness: 0,
					outlineAlpha: 0,
					fixedPosition: true,
					addClassNames: true,
					balloon: {
						adjustBorderColor: false,
						borderColor: false,
						color: '#000000',
						cornerRadius: 3,
						fillColor: '#000000',
						fillAlpha: 1
					},
					dataProvider: data,
					titleField: 'asset',
					valueField: 'value',
					balloonText: '[[asset]]: [[class]] [[id]] ($ [[value]])',
					labelRadius: 5,
					radius: '42%',
					innerRadius: '60%',
					colorField: 'color',
					export: {
						enabled: true
					}
				});
			}
			
			return chart;
		}
		
		function createPortfolioLineChart(id, data) {
			var chart = AmCharts.makeChart(id, {
				type: 'serial',
				glueToTheEnd: true,
				theme: 'light',
				addClassNames: true,
				marginTop: 10,
				marginRight: 0,
				marginLeft: 0,
				zoomControl: {
					zoomControlEnabled: false
				},
				responsive: {
					enabled: true
				},
				balloon: {
					adjustBorderColor: true,
					color: '#000000',
					cornerRadius: 3,
					borderAlpha: 0,
					fillAlpha: 1,
					fillColor: '#E91D75',
					pointerOrientation: 'top'
				},
				dataProvider: data,
				valueAxes: [{
					axisAlpha: 0,
					position: 'left',
					gridColor: '#FFFFFF',
					axisColor: '#FFFFFF',
					color: '#FFFFFF',
				}],
				graphs: [{
					id: 'g1',
					balloonText: "<b><span style='font-size:14px;color:#ffffff;font-weight:bold;'>$ [[value]]</span><br/><small style='color:#ffffff;'>[[date]] - [[time]]</small></b>",
					bullet: 'round',
					bulletSize: 8,
					lineColor: '#00ECFF',
					lineThickness: 2,
					negativeLineColor: '#1D6594',
					valueField: 'value',
					fillColorsField: 'lineColor',
					fillColors: '#81E9FB',
					fillAlpha: 1,
					color: '#FFFFFF'
				}],
				chartCursor: {
					categoryBalloonDateFormat: 'YYYY-MM-DD',
					cursorAlpha: 0,
					valueLineEnabled: false,
					valueLineBalloonEnabled: false,
					valueLineAlpha: 0.5,
					fullWidth: true,
					categoryBalloonEnabled: true,
					cursorColor: '#E91D75',
					zoomable: false,
					zooming: false,
					valueZoomable: false,
					balloonPointerOrientation: 'vertical',
					fontSize: 14
				},
				dataDateFormat: 'YYYY-MM-DD',
				categoryField: 'date',
				categoryAxis: {
					// parseDates: true,
					minorGridAlpha: 0.1,
					dashLength: 1,
					minorGridEnabled: true,
					axisColor: '#857F9A',
					boldLabels: true,
					color: '#857F9A',
					fillAlpha: 0,
					labelFunction: function(valueText, date, categoryAxis) {
						if(date.dataContext.type === 'today') {
							return date.dataContext.time
						} else {
							return valueText
						}
					}
				},
				export: {
					enabled: false
				}
			});
			
			return chart;
		}
		
		function assetChartDesktop(element, hideBalloon) {
			hideBalloon = typeof hideBalloon === 'undefined' ? false : hideBalloon;
			var chart = AmCharts.makeChart(element, {
				type: 'serial',
				theme: 'light',
				balloon: {
					adjustBorderColor: false,
					borderColor: '#78EA37',
					color: '#000000',
					cornerRadius: 3,
					fillColor: '#78EA37',
					fillAlpha: 1
				},
				dataProvider: [],
				categoryField: 'day',
				autoMargins: false,
				marginLeft: 5,
				marginRight: 5,
				marginTop: 5,
				marginBottom: 0,
				precision: 2,
				graphs: [{
					valueField: 'value',
					balloonText: '<b>$ [[value]] </b> <br/> <small>[[date]], [[time]]</small>',
					bulletField: 'bullet',
					showBalloon: !hideBalloon,
					bullet: 'round',
					lineColor: '#78EA37',
					fillColors: ['#78EA37','#342651'],
					fillAlphas: 0.3,
					bulletSize: 3,
					pointPosition: 'middle'
				}],
				valueAxes: [{
					gridAlpha: 0,
					axisAlpha: 0
				}],
				categoryAxis: {
					gridAlpha: 0,
					axisAlpha: 0,
					startOnAxis: true
				}
			});
			
			return chart;
		}
		
		function assetChartMobile(element) {
			var chart = AmCharts.makeChart(element, {
				type: 'serial',
				theme: 'light',
				balloon: {
					adjustBorderColor: false,
					borderColor: '#78EA37',
					color: '#000000',
					cornerRadius: 3,
					fillColor: '#78EA37',
					fillAlpha: 1,
					pointerOrientation: 'top'
				},
				dataProvider: [],
				categoryField: 'day',
				autoMargins: false,
				marginLeft: 5,
				marginRight: 5,
				marginTop: 5,
				marginBottom: 0,
				precision: 2,
				graphs: [{
					valueField: 'value',
					balloonText: '<b>$ [[value]] </b> <br/> <small>[[date]], [[time]]</small>',
					bulletField: 'bullet',
					showBalloon: true,
					bullet: 'round',
					lineColor: '#78EA37',
					fillColors: ['#78EA37','#342651'],
					fillAlphas: 0.3,
					lineThickness: 2,
					bulletSize: 9,
					pointPosition: 'middle'
				}],
				// chartCursor: {
				// 	categoryBalloonDateFormat: 'YYYY-MM-DD',
				// 	cursorAlpha: 0,
				// 	valueLineEnabled: false,
				// 	valueLineBalloonEnabled: false,
				// 	valueLineAlpha: 0.5,
				// 	fullWidth: true,
				// 	categoryBalloonEnabled: true,
				// 	cursorColor: '#E91D75',
				// 	zoomable: false,
				// 	zooming: false,
				// 	valueZoomable: false,
				// 	balloonPointerOrientation: 'vertical',
				// 	fontSize: 14
				// },
				valueAxes: [{
					gridAlpha: 0,
					axisAlpha: 0
				}],
				categoryAxis: {
					gridAlpha: 0,
					axisAlpha: 0,
					startOnAxis: true
				}
			});
			
			return chart;
		}
		
		function getChartInstance(id) {
			var allCharts  = AmCharts.charts;
			for(var i = 0; i < allCharts.length; i++) {
				if(typeof allCharts[i].div != 'undefined'){
					if(id === $(allCharts[i].div).attr('id')) {
						return allCharts[i];
					}
				}
			}
		}
	};
	
	window.cryptoChart = CryptoChart;
})();