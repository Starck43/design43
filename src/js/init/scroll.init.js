
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

$('#scroll-up').on('click', function (e) {
	var mc = document.body.querySelector('#main-container');
	mc.scrollIntoView({block: "start", behavior: "smooth"});
	$('#scroll-up').fadeOut(200).remove();
});
