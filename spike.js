var FSOverlay = function (option) {
    var option = option || {};
    var $overlayHandle = null;
    var defaultClassName = null;
    if (option.className) {
        defaultClassName = option.className;
    }
    var overlayStyle = {
        "position": "fixed",
        "top": 0,
        "left": 0,
        "right": 0,
        "bottom": 0,
        "background": "none repeat scroll 0% 0% black",
        "opacity": 0.4,
        "filter": "alpha(opacity=40)",
        "cursor": "pointer",
        "z-index": 1
    };
    var hideOverlay = function () {
        if ($overlayHandle) {
            $overlayHandle.hide();
            $overlayHandle.remove();
        }
        $overlayHandle = null;
    }
    var customClickEven = null;
    var clickEven = function (evt) {
        if (typeof(customClickEven) == "function") {
            customClickEven(evt);
        }

        hideOverlay();
    }

    return {
        isShown: function () {
            if ($overlayHandle) {
                return true;
            }
            return false;
        },

        css: function (style) {
            for (var attr in style) {
                overlayStyle[attr] = style[attr];
            }
        },

        show: function (option) {
            var option = option || {};
            if (!$overlayHandle) {
                $overlayHandle = $("<div></div>");
            }

            if (option.style) {
                this.css(option.style);
            }

            if (option.click && typeof(option.click) == "function") {
                customClickEven = option.click;
            }

            $overlayHandle.css(overlayStyle);
            if (defaultClassName) $overlayHandle.addClass(defaultClassName);
            $overlayHandle.click(clickEven);
            $("body").append($overlayHandle);
        },

        hide: function () {
            hideOverlay();
        },

        toggle: function (option) {
            var option = option || {};
            if (this.isShown()) {
                this.hide(option);
            } else {
                this.show(option);
            }
        }
    };
};

var fsMobileOverlay = FSOverlay({className: "fs-mobile-overlay"});

var setUpNavToggle = function () {
    var $buttonToggle = $("a.nav-toggle");
    $buttonToggle.css({"z-index": 2});
    $buttonToggle.click(function () {
        fsMobileOverlay.toggle({
            click: function () {
                $buttonToggle.click();
            }
        });
    });

};

setUpNavToggle();