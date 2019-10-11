<?php 

/*
 * The template for displaying search results
 *
 * @author: S.Shabalin
 */

get_header();

?>

	<section id="content" class="search" role="main">

		<?php if ( have_posts() ) : ?>

			<header class="search-header">
				<h1 class="search-title">Результат поиска</h1>
			</header>
			<article id="post-<?php the_ID(); ?>" <?php post_class('post search-result found'); ?>>
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'entry' ); ?>
				<?php endwhile; ?>
				<?php get_template_part( 'nav', 'below' ); ?>
			</article>
		<?php else : ?>

			<div class="entry-content post-0 no-result not-foun">
				<p><?php esc_html_e( 'Sorry, nothing matched your search. Please try again.', 'starck' ); ?></p>
				<?php get_search_form(); ?>
			</div>

		<?php endif; ?>

		<div class="search-query">Поисковый запрос: <span><?php echo esc_html__( get_search_query() ); ?></span></div>
		<div class="goto-back">
			<a href = "/" <?php echo 'onclick="javascript:history.back(); return false;"'?>><i class="icon fa fa-angle-left"></i><span><?php esc_html_e( 'Вернуться назад', 'starck' ); ?></span></a>
		</div>

	</section>

	<?php starck_get_sidebar(); ?>

<?php get_footer(); ?>