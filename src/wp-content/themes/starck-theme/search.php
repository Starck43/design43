<?php 

/*
 * The template for displaying search results
 *
 * @author: S.Shabalin
 */

get_header();

global $wp_query;

?>

	<section id="content" class="search search-result">

		<?php if ( have_posts() ) : ?>

			<header class="search-header">
				<h1 class="search-title">Результат поиска</h1>
			</header>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'entry' ); ?>
			<?php endwhile; ?>
			<?php get_template_part( 'nav', 'below' ); ?>
		<?php else : ?>

			<div class="entry-content post-0 no-result not-found">
				<p>Извините, но по Вашему запросу ничего не найдено! Попробуйте снова</p>
				<?php get_search_form(); ?>
			</div>

		<?php endif; ?>

		<div class="search-query">Поисковый запрос: <span><?php echo esc_html__( get_search_query() ); ?></span></div>
		<div class="post-count">Найдено по запросу записей: <span><?php echo $wp_query->found_posts; ?></span></div>
		<div class="goto-back">
			<a href = "/" <?php echo 'onclick="javascript:history.back(); return false;"'?>><?php esc_html_e( 'Вернуться назад', 'starck' ); ?></a>
		</div>

	</section>

	<?php starck_get_sidebar(); ?>

<?php get_footer(); ?>