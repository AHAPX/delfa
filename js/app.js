;(function($) {
    var flex = {
        isSupport: function() {
            var test = document.createElement('test');
            test.style.display = 'flex';
            return test.style.display === 'flex';
        },
        emulate: function(content, contentItems, fustify, update) {
            var timeOut = null;

            function init() {
                if(update !== 'true' && content.data('flexbox') === 'emulate') return;
                content.data('flexbox', 'emulate');

                content[0].removeAttribute('style');
                contentItems.each(function() {
                    $(this)[0].removeAttribute('style');
                });

                window.clearTimeout(timeOut);
                timeOut = window.setTimeout(function() {
                    var contentWidth = content.outerWidth();
                    var contentLength = contentItems.length;
                    var freeSpace = contentWidth;
                    var padding = 0;

                    contentItems.each(function() {
                        freeSpace -= $(this).outerWidth();
                    });

                    if(fustify === true) {
                        padding = (freeSpace / contentLength) / 2;
                        padding += padding / (contentLength-1);
                    }
                    else {
                        padding = (freeSpace / contentLength) / 2;
                    }

                    contentItems.css({
                        'padding-left': padding,
                        'padding-right': padding,
                    });
                }, 100);
            }

            init();
        }
    };
    function emulateFlex() {
        if(window.innerWidth < 960) return;

        $('.footer__nav, .header__nav ul').addClass('not-support-flexbox');
        flex.emulate($('.footer__nav'), $('.footer__nav > li'), true);
        flex.emulate($('.header__nav ul'), $('.header__nav ul > li > a'));
    }
    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        return false;
    }
    function toggleCourses() {
        var id = '#' + $('.courses__tabs li.active:first').data('courses');
        $('.courses__list').hide();
        $(id).show();
    }
    function updateContactsSideHeight() {
        var sideRight = $('.contacts .side-right');
        var sideLeft = $('.contacts .side-left');

        sideRight.height(sideLeft.outerHeight());
    }



    var ieVersion = detectIE();
    if(ieVersion !== false && ieVersion < 11) {
        $('html').addClass('ie ie-' + ieVersion);
    }

    $(document).ready(function() {
        if($.fn.owlCarousel) {
            $('.content-article .owl-carousel').owlCarousel({
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
        }

        $('.content-article .side-right .join-course-form .btn_green').click(function(e) {
            e.preventDefault();

            $(this).parent().children('*').css('display', 'block');
            $(this).hide();
            $(this).parent().children('input:first').focus();
        });

        $('.courses__tabs li').click(function() {
            $('.courses__tabs li').removeClass('active');
            $(this).addClass('active');
            toggleCourses();
        });
        toggleCourses();

        $(window).resize(updateContactsSideHeight);

        $('.side-right__toggle').click(function() {
            $(this).parent().toggleClass('active');
        });
    });

    $(window).on("load", function() {
        updateContactsSideHeight();
        
       if(flex.isSupport()) return;

       emulateFlex();
       $(window).resize(emulateFlex);
    });
})(jQuery);