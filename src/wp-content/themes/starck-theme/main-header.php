<?php

/*
 * description: The Main header plugin
 * author: S.Shabalin
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$page_id = get_queried_object_id();

$header_class = '';
$main_header_background = starck_get_option( 'content_header_background' );
$main_header_appearence = starck_get_option( 'content_header_setting' );
$gallery = get_post_meta( $page_id, 'gallery-image' );

if ( !in_array( $main_header_appearence, ['disabled'] ) ) {
	if ( $gallery || $main_header_background ) {
		$count_gallery = ($gallery) ? count($gallery) : 0;
		if ( $count_gallery == 1 || $main_header_background ) {
			if ($count_gallery == 1) {
				$image_url = wp_get_attachment_image_url(absint($gallery[0]), 'full' );
	;
			} elseif ( $main_header_background ) {
				$image_url = $main_header_background;
			} 
			$header_class = sprintf('class="header-background parallax" style="background-image: url(%s)"', $image_url);
		}
	} else
		$header_class = '';
	?>  
	<header id="main-header" <?php echo $header_class; ?>>

		<section class="site-branding align-center">
			<?php
			$custom_logo_id = get_theme_mod( 'custom_logo' );
			if ( $custom_logo_id ) {
				?>
				<!-- logo -->
				<div class="site-logo">
					<?php the_custom_logo(); ?>
				</div>
				<?php
			}
			?>
			<!-- header title -->
			<div class="branding-title">
				<h1 class="site-title">
					<?php echo esc_html( get_bloginfo( 'name' ) ); ?>
				</h1>
				<div class="site-description"><?php bloginfo( 'description' ); ?></div>
			</div>
		</section>

		<?php 
		if ( starck_get_option( 'scroll_up' ) ) {
			?>
			<div id="scroll-up" alt="Пролистать"><i class="icon fa fa-long-arrow-alt-down"></i></div>
			<?php 
		}
		?>

	</header>
	<?php
}
