describe("Overlay", function () {

    afterEach(function () {
        $("div[style*=\"position: fixed\"]").remove();// Clear all overlay
    });

    it("Create overlay object without any option", function () {
        var overlay = new Overlay();
        expect(overlay.getClassName()).toBeNull();
    });

    it("Create overlay object with/without CSS class name", function () {
        var overlay = new Overlay({className: "over-class"});
        expect(overlay.getClassName()).not.toBeNull();
        expect(overlay.getClassName()).toBe("over-class");

        var overlay1 = new Overlay({className: "mobile-over"});
        expect(overlay1.getClassName()).not.toBeNull();
        expect(overlay1.getClassName()).toBe("mobile-over");
        // No effect to the old object
        expect(overlay.getClassName()).toBe("over-class");
    });

    it("Make change of class name", function () {
        var overlay = new Overlay();
        expect(overlay.getClassName()).toBeNull();
        overlay.setClassName("mobile-over");
        expect(overlay.getClassName()).toBe("mobile-over");
        // It can cleared
        overlay.setClassName(null);
        expect(overlay.getClassName()).toBeNull();
    });

    it("Create overlay with pre-define style and style overriding", function () {

        var overlay = new Overlay({
            css: {
                color: "#fff"
            }
        });
        expect(overlay.css().color).toBe("#fff");
        overlay.css({
            color: "blue"
        });
        expect(overlay.css().color).toBe("blue");
    });

    it("Show overlay with no option", function () {
        var overlay = new Overlay();
        overlay.show();
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(1);
    });

    it("Show overlay with css class name set", function () {
        // Class name set in constructor
        var overlay1 = new Overlay({className: "overlay1"});
        overlay1.show();
        var $overlayElement = $("div.overlay1");
        expect($overlayElement.length).toBe(1);

        // Class name set while show
        var overlay2 = new Overlay();
        overlay2.show({className: "overlay2"});
        var $overlayElement = $("div.overlay2");
        expect($overlayElement.length).toBe(1);
    });

    it("Show overlay with calling css method ", function () {
        var overlay = new Overlay();
        spyOn(overlay, "css");
        overlay.show({
            css: {
                "background-color": "#ff0000",
                "color": "#fff"
            }
        });
        expect(overlay.css).toHaveBeenCalledWith({
                "background-color": "#ff0000",
                "color": "#fff"
            });
    });

    it("Show overlay with style set correctly", function () {
        var overlay = new Overlay();
        overlay.show({
            css: {
                "background-color": "#ff0000",
                "color": "#fff"
            }
        });
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(1);
        expect($overlayElement.css("background-color")).toBe("rgb(255, 0, 0)");
        expect($overlayElement.css("color")).toBe("rgb(255, 255, 255)");
    });

    it("Make sure overlay can be hidden", function () {
        var overlay = new Overlay();
        overlay.show();
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(1); // Overlay is shown

        overlay.hide();
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(0); // Overlay is shown

    });

    it("Make sure toggle work!", function () {
        var overlay = new Overlay();
        overlay.toggle();
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(1); // Overlay is shown
        overlay.toggle();
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(0); // Overlay is shown
    });

    it("It is disappear after click on it", function () {
        var overlay = new Overlay();

        overlay.show();
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(1); // Overlay is shown
        $overlayElement.trigger("click");
        expect(overlay.isShown()).toBeFalsy();
    });

    it("Custom click function is fired while clicking", function () {
        var callback = jasmine.createSpy('callback');

        var overlay = new Overlay();

        overlay.show({click: callback});
        var $overlayElement = $("div[style*=\"position: fixed\"]");
        expect($overlayElement.length).toBe(1); // Overlay is shown
        $overlayElement.trigger("click");
        expect(overlay.isShown()).toBeFalsy();
        expect(callback).toHaveBeenCalled();
    });


});