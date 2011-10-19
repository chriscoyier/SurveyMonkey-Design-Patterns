/* Faking Menu Functionality */

$(".main-nav li:has(ul)")
	.addClass("has-submenu")
	.hover(function() {
		$(this).addClass("open");
	}, function() {
		$(this).removeClass("open");
	});

$(".main-nav > li > a ").click(function(e) {
   e.preventDefault();
   $(".main-nav > li").removeClass("active");
   $(this).parent().addClass("active");
});



/* Faking Help Popout Functionality */

var config = {    
     over: openPopup,   
     timeout: 1000,    
     out: closePopup  
};

function openPopup(el) {
  $(el.currentTarget).addClass("open");
};

function closePopup(el) {
  $(el.currentTarget).removeClass("open");
};

$(".q").hoverIntent(config);