<div class="entry-content">

	<?php if ( !is_search() && has_post_thumbnail() ) : ?>
	<div class="entry-photo">	
		<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail('medium', array('class' => '')); ?></a>
	</div>
	<?php endif; ?>
	<?php the_excerpt(); ?>
	<?php if ( is_search() ) { ?>
		<div class="entry-links"><?php wp_link_pages(); ?></div>
	<?php } ?>

</div>