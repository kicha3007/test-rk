/* ****************************** accordion ****************************** */



$(function () {

    $('[data-owl-carousel]').each(function () {
        var $this = $(this);
        var itemsCount = $this.data("owlItems");
        var itemsCountPad = $this.data("owlItemsPad");
        var itemsMargin = $this.data("owlItemsMargin");
        var itemsDots = $this.data("owlItemsDots");
        var itemsLoop = $this.data("owlItemsLoop");
        var itemsNav = $this.data("owlItemsNav");
        var itemsAutoplay = $this.data("owlItemsAutoplay");
        var itemsAutoplayTimeout = $this.data("owlItemsAutoplayTimeout");
        var itemsAutoplayHoverPause = $this.data("owlItemsAutoplayHoverPause");

        $this.owlCarousel({
            items: (itemsCount ? itemsCount : 1),
            margin: (itemsMargin ? itemsMargin : 20),
            nav: (itemsNav ? itemsNav : true),
            loop: (itemsLoop ? itemsLoop : true),
            autoplay: (itemsAutoplay ? itemsAutoplay : false),
            autoplayTimeout: (itemsAutoplayTimeout ? itemsAutoplayTimeout : 3000),
            autoplayHoverPause: (itemsAutoplayHoverPause ? itemsAutoplayHoverPause : false),
            dots: (itemsDots ? itemsDots : true),
            navSpeed: 1000,
            dotsSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: itemsCountPad ? itemsCountPad : (itemsCount ? itemsCount : 1)
                },
                1000: {
                    items: itemsCount ? itemsCount : 1
                }
            }
        });
    });


    /* ------------------- fancybox ------------------- */

    $("[data-fancybox]").fancybox({
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });


    var $accordItem = $("[data-it-accord-item]");
    var $accordToggle = $("[data-it-accord-toggle]");

    $accordItem.hide();
    $accordToggle.on("click", function () {
        var x = this;
        if ($(this).next($accordItem).css("display") === "none") {
            $(this).closest("[data-it-accord-wrap]").find("[data-it-accord-item]").fadeOut(500);
            $(this).closest("[data-it-accord-wrap]").find("[data-it-sign]").removeClass("active");
        }

        $(this).next($accordItem).slideToggle(200, function () {
        });
        $(this).parent().find("[data-it-sign]").toggleClass("active");
    });


    /* ------------------- ajax ------------------- */

    $(document).on("submit", "[data-it-form]", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $data = new FormData($form[0]);
        $.post(
            {
                url: $form.attr("action"),
                data: $data,
                dataType: "json",
                timeout: 30000,
                processData: false,
                contentType: false,
                success: function (data) {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html(data.message);
                },

                error: function () {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html("Извините, временные проблемы на сервере, попробуйте ещё раз!");
                }
            }
        )
    });

    /* ------------------- switcher ------------------- */

        var tabButton = $("[data-switch]");

        tabButton.on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).closest("[data-switch-wrap]").find(".active").removeClass("active");
            $(this).parent().addClass("active");

            var target = $(this).data("switch");

            var dataTabValue = ("[data-tab='" + target + "']");

            $(dataTabValue).closest("[data-tabs-wrap]").find(".active").removeClass("active");

            var dataValue = $(dataTabValue).addClass("active");

            var pos = $(dataValue).position();

        });




    /* ------------------- mask ------------------- */

    $("[data-phone]").mask("+7 (999) 99-99-999");


    /* ****************************** dropdown-menu ****************************** */

    var $trigger = $('[data-trigger]');

    $trigger.on("click", function () {
        var $this = $(this);
        $this.toggleClass('active');
        var triggerName = $this.data("trigger");
        var $nav = $("[data-it-nav='" + triggerName + "']");
        $nav.slideToggle(600, function () {
            if ($(this).css("display") === "none") {
                $(this).removeAttr("style");
            }
        });
    });


    /* ------------------- show-more ------------------- */

    var showMoreButtonText = $("[data-show-more-button]");

    $("[data-it-accord-wrap-item]").hide();

    showMoreButtonText.on("click", function (e) {
        e.preventDefault();

        var $this = $(this);

        var showMoreButtonCloseText = $this.data("showMoreButton");
        var showMoreButtonCloseTextToButton = $this.children("[data-show-more-text]").text();

        $this.children("[data-show-more-text]").text(showMoreButtonCloseText);
        $this.data("showMoreButton", showMoreButtonCloseTextToButton);

        var showMoreButtonValue = $this.data("showMoreButton");
        var showMoreText = $this.data("showBlock");
        $("[" + showMoreText + "]").slideToggle();
        $this.toggleClass("active");

    });



});
