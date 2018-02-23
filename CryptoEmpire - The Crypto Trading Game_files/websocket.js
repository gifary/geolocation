(function() {
	'use strict';
	
	var Socket = function(id, url) {
		var _this = this;
		var socket;
		var connectAttempt = 1;
		var reconnectBaseTime = 100;
		var previousRate = {};
		var firstTime = true;
		
		_this.constructor = init();
		
		function init() {
			setPreviousRate();
			openWebsocketConnection();
			websocketEvt();
		}
		
		function openWebsocketConnection() {
			socket = new WebSocket(url);
		}
		
		function setPreviousRate() {
			for(var key in id) {
				previousRate[id[key]] = $('#' + id[key]).find('#asset-dollarvalue').text();
			}
		}
		
		function websocketEvt() {
			socket.onopen = function() {
				console.log('connected to websocket server');
				connectAttempt = 1;
			};
			socket.onmessage = function(_data) {
				var data = JSON.parse(_data.data);
				if(firstTime === true) {
					firstTime = false;
					
					$.each(data, function(key,val) {
						var idx = $.inArray(val.pair, id);
						if(typeof id[idx] === 'string') {
							var assetName = id[idx];
							var value = parseFloat(val.value).toFixed(2);
							previousRate[assetName] = value;
							updateChartData(assetName, value);
							$('#' + assetName).find('#asset-dollarvalue').text(value);
							$('#' + assetName).find('#asset-dollarvalue').data('price-id', val._id);
							
							updateChartData(assetName + '-mobileheader', value);
							$('#' + assetName + '-mobileheader').find('#asset-dollarvalue').text(value);
							$('#' + assetName + '-mobileheader').find('#asset-dollarvalue').data('price-id', val._id);
							
							updateChartData(assetName + '-mobile', value);
							$('#' + assetName + '-mobile').find('#asset-dollarvalue').text(value);
							$('#' + assetName + '-mobile').find('#asset-dollarvalue').data('price-id', val._id);
						}
					});
					return;
				}
				var assetNameIdx = $.inArray(data.pair, id);
				var assetName = id[assetNameIdx];
				
				if(data.pair === assetName) {
					var elem = $('#' + assetName);
					var elemMobile = $('#' + assetName + '-mobileheader');
					var elemM = $('#' + assetName + '-mobile');
					var value = parseFloat(data.value).toFixed(2);
					var prevRate = parseFloat(previousRate[assetName]);
					
					updateTotalPrice([elem, elemMobile], value);
					
					if(value > prevRate) {
						elem.find('.chart-down').addClass('chart-up').removeClass('chart-down');
						elem.find('.stock').removeClass('stock-down').addClass('stock-up');
						updateChartColor(assetName, ["#78EA37", "#000000"]);
						
						elemMobile.find('.chart-down').addClass('chart-up').removeClass('chart-down');
						elemMobile.find('.stock').removeClass('stock-down').addClass('stock-up');
						updateChartColor(assetName + '-mobileheader', ["#78EA37", "#000000"]);
						
						updateChartColor(assetName + '-mobile', ["#78EA37", "#000000"]);
					} else if(value < prevRate) {
						elem.find('.chart-up').addClass('chart-down').removeClass('chart-up');
						elem.find('.stock').removeClass('stock-up').addClass('stock-down');
						updateChartColor(assetName, ["#E91D75", "#000000"]);
						
						elemMobile.find('.chart-up').addClass('chart-down').removeClass('chart-up');
						elemMobile.find('.stock').removeClass('stock-up').addClass('stock-down');
						updateChartColor(assetName + '-mobileheader', ["#E91D75", "#000000"]);
						
						updateChartColor(assetName + '-mobile', ["#E91D75", "#000000"]);
					}
					
					updateChartData(assetName, value);
					updateChartData(assetName + '-mobileheader', value);
					updateChartData(assetName + '-mobile', value);
					previousRate[assetName] = value;
					elem.find('#asset-dollarvalue').text(value);
					elem.find('#asset-dollarvalue').data('price-id', data._id);
					elemMobile.find('#asset-dollarvalue').text(value);
					elemMobile.find('#asset-dollarvalue').data('price-id', data._id);
					elemM.find('#asset-dollarvalue').text(value);
					elemM.find('#asset-dollarvalue').data('price-id', data._id);
				}

				setStockForHoldings(assetName);
			};
			
			socket.onclose = function() {
				var waitTime = Math.pow(2, connectAttempt++) * reconnectBaseTime;
				setTimeout(function() {
					console.log('reconnecting in ' + waitTime);
					init();
				}, waitTime);
			}
		}
		
		function updateChartData(id, value) {
			var chart = charts[id];
			var data = chart.dataProvider;
			var date = moment();
			
			data.push({
				value: value,
				date: date.format('DD MMMM'),
				time: date.format('HH:mm:ss')
			});
			
			if(data.length > 8) {
				data.splice(0, data.length - 8);
			}
			chart.dataProvider = data;
			chart.validateData()
		}
		
		function updateChartColor(id, color) {
			charts[id].graphs[0].lineColor = color[0];
			charts[id].graphs[0].fillColors[0] = color[0];
			charts[id].balloon.borderColor = color[0];
			charts[id].balloon.color = color[1];
		}
		
		function updateTotalPrice(elems, price) {
			$.each(elems, function(idx, elem) {
				var amount = elem.find('input[name="qty"]').val();
				if(amount > 0) {
					elem.find('input[name="amount"]').val(amount * price).simpleMoneyFormat();
				} else {
					elem.find('input[name="amount"]').val(null);
				}
			});
		}
		
		function setStockForHoldings(assetName){
			var el = $(".holdings-desktop .stock[data-symbol='" + assetName + "']");
			var el_mobile = $(".holdings-mobile .stock[data-symbol='" + assetName + "']");
			
			var price = $(el).data('price');
			var get_price = $(".currency-div[data-unit='" + assetName + "']").html();

			if(typeof price != 'undefined'){
				if(get_price > price/1){
					$(el).removeClass('stock-down');
					$(el).addClass('stock-up');
					
					/* mobile */
					$(el_mobile).removeClass('stock-down');
					$(el_mobile).addClass('stock-up');
					
					$(el_mobile).parent().removeClass('tooltip-down');
					$(el_mobile).parent().addClass('tooltip-up');
					
				} else {
					
					$(el).addClass('stock-down');
					$(el).removeClass('stock-up');
					
					/* mobile */
					$(el_mobile).removeClass('stock-up');
					$(el_mobile).addClass('stock-down');

					$(el_mobile).parent().removeClass('tooltip-up');
					$(el_mobile).parent().addClass('tooltip-down');
					
				}
			}
		}
	};
	
	window.socket = Socket;
})();