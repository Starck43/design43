/*
 * Gulpfile.js
 * Version: 1.0.8
 * Author: S.Shabalin
 */

var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass')(require('sass')),   // Подключаем SASS
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для слияния файлов)
	uglify       = require('gulp-uglify-es').default, // Подключаем плагин для сжатия JS
	jsRequires   = require('gulp-resolve-dependencies'), // Подключаем пакет для импортирования скриптов через //@requires *.js
	postcss      = require("gulp-postcss"),
	combineCSS   = require('gulp-group-css-media-queries'),  // Объединяет все @media
	cssImport    = require('postcss-import'),   // Подключаем пакет для импортирования кода css, прописанного через @import '*.css'
	cleanCSS     = require('gulp-clean-css'), // Подключаем пакет для минификации CSS с объединением одинаковых медиа запросов
	sourcemaps   = require('gulp-sourcemaps'), // Подключаем пакет sourcemaps для нахождения исходных стилей и скриптов в режиме dev-tool браузера
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	//imgCompress  = require('imagemin-jpeg-recompress'), // Подключаем библиотеку для работы с изображениями
	mozjpeg 	 = require('imagemin-mozjpeg'),
	imageResize  = require('gulp-image-resize'),
	pngquant 	 = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

var path = {
		src: 'src/', // Здесь хранятся исходные данные
		dest: 'src/wp-content/themes/starck-theme/' // Путь до дочерней темы WP.
	}
var site = {
		http: 'interior-west.loc' // здесь нужно указать адрес рабочего сайта, удаленного или локального
}

gulp.task('message', async function() { // Вывод любой информации в консоль
	console.log('Console message');
});


gulp.task('styles', gulp.series(function(done) { // таск 'styles' обработает все файлы *.sass, вложенные в любые подпапки
	return gulp.src(path.src+'sass/*.sass')
	// Пример: gulp.src('src/sass/*.+(sass|scss)')
	// Пример: gulp.src(['src/sass/**/*.sass','!src/sass/libs.sass'])  ! - кроме styles.sass
	//.pipe(sourcemaps.init()) //инициализируем soucemap
	.pipe(sass({ outputStyle: 'expanded' })) //  Опция { outputStyle: 'expanded' } развертывает все унификации
	/*
		файлы с подчеркиванием не участвуют в компиляции, например, _part.sass.
		Его подключают через @import 'part' в файле *.sass
	*/
	.pipe(concat('main.min.css')) // Объединяем все найденные файлы в один
	.pipe(combineCSS()) //Объединяем медиа запросы
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 3 versions']
	})) // Создаем префиксы
	//.pipe(sourcemaps.write()) //пропишем sourcemap
	.pipe(cleanCSS({level:2})) // Сжимаем CSS файл
	.pipe(gulp.dest(path.dest+'css')) // Выгружаем результат в папку dest::/css
	.pipe(browserSync.stream()); // Обновляем CSS на странице при изменении

	done();
}));

gulp.task('vendors-styles', async function() { // таск обработает все файлы *.css, вложенные в css/, кроме сжатых и main.css
	return gulp.src([path.src+'css/*.css'])
	.pipe(postcss([ cssImport ])) // Импортируем стили, прописанные через команду @import в начале файла
	.pipe(concat('vendors.min.css')) // Объединяем все найденные файлы в один
	.pipe(combineCSS()) //Объединяем медиа запросы
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 3 versions']
	})) // Создаем префиксы
	.pipe(cleanCSS({level:2})) // Сжимаем CSS файл
	.pipe(gulp.dest(path.dest+'css')) // Выгружаем результат в папку dest::/css
	.pipe(browserSync.stream()); // Обновляем CSS на странице при изменении
});

// Скрипт запускается только вручную
gulp.task('css-compress', async function() {
	gulp.src(path.dest+'css/main.css') // Сжимаем библиотеки
	.pipe(cleanCSS({level:2})) // Сжимаем CSS файл
	.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
	.pipe(gulp.dest(path.dest+'css'))
});

gulp.task('scripts', async function() {
	return gulp.src([path.src+'js/custom*.js'])
	//.pipe(sourcemaps.init()) // Инициализируем sourcemap
	.pipe(concat('custom.min.js')) // Объединяем в один файл
	.pipe(uglify()) // Сжимаем JS файл
	//.pipe(sourcemaps.write()) // Пропишем карты
	.pipe(gulp.dest(path.dest+'js')) // Выгружаем в папку dest::/js
	.pipe(browserSync.reload({ stream: true }))  // Обновляем страницу после изменения своего скрипта
});

// Запускается тогда, когда добавляются сторонние скрипты в src/js и формируется общий файл vendors.min.js
gulp.task('vendors-scripts', function() {
	return gulp.src([ // Берем нужные библиотеки вендорных скриптов
			//'node_modules/jquery/dist/jquery.min.js', // jQuery plug-in (npm i --save jquery)
			path.src+'js/*.js', // Vendors scripts.
			'!'+path.src+'js/custom*.js'
		])
	.pipe(jsRequires({ // подключаем внешние скрипты, если они прописаны в заголовке файлов через @requires
	  pattern: /\* @requires [\s-]*(.*\.js)/g
	})).on('error', function(err) {console.log(err.message)})
	.pipe(concat('vendors.min.js')) // Объединяем в один файл
	.pipe(uglify()) // Сжимаем JS файл
	.pipe(gulp.dest(path.dest+'js')) // Выгружаем в папку dest::/js
	.pipe(browserSync.reload({ stream: true }))  // Обновляем страницу после изменения своего скрипта
});

gulp.task('php', function() {
	return gulp.src([path.dest+'**/*.html', path.dest+'**/*.php'])
		.pipe(browserSync.reload({ stream: true }))
});

// Скрипт запускается только вручную
gulp.task('img', function() {
	return gulp.src('resources/**/*.+(jpg|png)') // Берем все изображения из img
		/*
		.pipe(imageResize({
			width : 1700,
			height : 1200,
			cover: true, // If set to true, the resized images will maintain aspect ratio by overflowing their dimensions as necessary, rather than treating them as maximum-size constraints.
			//crop : true, // Determines whether images will be cropped after resizing to exactly match options.width and options.height
			//upscale : true, // true - Если размер изображения меньше порогового, то оно растянется до установленного
			//filter: 'Hermite', // Point, Box, Triangle, Hermite, Hanning, Hamming, Blackman, Gaussian, Quadratic, Cubic, Catrom, Mitchell, Lanczos, Bessel, Sinc
							//'Catrom' is very good for reduction, while 'Hermite' - for enlargement
			//noProfile: true, // Set to true to enforce removal of all embedded profile data like icc, exif, iptc, xmp and so on.
			//interlace: true, // Set to true to create interlaced images (also known as "progressive" JPEG)
			//ImageMagick: true,
		}))
		*/
		.pipe(imagemin([
			mozjpeg({quality: 80}),
			pngquant({quality: '65-80'}),
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(path.src+'img')); // Выгружаем в папку dest::/img
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Определяем параметры сервера.
		//server: { baseDir: path.src },  // Нельзя подключать одновремено с proxy
		host: site.http,
		proxy: site.http,
		//tunnel: true, tunnel: 'dsmira', // Demonstration page: http://projectname.localtunnel.me
		notify: false, // Отключаем уведомления
		online: false, // false - work offline without internet connection
		open: false, // open browser on start
	});
});

gulp.task('watch', function() { //таск слежения изменений в sass,css,html,php,js.
	gulp.watch([path.src+'sass/**/*.sass'], gulp.series('styles')); // Наблюдение за sass файлами в папке sass
	gulp.watch([path.src+'css/*.css', '!'+path.src+'css/main.css'], gulp.parallel('vendors-styles')); // Наблюдение за вендорными css файлами в папке _src
	gulp.watch([path.src+'js/custom.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом
    gulp.watch([path.src+'js/**/*.js', '!'+path.src+'js/custom*.js', path.src+'plugins/**/*.js'], gulp.parallel('vendors-scripts')); // Наблюдение за сторонней библиотекой JS файлов
	gulp.watch([path.dest+'**/*.html', path.dest+'**/*.php'], gulp.parallel('php')); // Наблюдение за HTML файлами в корне проекта
});


// Deploy - выгрузка готового сайта на хостинг
gulp.task('rsync', function() {
	return gulp.src(path.src+'')
	.pipe(rsync({
		root: path.src,
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});


//Дефолтный таск для запуска процессов слежения за изменениями кода. Выполняется командой Gulp без параметров
gulp.task('default', gulp.parallel('vendors-styles', 'vendors-scripts', 'browser-sync', 'watch'));
