var jQuery = window.jQuery = window.$ = require("jquery");
window.Mustache = require("mustache");


function renderTemplate(templateFile, jsonFile, renderElementSelector) {
	// var template = $(templateSelector).html();
	var rendered = null;
	var jsonReq = $.getJSON(jsonFile);
	var tempReq = $.get(templateFile);
	$.when(tempReq, jsonReq).done(function(data1, data2){
		var render = Mustache.render(data1[0], data2[0]);
		$(renderElementSelector).html(render);
	});
}

(function ($) {
	renderTemplate('view/work.mustache', 'view/work.json', '#work-collection');
})(window.jQuery);