window.$ = window.jQuery = require('jquery');
window.HistoryX = require('./vendor/history.js-master/scripts/bundled/html4+html5/jquery.history.js');

(function() {
    var leftMenuButton = $('.left-menu-button');
    var body = $('body');
    var _window = $(window);

    var setIsLeftMenuActive = function(isLeftMenuActive) {
        if (typeof isLeftMenuActive != "undefined" && isLeftMenuActive == false) {
            $([body[0], leftMenuButton[0]]).attr('data-is-left-menu-active', "false");
            return;
        }
        if (body.attr('data-is-left-menu-active') == "true") {
            $([body[0], leftMenuButton[0]]).attr('data-is-left-menu-active', "false");
        } else {
            $([body[0], leftMenuButton[0]]).attr('data-is-left-menu-active', "true");
        }
    };

    leftMenuButton.on('click', function(e) {
        e.preventDefault();
        setIsLeftMenuActive();
    });

    _window.on('load', function() {
        setIsLeftMenuActive(false);
    });
})();


(function($, window) {
    window.App = {};
    App.element = $('#app');
    App.isLeftMenuActive = function() {
        return App.element.attr('data-is-left-menu-active') == "true" ? "true" : "false";
    };
    App.toggleAttributeState = function(element, attributeName, possibleValues, forceValue) {

    };

})(window.jQuery, window);

/*
 * 
 */
(function() {
    HistoryX.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
    });
    HistoryX.pushState({ state: 1 }, "State 1", "?state=1");
})();

/*
 *
 */
(function($, MutationObserver, undefined) {

    var target = App.element[0];

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {

        });
    });


    var config = { attributes: true, childList: true, characterData: true }


    observer.observe(target, config);

    // later, you can stop observing
    //observer.disconnect();
}(window.jQuery, require('mutation-observer')));