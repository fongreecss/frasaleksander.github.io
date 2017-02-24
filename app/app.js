window.$ = window.jQuery = require('jquery');

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
    }

})(window.jQuery, window);


(function($, MutationObserver) {

    var target = App.element[0];

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (typeof $(target).attr(mutation.attributeName) != "undefined") {
                console.log($(target).attr(mutation.attributeName));
            }

        });
    });


    var config = { attributes: true, childList: true, characterData: true }


    observer.observe(target, config);

    // later, you can stop observing
    //observer.disconnect();
}(window.jQuery, require('mutation-observer')));