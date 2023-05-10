import pkg from './package.json';

let banner = `/*! ${pkg.name}\nv${pkg.version}\n${pkg.description}\nCopyright ${new Date().getFullYear()}\n${pkg.license} license */\n\n`;

// The files to bundle
let files =  [ 'index.js', 'treasure.js', 'dice.js' ]; 

// Create the bundle object
export default files.map(function (file) {
    return {
        input: `src/${file}`,
        output: {
            file: file,
            format: 'iife',
            banner: banner
        }
    };
});