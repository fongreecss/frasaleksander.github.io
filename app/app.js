window.AFDOM 		= require('./afdom.js');
window.Isotope      = require('isotope-layout');
window.deepmerge    = require("deepmerge");
window.PageData     = {};


(function(){
	'use strict';
	var firstScriptElement = AFDOM.getElement(document.getElementById('ga-js'));
	if(!AFDOM.ltIE9()) {

	}
	firstScriptElement
		.insertBefore({
			'id' : 'wrapper',
		})
			.appendElement({
				'id' : 'content',
			})
				.appendElement({
					'id' : 'main',
				}).insertTemplate({
					'template' : 'view/work.mustache',
					'data'     : 'view/work.json'
				})
	;

})();



/*PageData.setActiveSection = function(sectionId) {
	if(!document.getElementById(sectionId)) {
		return;
	}
	var allSections   = document.querySelectorAll('.main-section');
	var activeSection = document.getElementById(sectionId);
	allSections.forEach(function(el){
		el.classList.remove('active-section');	
	});
	activeSection.classList.add('active-section');
};

PageData.renderTemplate = function(sectionId, part) {
	renderTemplate('view/' + sectionId + '.mustache', 'view/' + sectionId + '.json', '#'+sectionId+'>.inner');
}

PageData.init = function() {
	this.pageHash = window.location.hash;
	this.pages    = this.pageHash.split('/').map(function(arrEl) {
		return arrEl.replace("#", "");
	});
	this.pageName = this.pages[0];
	this.subpages = this.pages.slice(1,this.pages.length);
	this.setActiveSection(this.pageName);
	PageData.renderTemplate(this.pageName);
};



(function() {
	PageData.init();
	window.addEventListener('hashchange', function(e) {
		PageData.init();
	}, false);
})();

function renderTemplate(templateFile, jsonFile, renderElementSelector, onbegin, onsuccess) {
	
	if("function" == typeof onbegin) {
		onbegin();
	}

	var jsonReq = fetch(jsonFile);
	var tempReq = fetch(templateFile);

	jsonReq.then(function(res1){
		if(res1.ok) {
			return res1.json();
		}
	}).then(function(content1){
		tempReq.then(function(res2){
			return res2.text();
		}).then(function(content2){
			var render = Mustache.render(content2, content1);
			document.querySelector(renderElementSelector).innerHTML = render;
			if("function" == typeof onsuccess) {
				onsuccess();
			}
		});
	});
}
*/