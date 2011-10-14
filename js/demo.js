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