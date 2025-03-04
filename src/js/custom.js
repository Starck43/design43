/*
 * Custom scripts library
 *
 * @version 1.9
 */

function hide_compact_header() {
	$('#branding').hide();
	$('#header-nav').removeClass('align-right').addClass('align-center');
	
}
function show_compact_header() {
	$('#branding').fadeIn(800);
	$('#header-nav').removeClass('align-center').addClass('align-right');
}

document.addEventListener('readystatechange', function(el) {
	if ( document.readyState === 'interactive' ) {
		var main_header = this.querySelector("#main-header");
		var burger = this.querySelector("#nav-burger");

		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if ( width < 768 ) burger.classList.add('burger');
		//main_header.scrollIntoView({block: "end", behavior: "smooth"});		
		if ( window.location.pathname =='/' && !sessionStorage.getItem('main-header') ) {
			hide_compact_header();
			main_header.classList.remove("hidden");
			// sessionStorage.setItem('main-header', main_header.id);
		} else main_header && main_header.remove();
	}
});

document.addEventListener("DOMContentLoaded", function() {

/*	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy"
	});
*/
	var navigation = $('#header-nav').css('opacity', 1);
	var burger = $('#nav-burger');
	var mainheader = $('#main-header');
	var scrollup = $('#scroll-up');
	var search = $('#site-search-modal');
	var back2top = $('#back-to-top');
	var top = 0;
	if ( mainheader ) mainheader.children('.site-branding').removeClass('hidden');
	// This hides the address bar PROBABLY:
	//window.scrollTo(0, 1);

	function main_header_slide_up() {
		$(window).scrollTop(0);
		mainheader.children('.site-branding').addClass('hidden')
		.delay(1000)
		//.end()
		.queue( function() {
			mainheader.slideUp(800, function() {
				mainheader.remove();
			});
		});		
	}

	// inView.js appearance effect on scrolling from screen bottom
	inView('article')
		.on('enter', el => {
			//el.style.opacity = 0.5;
			if (!el.classList.contains('visible')) el.classList.add('visible');
		});

	inView('#main-header')
		.once('exit', el => {
			//el.style.opacity = 0;
			show_compact_header();
			if (top == 0) el.remove(); //delete main-header
		});

	$(window).scroll( function() {
		if ( mainheader.is(':visible') ) main_header_slide_up();
		back2top.topBtnToggle({
			scrollTrigger: 1000,
			//debug: true,
		});
	});

	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		if ( window.location.pathname == '/' && window.location.search == '' ) { //if home page
			//if ($(target).hasClass('animate')) $(target).removeClass('animate');
			if (burger.hasClass('burger')) burger.click(); //close burger menu on link clicking

			top = $(target).offset().top;

			if (mainheader.is(':visible')) {
				top -= mainheader.outerHeight(true);
				mainheader.slideUp(500+top/4, function() {mainheader.remove()});
			}

			$('html, body').animate({scrollTop: top},  500+top/4)  // длительность анимации скроллинга в мс
		} else {
			//target = target.replace(/[^A-Za-z]/g, "");
			location.replace('/'+target);
		}
	});

	burger.on('click', function (e) {
		if (burger.hasClass('burger')) {
			burger.toggleClass('active');
			$('ul.menu').toggleClass('active');
			$(document.body).toggleClass('modal');
		}
	});

	$( document ).on( 'keyup', function (e) {
		e.preventDefault();
		if( e.keyCode == 27 && search.is(':visible') )
			search.fadeToggle(300) //close search form
		else
		if( e.keyCode == 27 && burger.hasClass('active') ) burger.click(); // close burger menu on esc key
	});


	$('#searchform-close').on('click', function (e) {
		var field_s = search.find('#s');
		if ( field_s.val() ) field_s.val('')
		else search.fadeToggle(300);
	});

	$('#nav-search').on('click', function (e) {
		if ( search.is(':visible') && search.find('#s').val() ) {
			$('#searchform').submit(); 
		} else search.fadeToggle(300);
	});

	back2top.on('click', function (e) {		
		// 700 - скорость задержки перемещения наверх (в миллисекундах)
		e.preventDefault();
		$('html,body').animate({scrollTop: 0}, 800);		
	});

	scrollup.on('click', function (e) {
//		var mc = document.body.querySelector('#main-container');
//		$.when($('#main-header').addClass('hidden').delay(2000).remove())
//		.done( mc.scrollIntoView({block: "start", behavior: "smooth"}) );
		$(this).fadeOut(600);
		main_header_slide_up();
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
