(function($) {

  /* Faking Menu Functionality */

  // $(".main-nav li:has(ul)")
  //  .addClass("has-submenu")
  //  .hover(function() {
  //    $(this).addClass("open");
  //  }, function() {
  //    $(this).removeClass("open");
  //  });

  $(".main-nav > li > a ").click(function(e) {
     e.preventDefault();
     $(".main-nav > li").removeClass("active");
     $(this).parent().addClass("active");
  });



  /* Faking Help Popout Functionality */
  
  /* This is working like shit sandwich */
  
  var config = {    
       over: openPopup,   
       timeout: 750,    
       out: closePopup  
  },
  allQs = $('.q');

  function openPopup(el) {
    allQs.removeClass("open");
    $(el.currentTarget).addClass("open");
  };

  function closePopup(el) {
    $(el.currentTarget).removeClass("open");
  };

  allQs.hoverIntent(config);

})(jQuery);