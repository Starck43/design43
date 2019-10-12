		</div>
	<!-- end main container -->
	</main>
	<!-- end main -->
	<footer id="site-footer"  <?php starck_footer_class('site-footer'); ?> >
		<!-- container -->
		<div id="footer-container">
			<?php 

			$widgets = (int)starck_get_option( 'footer_widget_setting' );

			if ( $widgets > 0 ) {
				starck_get_footer_widgets( $widgets );
			}
			?>

			<div id="copyright">
				&copy; 
				<?php echo esc_html( date_i18n( __( 'Y', 'starck' ) ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) );
				// echo date( 'Y' ) /* выводим текущий год - альтернатива*/ 
				?>
			</div>
		</div>
		<!-- end container -->

		<?php 
		
		starck_back_to_top();

		wp_footer();
		
		?>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-149675546-1"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-149675546-1');
</script>

<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
	(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
	(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

	ym(55685215, "init", {
		clickmap:true,
		trackLinks:true,
		accurateTrackBounce:true,
		webvisor:true
	});
</script>

	</footer>

</body>
</html>