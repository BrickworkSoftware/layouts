<script> var nsgConfig = {HOST: 'https://www.nike.com', PLACEMENT: 'prepend'} </script>
<script type="text/javascript" src="http://www.nike.com/styleguide/init/nsg.js"></script>
<link rel="stylesheet" type="text/css" media="screen" href="http://store.nike.com/us/en_us/style.css?app=nikestore&version=latest&assets=nike,nike.gadget.OneNikeNav,nike.gadget.OneNikeFooter&assetType=STYLE" />
<script type="text/javascript" src="http://store.nike.com/us/en_us/NikeScriptManager.js?app=nikestore&assets=nike,nike.fonts.glyphPolyfill,nike.gadget.OneNikeNav,nike.gadget.OneNikeFooter,yepnope.injectCss&assetType=SCRIPT"></script>

<script>
  if ($(window).width() < 768) {
    console.log("Mobile");
    $('head').append('<script type="text/javascript" src="http://m.nike.com/us/en_us/NikeScriptManager.js?app=nikestore&version=latest&assets=nike,nike.gadget.mobile.OneNikeFooter,nike.gadget.mobile.OneNikeNav&assetType=SCRIPT"/>');
  }
  else {
    console.log("Desktop");
    $('head').append('<script type="text/javascript" src="http://store.nike.com/us/en_us/NikeScriptManager.js?app=nikestore&assets=nike,nike.fonts.glyphPolyfill,nike.gadget.OneNikeNav,nike.gadget.OneNikeFooter,yepnope.injectCss&assetType=SCRIPT"/>');
  }
</script>

<link rel="stylesheet" type="text/css" media="screen" href="http://m.nike.com/us/en_us/style.css?app=nikestore&version=latest&assets=nike.gadget.mobile.OneNikeFooter,nike.gadget.mobile.OneNikeNav,skin.onenike_mobile&assetType=STYLE"/>
<link rel="stylesheet" type="text/css" media="screen" href="http://store.nike.com/us/en_us/style.css?app=nikestore&version=latest&assets=nike,nike.gadget.OneNikeNav,nike.gadget.OneNikeFooter&assetType=STYLE"/>

<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.3.0.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.12/handlebars.js"></script>
