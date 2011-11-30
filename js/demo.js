(function($) {

  var doc = $(document);

  /* Faking Menu Functionality -- This allows for clicks to set the "active" state of other menu items */
  /* Probably going to need some "click to open" functionality on these (as per live site) */
  $(".main-nav > li > a ").click(function(e) {
     e.preventDefault();
     $(".main-nav > li").removeClass("active");
     $(this).parent().addClass("active");
  });

  

  /* Accordions */
  // Assumes standard accordian HTML structure
  // All panels closed by default
  $(".accordion").accordion();
  
  // API for opening particular panel
	//	(no logic, needs to be called on element already initialized with accordion)
  // EXAMPLE: $(".accordion").accordion("key-2");
	// Or, give any particular key a class of "open" in the markup
  
  // Example custom event 
  // pattern = class-open or class-close
  doc.on("key-2-open", function(event, el) {
    console.log("This panel opened: " + el);
  });
  
 
  
  /* Tabs */
  /* Needs work, like, actually opening and closing content areas 
  /* and adding custom events just like accordions */
  $(".tabs, .pillbox").tabs();
  
  

  /* Spinners */
  $("#spinner-test").submit(function(e) {
    e.preventDefault();
    $.spinner({
      text: $("#test-spinner-text").val(),
      action: "show"
    });

    // Probably actually after some Ajax saving or something
    setTimeout(function() {
      $.spinner({
        action: "hide"
      });
    }, 2000);
  });


  
  /* Forms */
  new ElasticText({
    node: document.getElementById('Field2')
  });


	/* Button Menus */
	// Callback event for state changing menus
	doc.on("do-thing-1-open", function(el) {
		console.log("I'm doing a thing", el);
	});
	
	
	
	/* Animations */
	doc.on("click", "#shake-button", function() {
		$("#shake-target").addClass("an-shake");
		setTimeout(function() {
			$("#shake-target").removeClass("an-shake");
		}, 2500)
	});
	
	doc.on("click", "#fade-in-button", function() {
		$("#fade-in-target").addClass("an-fade-in").removeClass("disappear an-fade-out");
	});
	doc.on("click", "#fade-out-button", function() {
		$("#fade-in-target").removeClass("an-fade-in").addClass("an-fade-out");
	});

})(jQuery);