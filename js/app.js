;(function() {
    function updateHeightLR() {
        var r = $('.content-960_with-padding-1 .right-block');
        var l = $('.content-960_with-padding-1 .left-block');

        r.attr('style', '');
        l.attr('style', '');

        var rightH = r.outerHeight(); 
        var leftH = l.outerHeight(); 

        if(rightH > leftH)
            l.height(rightH-40);
    }
    function initMap() {
        if($('.map__insert').length < 1) return;
        
        var map = new GMaps({
            el: '.map__insert',
            lat: 55.7558,
            lng: 37.6173
        });
    }
    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // Edge (IE 12+) => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }
    function updateFlexIE(warpElem, contentElem, n) {
        warpElem.attr('style', '');
        contentElem.attr('style', '');

        var warpWidth       = warpElem.outerWidth();
        var itemLength      = contentElem.length;
        var contentWidth    = 0;
        var padding         = 0;

        contentElem.each(function(i, el) {

            
            contentWidth += parseInt($(el).outerWidth());
        });

        padding = (100 * (warpWidth - contentWidth) / warpWidth) / itemLength;

        warpElem.width(warpWidth);
        contentElem.css({
            'padding-left': padding / n + '%',
            'padding-right': padding / n + '%'
        });
    }
    function addIEClass(ie) {
       $('html').addClass('ie ie-' + ie);
    };
    function coursesTabs() {
        var items = $('.courses-tabs__tabs li')
        items.click(function() {
            var id = $(this).data('id');
            items.removeClass('active');
            $(this).addClass('active');

            $('.courses-content').hide();
            $('#' + id).show();
        });
    }
    $(document).ready(function() {
        var ieVersion = detectIE();
        if(ieVersion !== false && ieVersion < 11) {
            addIEClass(ieVersion);
            var idInterval = setInterval(function() {
                if($('html').hasClass('ie')) {
                    clearInterval(idInterval);
                    updateFlexIE($('.nav__header ul'), $('.nav__header ul > li'), 1.99999);
                    updateFlexIE($('.footer__nav'), $('.footer__nav > li'), 1.89999);
                }
            }, 100);
        }

        if($.fn.owlCarousel) {
            $('.page-content .owl-carousel').owlCarousel({
                loop:true,
                margin:10,
                nav:true,
                items:3,
                responsive:{
                    0:{
                        items:1
                    },
                    400:{
                        items:2
                    },
                    550:{
                        items:3
                    }
                }
            });
        };

        $('.buy-form .btn_green').click(function(e) {
            e.preventDefault();

            $(this).hide();
            $('.buy-form__hidden').show();
            $('.buy-form input:first').focus();
        });


        $('.right-page-toggle').click(function() {
            $('.right-page-toggle, .right-page').toggleClass('active');
        });

        coursesTabs();
        initMap();
        updateHeightLR();
        $(window).resize(updateHeightLR);
    });
})();