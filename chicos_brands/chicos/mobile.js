/* js to show/hide the drop nav on tablet */

//Set jQuery correctly
var jQuery = (typeof $jQuery11 != 'undefined')?$jQuery11:jQuery;



/**
* This IIFE addes to the jQuery load functionality spesifficly for
* for bootstrap modal remote loading.
*
* Usage: create a script with a type="text/template" and an id="idToFind" with your modal content
*        Then the Node you use to call the modal should have a herf of the id you used
*        Note: the href should not contain a hash EG: href="idToFind" NOT href="#idToFind"
*/
/* BW EDIT: Comment out hamlstache-breaking code
*(function(){
*
*    // Store a reference to the original load method.
*    var originalLoadMethod = jQuery.fn.load;
*
*    // Define overriding method.
*    jQuery.fn.load = function(){
*        //console.log(this, arguments);
*        if ( $('#'+arguments[0]+'[type="text/template"]')[0] ) {
*            this.html( $('#'+arguments[0]).html() );
*        }else{
*            originalLoadMethod.apply( this, arguments );
*        }
*    };
*
* })();
*/



//Mobile Detect
var isMobileDevice = function(){return ((location.href.indexOf("m.") != -1) || (location.href.indexOf("mstage.") != -1) || (location.href.indexOf("mstage2.")!= -1));}();
var isIpad = function(){return ((navigator.platform.indexOf("iPad") != -1 && isMobileDevice));}();
var isMobileOnly = function(){return ((!isIpad && isMobileDevice));}();

/**
 * Finds visible breakpoints using visible classes. Based on Responsive Bootstrap Toolkit.
 * @param breakpointClasses  CSS class that will be used find visible breakpoint.
 * @returns {boolean}
 */

var FasMobile = {
    isMobile:function(){
        //If mobile device will return true.
        try{
            document.createEvent("TouchEvent");
            /* if(typeof window.orientation !== 'undefined'){...}*/
            return true;
        }
        catch(e){ return false; }
    },
    detectBreakPoints: function(breakpointClasses) {
        //Usage: FasMobile.detectBreakPoints('visible-xs'); (mobile = true)
        //var deviceTitles = ['mobile:visible-xs','tablet:visible-sm','desktop:visible-md'];

        var dbpContainer = $('<div class="detect-breakpoints"></div>');
        dbpContainer.appendTo('body');
        var allActive = false;
        var breakpointDiv = $('<div class="' + breakpointClasses + '">');
        dbpContainer.append(breakpointDiv);
        if (breakpointDiv.is(':visible')) {
            allActive = true;
        }
        dbpContainer.remove();
        return allActive;
    }
}
/* Add custom ui class to new bootstrap selects. QA needs this for automated tests
 * NOTE: make sure custom class (IE: product-size) is first. This script will add '-ui' to the custom button created
 * */
/*var FasSelectUi = function(){
    $('.bootstrap-select').each(function(){
        var $formSelect = $(this);
        var selectClass = $formSelect.attr('class').split(' ')[2];
        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 4
        });
        $formelem.find('.selectpicker').addClass(selectClass +'-ui');
    })
}()*/

function bf_onLoad(){
    // international popup submit btn function
    if(isMobileDevice){
        $('.context-selector-call-to-action input[type="image"]').hide();
        $('.context-selector-call-to-action .mw_btn1').remove();
        $('.context-selector-call-to-action').append('<div class="mw_btn1" />')
        $('.context-selector-call-to-action .mw_btn1').html('Save & Continue');
        $('.context-selector-call-to-action .mw_btn1').bind('click', function() {
            $('.context-selector-call-to-action input[type="image"]').click();
        })

    }

}

/*Back to top button
 * Add the attribute data-backToTop-btn="true"
 * */
var FasBackToTopButton = {
    init: function(){
        if($('[data-backToTop-btn="true"]').length){
            var template = '<a class="top-link" href="#page-wrap" style="display: none;">'+
                '<svg class="icon-arrow-up-thin"> <use xmlns:xlink="//www.w3.org/1999/xlink" xlink:href="#icon-arrow-up-thin"></use></svg>'+
                'Back to top' +
                '</a>';
            $('body').append(template);
            FasBackToTopButton.bindEvents();
        }

    },
    bindEvents:function(){
        if ($(window).width() > 1024) {
            $(document).scroll(function() {
                var y = $(this).scrollTop();
                if (y > 800) {
                    $('.top-link').fadeIn();
                } else {
                    $('.top-link').fadeOut();
                }
            }).scroll();
        }
        $('a[href*=#curated-], a[href=#page-wrap]').click(function() {
            $(window).trigger('backToTop.clicked');
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('body').addClass('scrolling-top');
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function(){
                        $('body').removeClass('scrolling-top');
                    });
                    return false;
                }
            }
        });
    }
};

$(function(){

        //if($('.myAccountMobileNav').length){$('.myAccountMobileNav').prepend($('.container-fluid'));}

        var navDropdownBind = function(event){
        var navId = ($(this).attr('data-nav')!=undefined)?$(this).attr('data-nav'):$('.nav-active').attr('data-nav');
        var $navList = $('#'+navId);
        if ($navList.is(':visible')) {
            $('.top-nav-btn-list').css({display: 'none'});
            $(this).removeClass('nav-active');
            $(this).find('#arrow').removeClass('resetArrow');

        } else {
            $('.top-nav-btn-list').css({display: 'none'});
            $navList.css({display: 'block'})
            $(this).addClass('nav-active');
            $(this).find('#arrow').addClass('resetArrow');
        }
       /* if ($('#endeca-search-form').is(':visible') && $navList.is(':visible')) {
            $('.endeca-search-btn').click();
        }*/
    };

    //Bind click only if not Sign In link
    $('.nav-dropdown-btn[data-nav]').bind('click',navDropdownBind)
    $('.invis-overlay').click(function(){
        $('.nav-dropdown-btn.nav-active[data-nav]').click();
    });

    //Scroll Page back to top when search is clicked (tablet)
    /*$('.endeca-search-btn').live('click', function(){$("html, body").animate({ scrollTop: 0 }, "fast");})*/

//Mobile Menu Buttons
    'use strict';
    $(function(){ var FAS = window.FAS || {}; FAS.Footer = {}; FAS.Footer.init = function(){ var self = this; self.expandedSections = {}; $('[data-footer-expand]').click(function(){ var elementToExpand = $(this).attr('data-footer-expand'); var icon = $(this).find('i.fa'); if (!self.expandedSections[elementToExpand]) { $(this).addClass('expanded'); $(elementToExpand).show(); self.expandedSections[elementToExpand] = true; icon.removeClass('fa-plus-square-o').addClass('fa-minus-square-o'); $(this).find('span').text('Less'); } else { $(this).removeClass('expanded'); $(elementToExpand).hide(); self.expandedSections[elementToExpand] = false; icon.addClass('fa-plus-square-o').removeClass('fa-minus-square-o'); $(this).find('span').text('More'); } return false; }); }; FAS.Footer.init(); window.FAS = FAS; }); $(function(){ if($('[data-responsive]').length > 0){ /*if (window.location.hash.search('responsive') < 0) { setTimeout(function(){window.location.hash = window.location.hash + '/responsive' }, 3000)}*/ } })

////Flex mobile footer menu expand and collapse
$('.footer-menu-toggle').click(function() {
  $(this).next('ul').toggle();
  $(this).toggleClass('open');
  $('.footer-menu-toggle').not(this).next('ul').hide();
  $('.footer-menu-toggle').not(this).removeClass('open');
});

//Modal: Center current jqmModal
    if(isIpad){
        $(window).bind('orientationchange', function(e) {
            var flexModal = {
                left: "50%",
                marginLeft: (($('.modalWindow').outerWidth()/2)*-1)+'px'
            }
            $('.modalWindow').css(flexModal)
        });
    }


//Desktop to Mobile Clone
    var desktopObjs = {
        activeStateElems:'.endeca-search-btn',
        init:function() {
            //Get Account Info and International elems
            var $accountInt_parent = $('#international-account-nav-wrapper #account-nav-parent');
            this.account = {
                signIn: $accountInt_parent.find('#account-nav .account-sign-in').clone().find('a').addClass('personalize-msg'),
                loyalty: $('<div class="header-welcome personalize-msg">').html($accountInt_parent.find('#account-nav #loyalty-status').clone().find('.header-welcome').contents()), //Replace standalone <li> in account welcome header with <div>
                myAccount: $accountInt_parent.find('#account-nav #account-info').clone()/*,
                 register: $accountInt_parent.find('#account-nav .account-register'),
                 welcomeMsg: $accountInt_parent.find('#account-nav .header-welcome')*/

            };
            this.account.status = (this.account.signIn.length)?this.account.signIn:this.account.loyalty;
            this.account.status.find('.account-header-spacer').remove();

            this.location = {
                flag: $accountInt_parent.find('#location-nav #ibf-flag').clone(),
                country: $accountInt_parent.find('#location-nav #ibf-countryName').clone()
            };

            //Get Shopping cart info
            this.shoppingBag = $.trim($('#tertiary-nav #bag-count').text()).replace(/\D/g, '');
            this.bagCount = $.trim($('#tertiary-nav #bag-count').text()).replace(/\D/g, '');

            //Update my Account
            desktopObjs.account.myAccount.find('#loyalty-status,.account-header-spacer').remove();
            desktopObjs.account.myAccount.find('li a').addClass('nav-btn').append('<span class="btn-arrow" />');

            //Get Top Navigation Element
            /* this.topNav = $('#primary-nav #menu li').clone();*/

            //update for Tablet
            //function isiPhone(){return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1));}
            /*function isiPadOnly(){return ((navigator.platform.indexOf("iPad") != -1));}
             if(isiPadOnly){*/


            //Header Updates

            $('.user-account-group .account-info').prepend(desktopObjs.account.status);
            desktopObjs.account.myAccount.find('ul.account-info-list').addClass('menu');
            $('#account-nav-list.top-nav-btn-list .primary-nav').append(desktopObjs.account.myAccount.html());
            if(this.account.signIn.length){
                //Remove nav-list wrapper that has click binded for Sign-in Link
                $('.user-account-group .nav-dropdown-btn').replaceWith($('.user-account-group .nav-dropdown-btn').contents());
            }


            $('.cart-count').html(desktopObjs.bagCount+'<span class="cart-tiems-copy hidden-sm"> items</span>');
            /* $('#primary-nav-mobile #menu-mobile').append(desktopObjs.topNav)*/
            //Only show International country flag next to shop button
            if(desktopObjs.location.flag.length){
                var mobileFlagElem = (desktopObjs.location.flag.find('img').attr('src').indexOf('flags/USA')!=-1)?'#primary-nav-wrapper .country-flag':'.top-nav-shop #flag,#primary-nav-wrapper .country-flag';
                $(mobileFlagElem).html(desktopObjs.location.flag.html()).show();
                $('.country-name').html(desktopObjs.location.country.html());
            }


            //Global Promo - Mobile
            $('#header .mw_tablet_only').addClass('visible-sm').insertBefore('#content').find('img').addClass('img-responsive');
            $('#header .moovweb_globalbanner').addClass('visible-xs').insertAfter('#content').find('img').addClass('img-responsive');

            //}

            //Add Active State Binds
            this.bindActiveStates();
        },
        bindActiveStates:function(){
            //Toggle .btn-active Class to elements when clicked
            $(this.activeStateElems).bind('click',function(){
                $(this).toggleClass('nav-active');
            });
        }
    };

    desktopObjs.init();


    /*********************************************************************/
    //Init On dom ready
    (function( $ ) {
        //Init Back to top
        FasBackToTopButton.init();

        //Bind for new select ui
        $('.selectpicker').selectpicker();

        //Bootstrap Select Options
        /* Enable mobile scrolling by calling $('.selectpicker').selectpicker('mobile'). The method for detecting the browser is left up to the user. This enables the device's native menu for select menus.*/
        /*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
            $('.selectpicker').selectpicker('mobile');
        }*/

        /* Bootstarp UI Select: Product Inventory form refresh */
        //$('.product-swatch.swatch a').on('click',function(){setTimeout(function(){ $('.selectpicker').selectpicker('refresh');}, 10) });
       /* $('#selColorCode').change(function(){
          var swatchVal = $('.selectpicker').val();
            console.log("changing", swatchVal)
          $('#swatch_'+swatchVal+' img').trigger('click');
            console.log($('#swatch_'+swatchVal))
        })*/
    })(jQuery);
});


/************************************
 **  Scripts from Josh - site.js
 **************************************/
function openInvitations(url) {
    window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=50%, width=700, height=635");
}

$(function(){
// fix scrolling issue when multiple nested modals have been opened
    jQuery(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
    });

// trigger popovers
    $(function () {
        jQuery('[data-toggle="popover"]').popover();
    });
    $(function () {
        jQuery('[data-toggle="tooltip"]').tooltip();
    });




// product image gallery modal
    jQuery(window).on('load resize', function(){
        var thumbHeight = $(window).height() * 0.25 -9;
        $('.zoom-main #product-img').css({'max-height':$(window).height()+'px'});
        $('.zoom-thumbs img').css({'max-height': thumbHeight +'px'});
    });

// swipe carousel on touch devices
    if($(".carousel").length){
        jQuery(".carousel").swiperight(function() {
            jQuery(this).carousel('prev');
        });
        jQuery(".carousel").swipeleft(function() {
            jQuery(this).carousel('next');
        });
    }

// open map tab pane with icon map pin click
    $('.open-map-pane').click(function(e) {
        e.preventDefault();
        $('#store-locator-tabs .tab').removeClass('active');
        $('#store-locator-tabs a[aria-controls="map-view"]').parent().addClass('active');
        jQuery(this).tab('show');
    });

//Clear Textarea form on load
    $('.is-wish-list-manage #note.form-control').val('');

    // prevent certain dropdowns from closing on click within dropdown
    $('#utility .dropdown-menu, #menu .dropdown-menu .form-control, #menu .dropdown-menu button').click(function(e) {
        e.stopPropagation();
    });

    jQuery('[data-toggle="offcanvas"]').on('click', function(e) {
        $('html, body').toggleClass('offcanvas-open');
        $('#menu').toggleClass('offcanvas-menu');
        $('.offcanvas-overlay').toggleClass('open');
        $('body').toggleClass('offcanvas-closed');
        $('#menu-utility .menu-toggle-inner').toggleClass('open'); // menu bars to "x"
        e.preventDefault();
    });

    if ($(window).width() > 991) {
        jQuery('.menu-bag, #menu .dropdown').on('mouseenter', function() {
            // var bagDropdown = $('#persistent-cart');
            $('.dropdown').not(this).removeClass('open');
        });
    }

    // make header sticky once it reaches window top
    if (jQuery('#header')[0]) {
        var top = jQuery('#header').offset().top;
        /* Stick Nav: Fix issue with Main area being overlapped by sticky nav after animation */
        if(!$('#header-promo').length){
            $('#header-wrap').addClass('no-gp-promo');
        }

        $(window).bind('scroll resize', function (event) {
            var y = $(this).scrollTop();
            if (y > top) {
                $('body').addClass('sticky');
                $('#header-promo').slideUp(400);
                $('#header-promo-wrap').removeClass('promo-open');
                //NEW: Add extra padding to fix defect FLX-2506 that prevents header from sticking depending on browser height
                $('.sticky #content-wrap').css('marginTop',$('#header').height());
            } else {
                $('body').removeClass('sticky');
                $('#content-wrap').css('marginTop',0);

            }
        });
    }

    // toggle classes on window resize so dropdowns and menus work properly on all devices
    function resize() {
        if ($(window).width() > 991) {
            $('html, body').removeClass('offcanvas-open');
            $('#menu').removeClass('offcanvas-menu');
            $('body').addClass('offcanvas-closed');
            $('.dropdown, .offcanvas-overlay').removeClass('open');
            $('.menu-toggle-inner').removeClass('open');
            $('.filter-list-wrap').addClass('filter-desktop').removeClass('open'); // toggles between click/hover on filter dropdowns
        }
    }
    $(window).resize(resize);
    resize();

    // make dropdowns appear on hover
    jQuery('html').on('mouseenter mouseleave', '.offcanvas-closed #menu .dropdown', function () {
        $(this).toggleClass('open');
        $('#menu .dropdown').not(this).toggleClass('menu-inactive');
        
//        commenting this out because it makes the menu dropdown all janky wen your trying to search
//        $('#search-wrap').hide(); // close search anytime a main menu panel is opened

    });

    var delay=450, setTimeoutConst, setTimeoutConst2;
    jQuery('#menu').mouseleave(function() {
        jQuery('#menu').removeClass('hover');
        clearTimeout(setTimeoutConst2);
        setTimeoutConst2 = '';
    }).find('li.dropdown').mouseenter(function(){
        if (!setTimeoutConst2) {
            setTimeoutConst2 = setTimeout(jQuery.proxy(function() {
                jQuery('#menu').addClass('hover');
                jQuery('#search-wrap').hide(); // close search anytime a main menu panel is opened
            }, this), delay*2);
        }
        setTimeoutConst = setTimeout(jQuery.proxy(function() {
            jQuery('#menu').addClass('hover');
            jQuery('#search-wrap').hide(); // close search anytime a main menu panel is opened
        }, this), delay);
    }).mouseleave(function(){
        clearTimeout(setTimeoutConst);
    });

    // make dropdowns appear on clickable
    jQuery('html').on('click', '.offcanvas-open .offcanvas-menu .dropdown', function (e) {
        $(this).toggleClass('open');
        $('.offcanvas-menu .dropdown').not(this).removeClass('open'); // allows only one submenu to be open at a time
        //e.preventDefault(); //This was merged from coreyweb
    });

    $('.offcanvas-overlay').click(function() {
        $('html, body').toggleClass('offcanvas-open');
        $('#menu').toggleClass('offcanvas-menu');
        $(this).toggleClass('open');
        $('body').toggleClass('offcanvas-closed');
        $('#menu-utility .menu-toggle-inner').toggleClass('open'); // menu bars to "x"
    });



    //GLOBAL PROMO: Events and animation
   /* jQuery('[data-toggle="header-promo"], #promo-carousel .carousel-indicators li').on('click',function(e) {
        $('#header-promo-wrap').toggleClass('promo-open');
        if ($('#header-promo').is(":visible")) {
            $('#header-promo').slideUp(400);
            $('#header-promo-inner').animate(
                {opacity: 0},
                {duration: 400}
            );
            jQuery('#promo-carousel').carousel('cycle');
        } else {
            $('#header-promo').slideDown(400, function(){
                $('#header-promo-inner').animate(
                    {opacity: 1},
                    {duration: 400}
                );
            });
            jQuery('#promo-carousel').carousel('pause');
        }
        e.preventDefault();
    });*/

// toggle color swatches on collection page
    /*$('.colors-toggle').click(function(e) {
        $(this).hide();
        $(this).next('.swatch-wrap').show();
        e.preventDefault();
    })*/



    //Side Drawer
    jQuery(document).on('click', '[data-toggle="c-sp-toggle"]', function (e) {
        $('.c-sp-link').not(this).closest('.c-sp').removeClass('open');
        $(this).closest('.c-sp').toggleClass('open');
        e.preventDefault();
    });
    jQuery(document).on('click', '.close-wrap [data-toggle="c-sp-toggle"]', function (e) {
        $(this).closest('.c-sp').removeClass('open');
        e.preventDefault();
    });

    /* Remove click on telephone from mobile devices */
    $('a[href*="tel:"]').bind('mouseenter click',function(){
        if(!FasMobile.isMobile()){
            $(this).addClass('default-cursor');
            return false;
        }
    })



})


jQuery(function(){
    jQuery('#modal-cc, [ipad-background-scroll-fix]').on('shown.bs.modal', function (event) {
        jQuery('body').css({'position':'fixed', 'overflow':'visible', 'width':'100%'});
        jQuery('#modal-cc .modal-backdrop, [ipad-background-scroll-fix] .modal-backdrop').css({'position':'fixed'});
    }).on('hidden.bs.modal', function(){
        jQuery('body').css({'position':'static', 'overflow':'auto', 'width':'auto'});
    });
});


jQuery(window).on('load resize', function() {
    if ($(window).width() < 768) {
        var controlPosition = $('.module .carousel-lg').width() * 0.5;
        $('.module .carousel-lg [class*="icon-arrow"]').css({'top': controlPosition + 'px'});
    }
});


// youtube modal: autoplay on open, stop on close
$(function() {
    jQuery('#modal-video').on('shown.bs.modal', function(e) {
        var src = $(this).find('iframe').attr('data-iframe-src');
        $(this).find('iframe').attr('src', src);
    });
    jQuery('#modal-video').on('hidden.bs.modal', function(e) {
        $(this).find('iframe').attr('src', '');
    });
});

// youtube modal: open on page load, requires click to play
$(function() {
    jQuery('.modal-video-overlay').on('click', function(e) {
        var src2 = $('#video-wrapper-pageload').find('iframe').attr('data-iframe-src');
        $('#video-wrapper-pageload').show();
        $('#video-wrapper-pageload').find('iframe').attr('src', src2);
        $(this).hide();
        e.preventDefault();
    });
    jQuery('#modal-video-pageload').on('hidden.bs.modal', function(e) {
        $('#video-wrapper-pageload').hide();
        $('#video-wrapper-pageload').find('iframe').attr('src', '');
        $('.modal-video-overlay').show(1000); // bring back the placeholder just in case the modal can be re-opened
    });
});


// prevent modal click from triggering link wrapper
$(function() {
    jQuery('#header-promo [data-toggle="modal"]').on('click', function(e) {
        e.preventDefault();
    });
});

// temp scripts. Jerrod and Homer have it covered.
// youtube modal: autoplay on open, stop on close
/*$(function() {
    jQuery('#modal-video').on('shown.bs.modal', function(e) {
        var src = $(this).find('iframe').attr('data-iframe-src');
        $(this).find('iframe').attr('src', src);
    });
    jQuery('#modal-video').on('hidden.bs.modal', function(e) {
        $(this).find('iframe').attr('src', '');
    });
});*/

// youtube modal: open on page load, requires click to play
/*$(function() {
    jQuery('.modal-video-overlay').on('click', function(e) {
        var src2 = $('#video-wrapper-pageload').find('iframe').attr('data-iframe-src');
        $('#video-wrapper-pageload').show();
        $('#video-wrapper-pageload').find('iframe').attr('src', src2);
        $(this).hide();
        e.preventDefault();
    });
    jQuery('#modal-video-pageload').on('hidden.bs.modal', function(e) {
        $('#video-wrapper-pageload').hide();
        $('#video-wrapper-pageload').find('iframe').attr('src', '');
        $('.modal-video-overlay').show(1000); // bring back the placeholder just in case the modal can be re-opened
    });
});*/


// equalize header promo carousel height

function carouselNormalization() {
    var promoItems = $('#promo-carousel .item'), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide

    if (promoItems.length) {
        function normalizeHeights() {
            promoItems.each(function() { //add heights to array
                heights.push($(this).height());
            });
            tallest = Math.max.apply(null, heights); //cache largest value
            promoItems.each(function() {
                $(this).css('min-height', tallest + 'px');
            });
        };
        normalizeHeights();

        jQuery(window).on('resize orientationchange', function() {
            tallest = 0, heights.length = 0; //reset vars
            promoItems.each(function() {
                $(this).css('min-height', '0'); //reset min-height
            });
            normalizeHeights(); //run it again
        });
    }
}
$(function() {
    jQuery('#page-wrap').on('click', '[data-toggle="header-promo"], #promo-carousel .carousel-indicators li', function(e) {
        $('#header-promo-wrap').toggleClass('promo-open');
        if ($('#header-promo').is(":visible")) {
            $('#header-promo').slideUp(400);
            $('#header-promo-inner').animate({
                opacity: 0
            }, {
                duration: 400
            });
            jQuery('#promo-carousel').carousel('cycle');
        } else {
            $('#header-promo').slideDown(400, function() {
                $('#header-promo-inner').animate({
                    opacity: 1
                }, {
                    duration: 400
                });
            });
            jQuery('#promo-carousel').carousel('pause');
            carouselNormalization();
        }
        e.preventDefault();
    });
});
/***************************************************
 ********* Collection Page JS
 ***************************************************/

// toggle dropdown-menu using close icon
jQuery('[data-toggle="filter-toggles"]').dropdown();

$(function(){
    (function($){

        // collection carousel
        // first slide to have a shorter interval
        var timeout, interval;
        $('.carousel-collection').hover(function() {
            var thisCarousel = $(this);
            timeout = setTimeout(function() {
                thisCarousel.carousel('next');
                continueCarousel(thisCarousel);
            }, 500);
        }, function () {
            $(this).carousel(0);
            $(this).carousel('pause');
            clearTimeout(timeout);
            clearInterval(interval);
        });

        function continueCarousel(thisCarousel) {
            interval = setInterval(function () {
                thisCarousel.carousel('next');
            }, 2500);
        }

    })(jQuery);
})


$(function() {
    if ('ontouchstart' in document.documentElement && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) { //IOS only
      $('body').css('cursor', 'pointer');
    }

    /* Fix for Inline Modal SVG's being clickable */
    $('a[data-toggle="modal"] svg').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        jQuery(this).closest('a').click();
    });

});


/***************************************************
 ********* Click event for module shop the look drawer
 ***************************************************/
jQuery(document).on('click', '[data-toggle="c-sp-toggle"]', function (e) {
  $('.c-sp-link').not(this).closest('.module-sh').removeClass('open');
  $(this).closest('.module-sh').toggleClass('open');
  e.preventDefault();
});
jQuery(document).on('click', '.close-wrap [data-toggle="c-sp-toggle"]', function (e) {
  $(this).closest('.module-sh').removeClass('open');
  e.preventDefault();
});
