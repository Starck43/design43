/*
 * Custom scripts library
 *
 * @version 1.0.5
 */
 
document.addEventListener("DOMContentLoaded", function() {

	// Adding class after full DOM loading for applying CSS animation
	//$('#main-header').addClass('visible');
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
	inView('#main-header')
		.on('exit', el => {
			//el.style.opacity = 0;
			el.classList.add('hidden');
			$('#branding').show();
			$('#header-nav').css('margin-right','unset');
		});	
		//var lazyLoadInstance = new LazyLoad({
			//elements_selector: ".lazy"
		//});
	
	$(window).scroll(function() {
		//addVisibleClass(document.body.querySelectorAll('article')); //viewport.js
		//addVisibleClass(document.body.querySelectorAll('#copyright'));

		$('.back-to-top').topBtnToggle({
			scrollTrigger: 900,
			//debug: true,
		});
		if ( $('#scroll-up').length > 0 ) 
			$('#scroll-up').fadeOut(200).remove();
//		if ( $('#main-header').has('show') && $(window).scrollTop() > 0 ) 
//			 $('#main-header').removeClass('show').addClass('hide');
	});

	$('.back-to-top').on('click', function (e) {		
		// 700 - скорость задержки перемещения наверх (в миллисекундах)
		e.preventDefault();
		$('html,body').animate({scrollTop: 0}, 700);		
	});

	$('#scroll-up').on('click', function (e) {
		var mc = document.body.querySelector('#main-container');
		mc.scrollIntoView({block: "start", behavior: "smooth"});
		$('#scroll-up').fadeOut(200).remove();
		//$('#main-header').removeClass('show');
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
