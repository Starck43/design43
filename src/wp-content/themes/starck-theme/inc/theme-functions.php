<?php
define( 'STARCK_VERSION', '1.0.5' );


add_action('admin_head', 'add_custom_admin_styles');
function add_custom_admin_styles() {
	echo '<style>
		.wp-block {max-width: 1100px}
		.column-post_thumb {width: 80px;}
	</style>';
}

add_action( 'after_setup_theme', 'starck_setup' );
function starck_setup() {

	//добавление опции установки логотипа через настройки темы
	add_theme_support( 'custom-logo', array(
		'width'       => 400,
		'height'      => 120,
		'flex-width'  => true,
		'flex-height' => true,
		'uploads' 	  => true,
		'default-image' => get_stylesheet_directory_uri() . '/img/logo.png',
		'header-text' => array( 'site-title', 'site-description' )
	) );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption' ) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-color-palette', array() );
	//add_theme_support( 'woocommerce' );

	add_image_size( 'category-thumb', 450, 9999 ); // 450 в ширину и без ограничения в высоту
	add_image_size( 'mini-thumbnail', 100, 100, true ); // Кадрирование изображения
	set_post_thumbnail_size( 300, 300 ); // размер миниатюры поста по умолчанию

	global $content_width;
	if ( ! isset( $content_width ) ) { $content_width = 1920; }

	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'starck' ),
	) );

}

add_filter( 'document_title_separator', 'starck_document_title_separator' );
function starck_document_title_separator( $sep ) {
	$sep = '|';
	return $sep;
}

add_filter( 'the_title', 'starck_title' );
function starck_title( $title ) {
	if ( $title == '' ) {
		return '...';
	} else {
		return $title;
	}
}

add_filter( 'the_content_more_link', 'starck_read_more_link' );
function starck_read_more_link() {
	if ( ! is_admin() ) {
		return ' <a href="' . esc_url( get_permalink() ) . '" class="more-link">...</a>';
	}
}

add_filter( 'excerpt_more', 'starck_excerpt_read_more_link' );
function starck_excerpt_read_more_link( $more ) {
	if ( ! is_admin() ) {
		global $post;
		return ' <a href="' . esc_url( get_permalink( $post->ID ) ) . '" class="more-link">... [ещё]</a>';
	}
}

add_action ('wp_print_styles','remove_styles',100);
function remove_styles() {				
	wp_deregister_style('starck-theme-google-font'); 
}

if ( ! function_exists( 'starck_widgets_init' ) ) {
	add_action( 'widgets_init', 'starck_widgets_init' );
	/**
	 * Register widgets area
	 */
	function starck_widgets_init() {
		$widgets = array(
			'sidebar' => __( 'Sidebar', 'starck' ),
			'header' => __( 'Header', 'starck' ),
			'top-bar' => __( 'Top Bar','starck' ),
			'footer-1' => __( 'Footer 1', 'starck' ),

		);

		foreach ( $widgets as $id => $name ) {
			register_sidebar( array(
				'id'            => $id,
				'name'          => $name,
				'before_widget' => '<section id="%1$s" class="widget">',
				'after_widget'  => '</section>',
				'before_title'  => apply_filters( 'starck_start_widget_title', '<h2 class="widget-title">' ),
				'after_title'   => apply_filters( 'starck_end_widget_title', '</h2>' ),
			) );
		}
	}
}

add_filter('manage_posts_columns','posts_columns',5);
add_filter('manage_posts_custom_column','posts_custom_columns',5,2);

function posts_columns($columns) {
	$columns = array (
		'cb' => $columns['cb'],
		'post_thumb' => __('Миниатюра'),
		'title' => __('Title'),
		'date' => __('Date'),
	);
	return $columns;
}

function posts_custom_columns($column_name, $id) {

	if ($column_name === 'post_thumb') {
		if ( has_post_thumbnail() ) {
			the_post_thumbnail( array(50,50) );
		} else echo 'No Image';
	}
}

require_once trailingslashit( dirname( __FILE__ ) ) . 'customizer.php';
require_once trailingslashit( dirname( __FILE__ ) ) . 'defaults.php';
require_once trailingslashit( dirname( __FILE__ ) ) . 'markup.php';


//Theme functions define


/**
 * Add custom header classes to <header> element.
 * @param string|array $merged_class. Classes to add to the class list.
 */
function starck_header_class( $merged_class = '' ) {
	return apply_filters( "starck_add_header_class", $merged_class );
}

/**
 * Add custom branding classes to <id="branding"> element.
 * @param string|array $merged_class. Classes to add to the class list.
 */
function starck_branding_class( $merged_class = '' ) {
	return apply_filters( "starck_add_branding_class", $merged_class );
}

/**
 * Add custom menu classes to <nav> element.
 * @param string|array $merged_class. Classes to add to the class list.
 */
function starck_navigation_class( $merged_class = '' ) {
	return apply_filters( "starck_add_navigation_class", $merged_class );
}

/**
 * Add custom main classes to <main> element.
 * @param string|array $merged_class. Classes to add to the class list.
 */
function starck_main_class( $merged_class = '' ) {
	return apply_filters( "starck_add_main_class", $merged_class );
}

/**
 * Add custom content classes to <section id='content'> element.
 * @param string|array $merged_class. Classes to add to the class list.
 */
function starck_content_class( $merged_class = '' ) {
	return apply_filters( "starck_add_content_class", $merged_class );
}

/**
 * Add custom sidebar classes to <aside id='main-sidebar'> element.
 * @param string|array $merged_class. Classes to add to the class list.
 */
function starck_sidebar_class( $merged_class = '' ) {
	return apply_filters( "starck_add_sidebar_class", $merged_class );
}

/**
 * Add custom footer classes to <footer> element.
 * @param string|array $merged_class. Classes to add to the class list.
 */
function starck_footer_class( $merged_class = '' ) {
	return apply_filters( "starck_add_footer_class", $merged_class );
}


function starck_get_option( $option ) {
	$defaults = starck_get_defaults();

	if ( ! isset( $defaults[ $option ] ) ) {
		return;
	}

	$options = wp_parse_args( get_option( 'starck_settings', array() ), $defaults );

	return $options[ $option ];
}

if ( ! function_exists( 'starck_get_layout' ) ) {
	/**
	 * Get the sidebar layout for the current page.
	 *
	 * @return string
	 */
	function starck_get_layout() {

		if ( is_home() || is_archive() || is_search() || is_tax() ) {
			$layout = starck_get_option( 'blog_layout_setting' );
		} else
		if ( is_single() ) {
			$layout = starck_get_option( 'single_layout_setting' );
		} else
			$layout = starck_get_option( 'layout_setting' );

		return apply_filters( 'starck_sidebar_layout', $layout );
	}
}

if ( ! function_exists( 'starck_get_sidebar' ) ) {
	/**
	 * Construct Sidebar
	 */
	function starck_get_sidebar() {
		$layout = starck_get_layout();

		// If sidebar, show it.
		if ( in_array( $layout, ['left-sidebar','right-sidebar'] ) ) {
			get_sidebar();
		}
	}
}

if ( ! function_exists( 'starck_get_top_bar' ) ) {
	/**
	 * Construct Top Bar
	 */
	function starck_get_top_bar() {	
		if ( ! is_active_sidebar( 'top-bar' ) ) { return; }
		?>
		<!-- Top bar container -->
		<div id="top-bar" class="container">
			<?php dynamic_sidebar( 'top-bar' ); ?>
		</div>
		<?php 
	}
}

if ( ! function_exists( 'starck_get_header_widget' ) ) {
	/**
	 * Build our header widget.
	 */
	function starck_get_header_widget() {	
		if ( ! is_active_sidebar( 'header' ) ) { return; }
		dynamic_sidebar( 'header' );
	}
}

if ( ! function_exists( 'starck_get_footer_widgets' ) ) {
	/**
	 * Build our footer widgets.
	 */
	function starck_get_footer_widgets( $widgets ) {

		if (
			! is_active_sidebar( 'footer-1' ) &&
			! is_active_sidebar( 'footer-2' ) &&
			! is_active_sidebar( 'footer-3' ) )
		{
			return;
		}
		?>

		<div id="footer-widgets" class="site footer-widgets">
			<!-- footer-widgets -->
			<?php
			if ( $widgets >= 1 ) { starck_add_footer_widget( 1 ); }
			?>
		</div>
		<?php
	}
}


/**
 * Build every preset footer widget
 */
function starck_add_footer_widget( $widget ) {
	?>
	<div class="footer-widget footer-widget-<?php echo absint( $widget ); ?>">
		<?php dynamic_sidebar( 'footer-' . absint( $widget ) ); ?>
	</div>
	<?php
}

/**
 * Construct Navigation menu (primary/secondary) 
 */
if ( ! function_exists( 'starck_get_navigation' ) ) {
	/**
	 * Build our navigation.
	 */
	function starck_get_navigation() {	

		if ( 'none' === starck_get_option( 'nav_position_setting' ) ) return;
		if ( ! has_nav_menu( 'primary' ) ) return;
		
		$nav_burger = starck_get_option( 'nav_burger' );

		$primary_args = array( 
			'theme_location' => 'primary',
			//'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul><div id="menu-icon" class="burger-menu">&#9776;</div>',
			//'link_after' => '<i class="icon"></i>', // Add element icon after link for each menu item
			'container' => ''
		);

		?>
		<nav id="header-nav" <?php starck_navigation_class( $nav_burger ? 'burger' : '' ); ?> role="navigation">
			<?php
			wp_nav_menu( $primary_args );
			//wp_nav_menu( $secondary_args );
			if ( starck_get_option( 'nav_search_setting' ) ) {
			?>
				<div id="site-search-modal"><?php get_search_form(); ?></div>

				<div id="nav-search"><i class="icon icon-search"></i></div>
			<?php
			}

			$burger_class = sprintf(' class="icon burger-icon%s"', starck_get_option( 'nav_burger' ) ?  ' show' : '' );
			?>
			<div id="nav-burger"<?php echo $burger_class; ?>><div class="burger-inner"></div></div>
		</nav>
		<?php
	}
}


function starck_breadcrumbs() {	

	if ( starck_get_option( 'breadcrumbs_setting' ) ) {

		get_template_part( 'breadcrumbs' ); 

	}
}

function starck_back_to_top() {
	$options = wp_parse_args( get_option( 'starck_settings', array() ), starck_get_defaults() );

	if ( starck_get_option('back_to_top') ) {
		?>
		<a id="back-to-top" title="Вернуться наверх" rel="nofollow" href="/"><i class="icon fa icon-up-open-mini"></i></a>
		<?php
	}
}

function starck_main_header() {	

	$header_setting = starck_get_option( 'content_header_setting' );

	if ( ( 'front-page' == $header_setting && ( is_home() || is_front_page() ) ) || 
		 ('all-pages' == $header_setting && ( is_home() || is_front_page() || is_page() || is_archive() ) ) ) {

		get_template_part( 'main','header' ); 

	}
}
