
	<header class="entry-header">

		<?php 

		if ( is_singular() ) :
			the_title( '<h1 class="entry-title">', '</h1>' );
		else :
			the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' );
		endif;

		?>

	</header>

	<?php if ( ! is_search() ) { get_template_part( 'entry', 'meta' ); } ?>
	<?php get_template_part( 'entry', ( is_front_page() || is_home() || is_front_page() && is_home() || is_archive() || is_search() ? 'summary' : 'content' ) ); ?>
	<?php if ( is_singular() ) { get_template_part( 'entry', 'footer' ); } ?>
	
	<?php edit_post_link(); ?>
