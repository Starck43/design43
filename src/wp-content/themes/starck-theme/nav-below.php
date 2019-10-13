<?php 
	$total = isset( $wp_query->max_num_pages ) ? $wp_query->max_num_pages : 1;
	$big = 999999999; // уникальное число для замены
	$args = array (
		'base' => str_replace( $big, '%#%', get_pagenum_link( $big ) ),
		'format'  => '',
		'total' => $total,
		'mid_size' => 3, // сколько ссылок показывать слева и справа от текущей
		'end_size' => 1, // сколько ссылок показывать в начале и в конце
		'prev_text' => '<span class="meta-nav"><i class="icon fa icon-left-thin"></i></span><span class="meta-title">Предыдущая</span>', // текст ссылки "Предыдущая страница"
		'next_text' => '<span class="meta-title">Следущая</span><span class="meta-nav"><i class="icon fa icon-right-thin"></i></span>', // текст ссылки "Следующая страница"
	);
	if ( $total > 1 ) {
		echo '<nav class="navigation posts-navigation">';
		echo '<h2 class="screen-reader-text">Постраничная навигация</h2>';
		echo '<div class="nav-links">';
		echo paginate_links( $args ); 
		echo '</div></nav>';
	}
?>