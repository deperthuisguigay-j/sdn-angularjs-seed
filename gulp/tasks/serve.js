var gulp = require('gulp');
var browserSync = require('browser-sync');
var connect = require('connect');
var config = require('../config');
var http = require('http');
var proxy = require('http-proxy-middleware');

// build and run the project for development purpose thanks to browsersync
// the 'watch' task permit to auto-rebuild and reload all modified code in real time
gulp.task('serve', ['lint', 'watch'], function (done) {

    var prism = require('connect-prism');

    // create and run a new connect-prism server
    // a proxy for backend requests with advanced mocking functions
    // prismMode : 'record' | 'mock' | 'proxy' | 'mockrecord'
    // cf. https://github.com/seglo/connect-prism#mode
    function prismInit(prismMode) {
        prismMode = prismMode || 'proxy';

        console.info('prism mode : ' + prismMode);

        // connect-prism middleware configuration
        // cf. https://github.com/seglo/connect-prism#options
        var prismConfig = {
            name: 'api',
            mode: prismMode,
            context: config.getConfig('api').basepath,
            host: config.getConfig('api').host,
            port: config.getConfig('api').port,
            delay: 'auto',
            rewrite: {
            }
        };

        // define the prism middleware
        prism.create(prismConfig);

        // define the connect http server, and use the prism middleware to handle backend requests
        var app = connect()
            .use(prism.middleware);

        // create the http server and run it
        http.createServer(app).listen(config.getConfig('prism').port);
    }

    // create and run the browser sync server
    // an http server with watch and reload functions used for serving the angular project itself
    // cf. https://www.browsersync.io/docs/gulp/
    function browserSyncInit(done) {

        var pathRewrite = {};
        pathRewrite[`^${config.getConfig('api').route}`] = config.getConfig('api').basepath;

        // configuration for the browser-sync http-proxy-middleware
        // used to redirect backend request (ex: /api) to the connect(-prism) server
        // cf. https://github.com/chimurai/http-proxy-middleware
        var apiProxy = proxy(config.getConfig('api').route, {
            target: 'http://localhost:' + config.getConfig('prism').port,
            changeOrigin: true, // for vhosted sites, changes host header to match to target's host
            pathRewrite: pathRewrite,
            logLevel: 'debug'
        });
        
        // create and run the http server
        browserSync({
            open: false,
            port: 9000,
            server: {
                baseDir: ['target/tmp/'],
                middleware: [ apiProxy ]
            }
        }, done);
    }

    prismInit(config.getConfig('prism').mode);
    browserSyncInit(done);
});

// build a release for production and run it for test purpose thanks to browsersync
gulp.task('serve:prod', ['release'], function (done) {
    browserSync({
        open: false,
        port: 9001,
        server: {
            baseDir: ['target/dist/app/']
        }
    }, done);
});
