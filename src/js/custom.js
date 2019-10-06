/*
 * Custom scripts library
 *
 * @version 1.0.5
 */



var remove_header = function(el) {
	//window.name = null; 
	if ( this.body.classList.contains('home') && !sessionStorage.getItem('main-header')) {
		$('#branding').hide();
		$('#header-nav').removeClass('align-right').addClass('align-center');
		//sessionStorage.removeItem('main-header');
		document.removeEventListener('load', remove_header, true);
	} else $('#main-header').remove();
}
document.addEventListener('load', remove_header, true);

function show_narrow_header() {
	$('#branding').show(200);
	$('#header-nav').removeClass('align-center').addClass('align-right');
}


document.addEventListener("DOMContentLoaded", function() {
	
var elem = main.querySelector("#main-header");
if (elem) {
	if (sessionStorage.getItem('main-header') == elem.id) {
		elem.classList.remove();
		//show_narrow_header();
	} else {
		sessionStorage.setItem('main-header', elem.id);
		//window.name = 'no-main-header';
		elem.classList.add("visible");
	}
}
	//$('body').fadeIn(200);
	// Adding class after full DOM loading for applying CSS animation
/*	$.when( $('#dom-preloader').find('i').removeClass('fa-spin').end().delay(500).fadeOut('slow') )
	.done( function() { 
		$('#dom-preloader').remove(); 
	});		
*/
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
			$.when( el.classList.remove('visible') ).done( function() {
				show_narrow_header();
				el.remove(); //delete main-header
			});
		});	
		//var lazyLoadInstance = new LazyLoad({
			//elements_selector: ".lazy"
		//});
	
	$(window).scroll( function() {
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

	$('a[href^="#"]').on('click', function (e) {	
		e.preventDefault();
		var target = $(this).attr('href');
		$(target).removeClass('animate');
		timer = $('#main-header').hasClass('visible') ? 500 : 0;
		$.when(
			$('#main-header').removeClass('visible').delay(timer) 
		).done( function() {
			var top = $(target).offset().top;
			$('html, body').animate({scrollTop: top}, 500+top/4);//800 - длительность скроллинга в мс

		});		
	});

	$('.back-to-top').on('click', function (e) {		
		// 700 - скорость задержки перемещения наверх (в миллисекундах)
		e.preventDefault();
		$('html,body').animate({scrollTop: 0}, 800);		
	});

	$('#scroll-up').on('click', function (e) {
		var mc = document.body.querySelector('#main-container');
		mc.scrollIntoView({block: "start", behavior: "smooth"});
		//$('#scroll-up').fadeOut(200).remove();
		//$('#main-header').removeClass('show');
	});

	var burger = $('#nav-menu').on('click', function (e) {
		burger.toggleClass('active');
		$('#menu-top').toggleClass('active');
		$(document.body).toggleClass('modal');

	});

	var search = $('#site-search-modal');

	$( document ).on( 'keyup', function( e ) {
		e.preventDefault();
		if( e.keyCode == 27 && search.is(':visible') )
			search.fadeToggle(300) //close search form
		else
		if( e.keyCode == 27 && burger.hasClass('active') ) burger.click(); // close burger menu on esc key
	});

	$( window ).on( 'load resize', function( e ) {
		if ( $(this).width() < 992 ) {
			//$('#header-nav').addClass('burger').removeClass('align-center').addClass('align-right');
			$('#nav-menu').removeClass('hidden');
		} else {
			$('#header-nav').removeClass('burger');
			$('#nav-menu').addClass('hidden');
		}

	});

	$('#searchform-close').on('click', function (e) {
		var field_s = search.find('#s');
		if ( field_s.val() ) field_s.val('')
		else search.fadeToggle(300);
	});

	$('#nav-search').on('click', function (e) {
		if ( !search.attr('display','none') && search.find('#s').val() ) {
			$('#searchform').submit(); 
		} else search.fadeToggle(300);
	});

	$('#searchform').on('submit', function (e) {
		//идет поиск...
		//можно вывести preloader с надписью
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
