window.$ = window.jQuery = require('jquery');

(function() {
    var leftMenuButton = $('.left-menu-button');
    var body = $('body');

    leftMenuButton.on('click', function(e) {
        e.preventDefault();
        if (body.attr('data-left-menu-is-active') == "true") {
            $([body[0], leftMenuButton[0]]).attr('data-left-menu-is-active', "false");
        } else {
            $([body[0], leftMenuButton[0]]).attr('data-left-menu-is-active', "true");

        }
    });
})();