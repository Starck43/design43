<?php
	$url = get_stylesheet_directory_uri();
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php esc_attr( bloginfo( 'charset' ) ); ?>" />
	<meta name="description" content="Гильдия дизайнеров Кировской области, лучшие дизайнеры Кирова, цены на услуги дизайнера, дизайнер интерьера, ТОП дизайнеры">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo $url; ?>/icons/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo $url; ?>/icons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo $url; ?>/icons/favicon-16x16.png">
	<link rel="manifest" href="<?php echo $url; ?>/icons/site.webmanifest">
	<link rel="mask-icon" href="<?php echo $url; ?>/icons/safari-pinned-tab.svg" color="#333333">
	<meta name="msapplication-TileColor" content="#000000">
	<meta name="theme-color" content="#000000">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<!-- Preloader -->
	<!-- <div id="dom-preloader" class="preloader"><i class="fa fa-spinner fa-spin"></i></div> -->
	<?php

	$custom_header = get_custom_header();
	if ( ! empty( $custom_header->attachment_id ) ) {
		$header_img_attr = sprintf(' style="background-image: url(%s)"', $custom_header->url);
		$background_class = 'header-background';
	}

	?>
	<header id="site-header" <?php starck_header_class(['site-header',$background_class]); echo $header_img_attr; ?>>


		<!-- header-container -->
		<div id="header-container" class="<?php echo 'branding-' . starck_get_option( 'branding_alignment' ); ?>">
	
			<?php
			$nav_position = starck_get_option( 'nav_position_setting' );
			if ( in_array($nav_position, ['above', 'below']) ) {
				// navigation
				starck_get_navigation();
			}
			?>	
			<section id="branding" <?php starck_branding_class('site-branding'); ?>>
				<?php
				$custom_logo_id = get_theme_mod( 'custom_logo' );
				if ( $custom_logo_id ) {
				?>
				<!-- logo -->
	            <div id="branding-logo" class="site-logo">
					<?php the_custom_logo(); ?>
	            </div>
				<?php
				}
				?>
			</section>

			<section id="header-content"  <?php printf('class="align-%1$s %2$s"',
													( "right" === starck_get_option( 'branding_alignment' ) ? 'left' : 'right'),
													( starck_get_option( 'nav_burger' ) ?  'burger-menu' : '' )
												); ?>>
				<?php 
				if ( starck_get_option( 'header_widget_setting' ) )
					starck_get_header_widget();

				if ( 'inline' == $nav_position )
					starck_get_navigation();
				?>
			</section>
		</div>
		<!-- end header container -->

	</header>

	<!-- main -->
	<main id="main" <?php starck_main_class('main'); ?> role="main">

		<?php starck_main_header(); ?>
		
		<!-- main container -->
		<div id="main-container" class="container">
