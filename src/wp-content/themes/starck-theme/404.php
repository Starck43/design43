<?php get_header(); ?>

	<section id="content" <?php starck_content_class(); ?>>

		<article id="post-0" class="post not-found">

			<header class="entry-header">
				<h1 class="entry-title"><?php esc_html_e( 'Not Found', 'starck' ); ?></h1>
			</header>

			<div class="entry-content">
				<p><?php esc_html_e( 'Nothing found for the requested page. Try a search instead?', 'starck' ); ?></p>
				<?php get_search_form(); ?>
			</div>

		</article>

		<div class="goto-back">
			<a href = "#" <?php echo 'onclick="javascript:history.back(); return false;"'?>><?php esc_html_e( 'Вернуться назад', 'starck' ); ?></a>
		</div>

	</section>

	<?php starck_get_sidebar(); ?>

<?php get_footer(); ?>