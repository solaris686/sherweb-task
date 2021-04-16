const gulp         = require("gulp");
const sass         = require("gulp-sass");
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano      = require("cssnano");
const babel        = require('gulp-babel');
const sourcemaps   = require("gulp-sourcemaps");
const browserSync  = require("browser-sync").create();

const source = {
    sass: {
        src: "scss/**/*.scss",
        dest: "css",
    }
};

const style = () => {
    return gulp
        .src(source.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([
                autoprefixer(),
                cssnano()
            ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(source.sass.dest))
        .pipe(browserSync.stream());
}

const reload = (callback) => {
    browserSync.reload();
    callback();
}

const watch = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(source.sass.src, style);
    gulp.watch("*.html", reload);

}

const build = gulp.parallel(style);

gulp.task('default', watch);

exports.watch = watch;
exports.build  = build;
