
if ( $('.jcarousel').length > 0 ) {
	var j = $(".jcarousel-wrapper li");
	if (j.length > 0) j.css("width", j.parents(".jcarousel-wrapper").css("width"));
}

if ( $('.jcarousel').has('.header-background').length ) {

	$('[data-jcarousel]').each(function() {
		var el = $(this);
		el.jcarousel(el.data());
	});

	$('.jcarousel')		
		.on('jcarousel:reloadend', function(event, carousel) {
			$(this).jcarousel('target').addClass('active');
		})
		.on('jcarousel:visibleout', 'li', function() {
			$(this).removeClass('active');
		})
		.on('jcarousel:visiblein', 'li', function() {
			$(this).addClass('active');
		})
		.jcarousel({
			wrap: 'circular',
			animation: 1000,
			transitions: Modernizr.csstransitions ? {
				transforms:   Modernizr.csstransforms,
				transforms3d: Modernizr.csstransforms3d,
				easing:       'ease'
			} : false
		})
		.jcarouselSwipe();

		if ( 'true' === $('.jcarousel').attr('data-jcarouselautoscroll') ) {
			$('.jcarousel').jcarouselAutoscroll({
				interval:  5000,
				//autostart: false,
				//target: '-=1',
			});
		}

		if ( $('.jcarousel-wrapper').has('.jcarousel-control').length ) {
		
		$('.jcarousel-control.prev')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '-=1'
			});

		$('.jcarousel-control.next')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '+=1'
			});

		$(".jcarousel-wrapper").hover( function() {
			$('.jcarousel-control').fadeIn(700);
		}, function() {
			$('.jcarousel-control').fadeOut(700);
		});

	}

	if ( $('.jcarousel-wrapper').has('.jcarousel-pagination').length && 'true' === $('.jcarousel-pagination').attr('data-jcarouselpagination') ) {
		$('.jcarousel-pagination')
			.on('jcarouselpagination:active', 'a', function() {
				$(this).addClass('active');
			})
			.on('jcarouselpagination:inactive', 'a', function() {
				$(this).removeClass('active');
			})
			.jcarouselPagination();
	} else $('.jcarousel-pagination').remove();
}
