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

const NAME = 'postcss-mm';

var postcss = require('postcss');

interface IPostCSSDeclaration {
    value: string;
}

interface IPostCSS {
    eachDecl: Function;
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
    execute(value: string) {
        var mm: number = ~~(value.toLowerCase().replace('mm', ''));
        var result = this.dpi * mm / 25.4;

        if (this.round) {
            result = Math.round(result);
        }

        return `${result}px`;
    }

}

export = (() => {
    return postcss.plugin(NAME, (options: Configuration) => {

        options = options || <Configuration>{round: true};

        let processor = new Processor(options.dpi, options.round);

        return (css: IPostCSS) => {
            css.eachDecl((declaration: IPostCSSDeclaration) => {
                if (Processor.REGEXE.test(declaration.value)) {
                    declaration.value = processor.execute(declaration.value);
                }
            });
        }
    });
})();
