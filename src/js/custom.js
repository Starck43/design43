/*
 * Custom scripts library
 *
 * @version 1.0.5
 */

function hide_compact_header() {
	$('#branding').hide();
	$('#header-nav').removeClass('align-right').addClass('align-center');
	
}
function show_compact_header() {
	$('#branding').show();
	$('#header-nav').removeClass('align-center').addClass('align-right');
}

document.addEventListener('readystatechange', function(el) {
	if ( document.readyState === 'interactive' ) {
		var main_header = this.querySelector("#main-header");
		var navigation = this.querySelector("#header-nav");
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if ( width < 768 ) {
			var burger = this.querySelector("#nav-menu");
			//navigation.style.visibility = "hidden";
			$.when(navigation.classList.add('burger'))
			.done(navigation.style.visibility = "visible");
			burger.classList.remove('hidden');
		} else navigation.style.visibility = "visible";
		var lazyLoadInstance = new LazyLoad({
			elements_selector: ".lazy"
		});
	
		if ( this.body.classList.contains('home') && !sessionStorage.getItem('main-header') ) {
			hide_compact_header();
			main_header.classList.add("visible");
			//scrollup.fadeIn(1000);
			sessionStorage.setItem('main-header', main_header.id);
			//document.removeEventListener('load', remove_header, true);
		} else main_header.remove();
	}
});

document.addEventListener("DOMContentLoaded", function() {

	var navigation = $('#header-nav');
	var burger = $('#nav-menu');
	var scrollup = $('#scroll-up');
	var search = $('#site-search-modal');
	var back2top = $('#back-to-top');

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
		});

	inView('#main-header')
		.on('exit', el => {
			//el.style.opacity = 0;
			show_compact_header();
			//el.classList.remove('visible');
			el.remove(); //delete main-header
		});

	$(window).scroll( function() {
		//addVisibleClass(document.body.querySelectorAll('article')); //viewport.js
		//addVisibleClass(document.body.querySelectorAll('#copyright'));

		back2top.topBtnToggle({
			scrollTrigger: 1200,
			//debug: true,
		});

		if ( scrollup.length > 0 ) scrollup.fadeOut(200).remove();

	});

	$('a[href^="#"]').on('click', function (e) {	
		e.preventDefault();
		var target = $(this).attr('href');
		var mh = $('#main-header');
		$(target).removeClass('animate');
		timer = mh.hasClass('visible') ? 500 : 0;
		$.when(
			mh.removeClass('visible').delay(timer) 
		).done( function() {
			var top = $(target).offset().top;
			$('html, body').animate({scrollTop: top}, 500+top/4);//800 - длительность скроллинга в мс

		});		
	});

	back2top.on('click', function (e) {		
		// 700 - скорость задержки перемещения наверх (в миллисекундах)
		e.preventDefault();
		$('html,body').animate({scrollTop: 0}, 800);		
	});

	scrollup.on('click', function (e) {
		var mc = document.body.querySelector('#main-container');
		mc.scrollIntoView({block: "start", behavior: "smooth"});
		//$('#scroll-up').fadeOut(200).remove();
		//$('#main-header').removeClass('show');
	});

	burger.on('click', function (e) {
		burger.toggleClass('active');
		$('#menu-top').toggleClass('active');
		$(document.body).toggleClass('modal');

	});

	$( document ).on( 'keyup', function( e ) {
		e.preventDefault();
		if( e.keyCode == 27 && search.is(':visible') )
			search.fadeToggle(300) //close search form
		else
		if( e.keyCode == 27 && burger.hasClass('active') ) burger.click(); // close burger menu on esc key
	});

	$( window ).on( 'resize', function( e ) {
		if ( $(this).width() < 768 ) {
			navigation.addClass('burger');
			burger.removeClass('hidden');
		} else {
			navigation.removeClass('burger');
			burger.addClass('hidden');
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
