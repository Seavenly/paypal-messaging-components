const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    // messaging.js
    const MESSAGES_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/index.js'),
        path: path.resolve(__dirname, '../../dist'),
        filename: 'messaging.js',
        modulename: ['paypal', 'Messages'],
        libraryTarget: env.demo ? 'umd' : 'window',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyze,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'standalone'
        })
    });
    MESSAGES_CONFIG.output.libraryExport = 'Messages';

    // TODO: Remove this after the ramp
    const MODAL_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/old/modal/index.js'),
        path: path.resolve(__dirname, '../../dist'),
        filename: 'smart-credit-modal.js',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'modal'
        })
    });

    return [MESSAGES_CONFIG, MODAL_CONFIG];
};