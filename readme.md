# postcss-mm

PostCSS processor for converting `mm` to `px` values

## Example

Using with [gulp-postcss](https://github.com/postcss/gulp-postcss):

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var mm = require('postcss-mm');

gulp.task('css', function () {
    var processors = [
        mm({dpi: 72})
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors) )
        .pipe(gulp.dest('./dist') );
});
gulp.task('default',['webp', 'css']);
```

## Configuration

  * `dpi`: The dpi value against which the conversion should be performed (default: `72`).
  * `round`: Should the processor round the results (default: `true`).

## Development

### Compile TypeScript

```sh
npm run build
```

## License

MIT © 2015, André König (andre.koenig@posteo.de)
