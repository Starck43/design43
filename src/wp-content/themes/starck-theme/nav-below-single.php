<?php $args = array(
	'prev_text' => '<span class="meta-nav"><i class="fa icon arrow-left"></i></span><span>%title</span>',
	'next_text' => '<span>%title</span><span class="meta-nav"><i class="fa icon arrow-right"></i></span>'
); ?>
<nav id="single-post-nav">
	<?php the_post_navigation( $args ); ?>
</nav>