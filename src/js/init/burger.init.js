
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
