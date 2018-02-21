(function ($) {
	$.fn.simpleMoneyFormat = function(val) {
		this.each(function(index, el) {		
			var elType = null; // input or other or direct
			var value = null;
			// get value
			if($(el).is('input') || $(el).is('textarea')){
				value = $(el).val().replace(/,/g, '');
				elType = 'input';
			} else if(val >= 0) {
				value = el;
				elType = 'direct';
			} else {
				value = $(el).text().replace(/,/g, '');
				elType = 'other';
			}
			// if value changes
			$(el).on('paste keyup', function(){
				value = $(el).val().replace(/,/g, '');
				formatElement(el, elType, value); // format element
			});
			formatElement(el, elType, value); // format element
		});
		function formatElement(el, elType, value){
			var result = '';
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
			if(elType == 'input'){
				$(el).val(result);
			} else if(elType == 'direct'){
				return result;
			}else {
				$(el).empty().text(result);
			}
		}
	};
}(jQuery));