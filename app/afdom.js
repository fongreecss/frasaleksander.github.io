require('whatwg-fetch');
require('./helpers/object-asign.js');
require('classlist-polyfill');
window.MutationObserver = require('mutation-observer');
window.Mustache         = require('mustache');

(function(factory){
    'use strict';
    if('object' == typeof exports) {
        module.exports = factory();
    } else if('function' != typeof window.ModuleName ) {
        window.ModuleName = factory();
    }
})(function(){
	'use strict';

	var instance = 0;
	var AFDOM = {};
	var _private = {};

	AFDOM.elements = [];
	var dfault = {
		'id' : '',
		'class' : '',
		'appendTo' : document.body,
		'type' : 'div',
	};
	
	AFDOM.ltIE9 = function() {
		return (window.attachEvent && !window.addEventListener) ? 1 : 0;
	};
	
	_private.appendElement = function(elementSettings, appendTo){
		elementSettings.insertBefore = null;
		elementSettings.appendTo = appendTo ? appendTo : document.body;
		return AFDOM.createElement(elementSettings);
	};

	_private.insertBefore = function(elementSettings, insertBefore){
		elementSettings.insertBefore = insertBefore;
		elementSettings.appendTo = null;
		return AFDOM.createElement(elementSettings);
	};

	_private.getAttributes = function(element) {
		var newObject = {};
		Object.keys(element.attributes).map(function(key){
			var ea = element.attributes;
			var tmpObj = {};
			tmpObj[ea[key].name] = ea[key].value;
			Object.assign(newObject, tmpObj);
		});
		return newObject;
	};

	_private.html = function(element, content) {
		element.innerHTML = content;
		return _private.getReturnObject(element);
	}

	_private.insertTemplate = function(input) {
		if("function" == typeof onBegin) {
			onBegin();
		}

		var o = Object.assign({}, {
			'template'       : '',
			'data'           : '',
			'appendTo'       : '',
			'onBegin'        : function(){},
			'onSuccess'      : function(){}
		}, input);

		if(!(o.template && o.data)) {
			return 0;
		}

		var jsonReq = fetch(o.data);
		var tempReq = fetch(o.template);

		jsonReq.then(function(res1){
			if(res1.ok) {
				return res1.json();
			}
		}).then(function(content1){
			tempReq.then(function(res2){
				return res2.text();
			}).then(function(content2){
				var render = Mustache.render(content2, content1);
				o.appendTo.innerHTML = render;
				if("function" == typeof onSuccess) {
					onSuccess([content1, content2]);
				}
			});
		});
	};

	_private.getReturnObject = function(element, instanceNr){
		
		var rObject = {};
		rObject.element = element;

		if(!(rObject.instanceNr = element.getAttribute('data-instance-nr'))) {
			rObject.instanceNr = ++instance;
			element.setAttribute('data-instance-nr', rObject.instanceNr);
		}
		
		rObject.getAttributes = function() {
			return _private.getAttributes(element);
		};

		rObject.appendElement = function(elementSettings) {
			return _private.appendElement(elementSettings, element);
		};

		rObject.insertBefore = function(elementSettings) {
			return _private.insertBefore(elementSettings, element);
		};

		rObject.getParent = function(){
			return _private.getReturnObject(element.parentElement);
		};

		rObject.html = function(content){
			return _private.html(element, content);
		}

		rObject.insertTemplate = function(input) {
			input.appendTo = element;
			_private.insertTemplate(input);
			return _private.getReturnObject(element);
		}

		return rObject;

	};

	AFDOM.getElement = function(element){
		if("string" == typeof element) {
			element = document.getElementById(element);
		}
		return _private.getReturnObject(element);
	};

	AFDOM.createElement = function(elementSettings) {
		var settings = Object.assign({}, dfault, elementSettings);
		var tempElement = document.createElement(settings.type);

		Object.keys(settings)
			.filter(function(key){
				var excludedKeys = ["appendTo", "insertBefore", "type", "html"];
				return excludedKeys.indexOf(key) === -1;
			}).map(function(key){
				if(settings[key]) {
					tempElement.setAttribute(key, settings[key]);
				}
			});

		if(settings.insertBefore) {
			settings.insertBefore.parentNode.insertBefore(tempElement, settings.insertBefore);
		} else {
			settings.appendTo.appendChild(tempElement);
		}

		return _private.getReturnObject(tempElement);
	};

	return AFDOM;
});