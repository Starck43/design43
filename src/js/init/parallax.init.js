if ( $('body').has('.parallax').length ) {
	// init parallax for background
	$('.parallax').bgParallax({
		bgpositionY: 50, //it must be the same background-position value in css 
		speed: 0.5,
	});
}