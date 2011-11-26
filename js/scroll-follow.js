(function($) {

	function updatePositions() {
		
			var parent    = $("#scroll-parent"),
			    offset    = parent.offset(),
			    scrollTop = $(window).scrollTop();

			if ((scrollTop > offset.top) && (scrollTop < offset.top + parent.height())) {
				follower.css({
					"position": "fixed",
					"top"     : 0,
					"width"   : follower.data("orig-width")
				})
			} else {
				follower.css({
					"position": "static",
					"width"   : "auto"
				})
			}
	}
	
	var follower = $("#i-follow");
	follower
		.data("orig-width", follower.outerWidth())
		.data("orig-left",  0);

	$(window)
	.scroll(updatePositions)
	// Trigger once on load to kick it off
	.trigger("scroll");

})(jQuery);