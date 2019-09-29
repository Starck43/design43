/*
 * Custom scripts library
 *
 * @version 1.0.5
 */
 
document.addEventListener("DOMContentLoaded", function() {

	// Adding class after full DOM loading for applying CSS animation
	$('#main-header').addClass('visible');
	$.when( $('#dom-preloader').find('i').removeClass('fa-spin').end().delay(500).fadeOut('slow') )
	.done( function() { 
		$('body').fadeIn();
		$('#dom-preloader').remove(); 
	});		

	// inView.js appearance effect on scrolling from screen bottom
	inView('article')
		.on('enter', el => {
			//el.style.opacity = 0.5;
			el.classList.add('visible');
		})
		.on('exit', el => {
			//el.style.opacity = 0;
			//el.classList.remove('visible');
		});	

		var lazyLoadInstance = new LazyLoad({
			elements_selector: ".lazy"
		});
	
	$(window).scroll(function() {
		//addVisibleClass(document.body.querySelectorAll('article')); //viewport.js
		//addVisibleClass(document.body.querySelectorAll('#copyright'));

		$('.back-to-top').topBtnToggle({
			scrollTrigger: 400,
			//debug: true,
		});

	});

	$('.back-to-top').on('click', function (e) {		
		// 700 - скорость задержки перемещения наверх (в миллисекундах)
		e.preventDefault();
		$('html,body').animate({scrollTop: 0}, 700);		
	});


	var burger = $('#nav-menu').on('click', function (e) {
		burger.toggleClass('active');
		$('#menu-top').toggleClass('active');
		//$('#scroll-up').toggleClass('hidden');
	});

	$( document ).on( 'keyup', function( e ) {
		if( !burger.hasClass('active') ) return true;
		e.preventDefault();
		if( e.keyCode == 27 ) burger.click();
	});

	//Adding an agent to HTML selector
	var deviceAgent = navigator.userAgent.toLowerCase();
	if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
		$("html").addClass("ios");
		$("html").addClass("mobile");
	}
	if (navigator.userAgent.search("MSIE") >= 0) {
		$("html").addClass("ie");
	}
	else if (navigator.userAgent.search("Chrome") >= 0) {
		$("html").addClass("chrome");
	}
	else if (navigator.userAgent.search("Firefox") >= 0) {
		$("html").addClass("firefox");
	}
	else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
		$("html").addClass("safari");
	}
	else if (navigator.userAgent.search("Opera") >= 0) {
		$("html").addClass("opera");
	}

});
