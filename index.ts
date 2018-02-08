///<reference path='./typings/tsd'/>

/**
 * postcss-mm
 *
 * Copyright, 2015 - furny.io
 *
 */

/**
 *
 * @author André König <andre.koenig@posteo.de>
 *
 */

var postcss = require('postcss');
var pkg = require('./package.json');

interface IPostCSSDeclaration {
    value: string;
    selector: string;
}

interface IPostCSS {
    walkDecls: Function;
}

interface Configuration {
    round: boolean;
    dpi: number;
}

class Processor {

    static REGEXE = /[0-9]+mm/gi;

    constructor(private dpi = 72, private round = true) {}

	/**
	 * Executes the conversion from `mm` to `px` values.
	 * 
	 */
    execute(value: string, match: string) {
        var mm: number = ~~(match.toLowerCase().replace('mm', ''));
        var result = this.dpi * mm / 25.4;

        if (this.round) {
            result = Math.round(result);
        }

        return value.replace(match, `${result}px`);
    }

}

export = (() => {
    return postcss.plugin(pkg.name, (options: Configuration) => {

        options = options || <Configuration>{round: true};

        let processor = new Processor(options.dpi, options.round);

        return (css: IPostCSS) => {
            css.walkDecls((declaration: IPostCSSDeclaration) => {
                var matches = declaration.value.match(Processor.REGEXE) || [];

                if (matches.length) {
                    matches.forEach((match) => {
                        declaration.value = processor.execute(declaration.value, match);
                    });
                }
            });
        }
    });
})();
