$(function() {
	var chart_object;
	$('.action-buysell').change(function() {
        var cardBody = $(event.target).closest('.card-body');
        var value = $(this).val();
        
        cardBody.find('.btn-action > img').hide();
        cardBody.find('.' + value).show();
    });
	
	$('a[data-target="#signin-modal"], a[data-target="#signup-modal"]').on('click', function() {
		var target = $(this).data('target');
		$('.login-modal').modal('hide');
		setTimeout(function() {
			$(target).modal('show')
		}, 500);
		return false;
	});
	
	$('.assets-slide').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		infinite: true,
		autoplay: false,
		dots: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	
	$("h2.t-currency").each(function () {
		var numChars = $(this).text().length;
		if ((numChars >= 1) && (numChars < 8)) {
			$(this).css("font-size", "28px");
		}
		else if ((numChars >= 8) && (numChars < 10)) {
			$(this).css("font-size", "24px");
		}
		else if ((numChars >= 10) && (numChars < 12)) {
			$(this).css("font-size", "18px");
		}
		else if ((numChars >= 12) && (numChars < 20)) {
			$(this).css("font-size", "16px");
		}
		else {
			$(this).css("font-size", "24px");
		}
	});
	
	$('#btn-signup').on('click', function() {
		$('#register-form').submit();
	});
	
	$('#remember-me-checkbox').on('change', function() {
		$('#login-form > input[type="checkbox"]').prop('checked', $(this).prop('checked'));
	});
	
	$('#btn-signin').on('click', function() {
		$('#login-form').submit();
	});
	
	$('.btnintro-desktop').on('click', function() {
		var intro = introJs();
		intro.setOptions({
			steps: [
				{
					element: '#step1',
					intro: 'This is a tooltip'
				},
				{
					element: '#step2',
					intro: 'Ok, wasn\'t that fun?',
					position: 'right'
				},
				{
					element: '#step3',
					intro: 'More features, more fun.',
					position: 'right'
				},
				{
					element: '#step4',
					intro: 'Another step.',
					position: 'right'
				},
				{
					element: '#step5',
					intro: 'Get it, Use it.'
				}
			],
			showStepNumbers: true
		});
		intro.start();
	});
	
	$('.btnintro-mobile').on('click', function() {
		var intro2 = introJs();
		intro2.setOptions({
			showStepNumbers: false
		});
		
		intro2.start();
	});
	
	/* MONEY FORMAT AND AUTO FILL */
	// $(".form-asset-wrapper .form-row .col-3 input.form-control").keyup(function(){
	// 	var assetValue = parseFloat($(this).parents('.card').find('#asset-dollarvalue').text());
	// 	price_to_post = assetValue;
	// 	$(this).parent().next().next('.col-7').find('input.form-control').val(this.value * assetValue);
	// 	$(this).parent().next().next('.col-7').find('input.form-control').simpleMoneyFormat();
		
	// });
	// $(".form-asset-wrapper .form-row .col-7 input.form-control").keyup(function(){
	// 	var assetValue = parseFloat($(this).parents('.card').find('#asset-dollarvalue').text());
	// 	price_to_post = assetValue;
	// 	$(this).parent().prev().prev('.col-3').find('input.form-control').val(parseFloat(this.value) / assetValue);
	// 	$(this).parent().next().next('.col-7').find('input.form-control').simpleMoneyFormat();
	// });
	
	// $(".form-asset-wrapper input.form-control").keyup(function(){
	// 	var assetValue = parseFloat($(this).parents('.card-body').find('#asset-dollarvalue').text());
	// 	price_to_post = assetValue;
	// 	$(this).parent().parent().parent().next('.input-group').find('input.form-control').val(Math.ceil(this.value * assetValue));
	// 	$(this).parent().parent().parent().next('.input-group').find('input.form-control').simpleMoneyFormat();
	// });
	// $(".input-group input.form-control").keyup(function(){
	// 	var assetValue = parseFloat($(this).parents('.card-body').find('#asset-dollarvalue').text());
	// 	price_to_post = assetValue;
	// 	var value = this.value.replace(/\,/g, '');
	// 	$(this).parent().prev('.form-asset-wrapper').find('input.form-control').val(value / assetValue);
		
	// 	$(this).parent().next().next('.col-7').find('input.form-control').simpleMoneyFormat();
	// 	$(this).simpleMoneyFormat();
	// });

	$(".card input.form-control").keyup(function(){
		var assetElement = $(this).parents('.card').find('#asset-dollarvalue');
		var element_qty = $(this).parents('.card').find($('input[name="qty"]'));
		var element_amount = $(this).parents('.card').find($('input[name="amount"]'));
		var qty = element_qty.val().replace(/\,/g, '');

		var assetValue = parseFloat(assetElement.text());
		
		//remove non digit character except period
		this.value = this.value.replace(/[^0-9,.]/g, '');

		if($(this).attr('name') == 'qty'){
			var total = qty * assetValue;
			element_qty.data('qty', qty);
			element_amount.val((total !== 0 ? total : null));
			element_amount.simpleMoneyFormat();
		} else if($(this).attr('name') == 'amount') {
			$(this).simpleMoneyFormat();
			var amount = element_amount.val().replace(/\,/g, '');
			var qty = amount / assetValue;
			element_qty.data('qty', qty);
			element_qty.val(qty.toFixed(3));
		}
	});
	
	
	/* ERROR LIMIT */
	// $( ".card .card-body form .form-assets input.form-control" ).on('input', function() {
	// 	if ($(this).val().length > 2) {
	// 		$(this).popover('show');
	// 	} else {
	// 		$(this).popover('hide');
	// 	}
	// });

	/* FORM ACTION HOLDING */
	//prevent double inputs
	var submit_status = 0;
	$(document).on('click',".btn-action", function(){
		if(submit_status == 0){
			var _this = $(this);
			submit_status = 1;
			var parent = $(this).parents('.card');
			var form = parent.find($(".form-asset-wrapper"));
			var priceId = parent.find('#asset-dollarvalue').data('price-id');
			var priceToPost = parent.find('#asset-dollarvalue').text();
			var assetHoldingElm = parent.find('#asset-walletvalue');
			var holding = parseFloat(assetHoldingElm.text());
			var amountElm = form.find('input[name="amount"]');
			var qtyElm = form.find('input[name="qty"]');
			
			//is action from mobile ? 
			var action = '';
			if(typeof $(this).data('action') != 'undefined'){
				action = '&action=' + $(this).data('action');
			} else {
				action = '&action=' + parent.find('.action-buysell').val();
			}
			
			var data = action + '&qty=' + qtyElm.data('qty');
			console.log(data)
			
			if(amountElm.val() === "0" || qtyElm.val() === "0" || amountElm.val() === '' || qtyElm.val() === '') {
				qtyElm.popover('show');
				setTimeout(function() {
					qtyElm.popover('hide');
					submit_status = 0;
				}, 5000);
			} else {
				$.post(form.attr('action'), data + "&unit=" + form.data('unit') + "&price=" + priceToPost + "&price_id=" + priceId, function(res){
					if(res.status_code == 200) {
						var action = form.find('select').val() || _this.data('action');
						var qty = parseFloat(form.find('input').val()) || 0;
						
						$(".modal-success .message").html(res.msg);
						$(".modal-success").modal('show');
						
						/* Emptying the field */
						parent.find('input[name="qty"]').val('');
						parent.find('input[name="amount"]').val('');
						
						/* Update Asset holding */
						holding += (action == 'buy' ? qty : qty * -1);
						assetHoldingElm.text(holding.toFixed(2));
						
						/* Update Holding chart on portfolio page */
						updateHoldingChart();
						
						get_current_holding();
						if($('#portfolio-popup').hasClass('d-none')) {
							$('#portfolio-popup').removeClass('d-none');
						}
					} else {
						$(".modal-error .message").html(res.msg);
						$(".modal-error").modal('show');
					}
					submit_status = 0;
				});
			}
		}
		return false;
	});
	
	var icons = document.querySelectorAll("img[data-jdenticon-hash]");
	for(var i = 0; i < icons.length; i++) {
		var icon = icons[i];
		var hash = icon.getAttribute('data-jdenticon-hash');
		var width = icon.width || icon.clientWidth || 30;
		var height = icon.height || icon.clientHeight || 30;
		var svg = jdenticon.toSvg(hash, Math.min(width, height));
		
		icon.src = "data:image/svg+xml," + encodeURIComponent(svg);
	}

	/* Your current holding */
	var chart = new cryptoChart();

	get_current_holding();
	
	function get_current_holding(){
		$(".holdings-desktop").html('');
		$('.assets-slide').slick('unslick');
		$(".holdings-mobile").html('');
		var first = true;
		$('.tooltips').tooltip('destroy');
		$('.tooltip.show').remove();
		$('#asset-filter').html('<option value="all" selected> Total Portfolio</option>');
		$.get("/get_holding", function(res){
			var portfolioBreakdown = [];
			
			if(res.data.length > 1) {
				if($('#portfolio-popup').hasClass('d-none')) {
					$('#portfolio-popup').removeClass('d-none');
				}
			}
			
			$.each(res.data, function(idx, val){
				if(parseFloat(val.total) === 0) {
					return;
				}
				var li;
				if(val.symbol !== 'USD'){
					portfolioBreakdown.push({
						"asset": val.unit_name, 
						"value": parseInt(val.total) * (val.price!=null ? val.price : 1),
						"class": parseInt(val.total),
						"pair" : val.pair,
						"id" : val.symbol
					});
					
					$('#asset-filter').append('<option value="' + val.symbol + '" data-pair="' + val.pair + '">' + val.unit_name + '</option>');
				} else {
					portfolioBreakdown.push({
						"asset": val.unit_name, 
						"value": parseInt(val.total) * (val.price!=null ? val.price : 1),
					});
				}
				
				
				/* HOLDING DESKTOP */
				if(val.unit_type == 'crypto') {
					li = '<li class="tooltips" data-asset-name=\'' + val.unit_name + '\' data-symbol=\'' + val.symbol + '\' data-pair=\'' + val.pair + '\' data-amount=\'' + val.total + '\' data-toggle="tooltip" data-placement="auto" data-html="true" title="<span class=\'tooltip-dynamic-update\' data-pair=\'' + val.pair + '\' >$ ' + formatNumber(val.price * val.total) + '</span>">'
				} else {
					li = '<li class="tooltips" data-toggle="tooltip" data-placement="auto" data-html="true" title="You have <span class=\'money-tooltip\'>$ ' + (val.total/1).toLocaleString('en-US') + '</span> USD remaining to spend">';
				}
				
				li += '<img src="/assets/img/assets/' + (val.symbol).toLowerCase() + '.png" width="16"/> <span class="money">' + val.total + '</span> ' + val.symbol + ' <span class="stock" data-symbol="' + val.pair +'" data-price="' + val.price + '"></span>';
				li += "</li>";
				
				$('.holdings-desktop').append(li);
				/* HOLDING DESKTOP */
				
				/* HOLDING MOBILE */
				if(first) {
					li = '<li class="list-inline-item text-center">';
					first = false;
				} else {
					li = '<li class="list-inline-item">';
				}
				
				li += '<div class="tooltip-up">';
				if(val.price > 0) {
					li += '<img src="/assets/img/assets/' + (val.symbol).toLowerCase() + '.png" width="16"/> <span class="money">' + val.total + '</span> ' + val.symbol + ' <span class="stock" data-symbol="' + val.pair + '" data-price="' + val.price + '"></span></div>';
					li += '<small class="tooltip-dynamic-update" data-pair=\'' + val.pair + '\'>$ <span class="money">' + formatNumber(val.price * val.total) + '</span> USD</small>';
				} else {
					li += '<img src="/assets/img/assets/' + (val.symbol).toLowerCase() + '.png" width="16"/> <span class="money">' + val.total + '</span> <span class="stock" data-symbol="' + val.pair + '" data-price="' + val.price + '"></span></div>';
					li += '<small>' + val.symbol + '</small>';
				}

				li += '</li>';
				$('.holdings-mobile').append(li);
				
				$(".money-tooltip,.money").simpleMoneyFormat();
				$('.tooltips').tooltip();
				/* this function is only for homepage */
				if(window.location.pathname.length < 2){
					chart_object = chart.createPortfolioPieChart('chartdiv', portfolioBreakdown);

					/* IT MAY CAUSES BAD PERFORMANCE FOR JS */
					$(".container.content .currency-div[data-unit='" + val.pair + "']").on('DOMSubtreeModified', function(){
						var price = parseFloat($(this).html().replace(/\,/g, ''));
						var pair = $(this).data('unit');
						var symbol = $(".tooltips[data-pair='" + pair + "']").data('symbol');
						var asset_name = $(".tooltips[data-pair='" + pair + "']").data('asset-name');
						var amount = parseFloat($(".tooltips[data-pair='" + pair + "']").attr('data-amount'));
						
						if(price > 0 && amount > 0){
							$(".tooltip-dynamic-update[data-pair='" + pair +"']").html('$ ' + formatNumber(amount * price));
							$(".tooltips[data-pair='" + pair + "']").attr('data-original-title', '<span class=\'money-tooltip tooltip-dynamic-update\' data-pair=\'' + pair + '\' data-amount=\'' + amount + '\'>$ ' + formatNumber(amount * price) + '</span>');
							// console.log((amount * price),amount ,price, '<span class=\'money-tooltip tooltip-dynamic-update\' data-pair=\'' + pair + '\'>$ ' + formatNumber(amount * price) + '</span>');
							
							var newPortfolioBreakdown = $.grep(portfolioBreakdown, function( n, i ) {
								// return ( n !== 5 && i > 4 );
								if(typeof n.pair == 'undefined' || pair != n.pair){
									return n;
								}
							});

							newPortfolioBreakdown.push({
								"asset": asset_name, 
								"value": amount * price,
								"class": amount,
								"id" : symbol
							});

							/* SORT ARRAY */
							newPortfolioBreakdown.sort(function(a, b) {
								var nameA = a.asset.toUpperCase(); // ignore upper and lowercase
								var nameB = b.asset.toUpperCase(); // ignore upper and lowercase
								if (nameA < nameB) {
									return -1;
								}
								if (nameA > nameB) {
									return 1;
								}
							
								// names must be equal
								return 0;
							});
							
							chart_object.dataProvider = newPortfolioBreakdown;
							chart_object.validateData();
						}
					})
					
				}
			});

			$('.assets-slide').slick({
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				autoplay: false,
				dots: true,
				autoplaySpeed: 3000,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true,
							dots: false
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 320,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
			
		})
	}

	/* adding format number */
	function formatNumber(value){
		var result = '';
		value = value.toString();
		if(value.indexOf('.') != -1) {
			var split_value = value.split('.');
			var valueArray = split_value[0].trim().split('');
		} else {
			var valueArray = value.split('');
		}
		var resultArray = [];
		var counter = 0;
		var temp = '';
		for (var i = valueArray.length - 1; i >= 0; i--) {
			temp += valueArray[i];
			counter++
			if(counter == 3){
				resultArray.push(temp);
				counter = 0;
				temp = '';
			}
		};
		if(counter > 0){
			resultArray.push(temp);				
		}
		for (var i = resultArray.length - 1; i >= 0; i--) {
			var resTemp = resultArray[i].split('');
			for (var j = resTemp.length - 1; j >= 0; j--) {
				result += resTemp[j];
			};
			if(i > 0){
				result += ','
			}
		};
		
		if(value.indexOf('.') != -1) {
			var decimal = split_value[1].substring(0,2);
			if(decimal != '00'){
				result = result + "." + decimal;
			}
		}
		return result;
	}
	
	function updateHoldingChart() {
		var chart = new cryptoChart().getChartInstance('portfoliochart');
		
		if(typeof chart !== 'undefined') {
			var data = [];
			
			$.get('/ajax/holding-chart', function(response) {
				if(response.status === 200) {
					for(var asset in response.data) {
						data.push({
							asset: response.data[asset].name,
							value: response.data[asset].value,
							class: response.data[asset].qty,
							id: response.data[asset].symbol
						});
					}
					
					chart.dataProvider = data;
					chart.validateData();
				}
			});
		}
	}
});