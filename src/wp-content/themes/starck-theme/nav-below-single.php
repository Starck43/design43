<?php $args = array(
	'screen_reader_text' => 'Навигация по новостям',
	'prev_text' => '<span class="meta-nav"><i class="fa icon icon-left-open-big"></i></span><span>%title</span>',
	'next_text' => '<span>%title</span><span class="meta-nav"><i class="fa icon icon-right-open-big"></i></span>'
); ?>
<nav id="single-post-nav">
	<?php the_post_navigation( $args ); ?>
</nav>