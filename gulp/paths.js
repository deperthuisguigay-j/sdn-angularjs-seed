module.exports = {
    source: ['app/src/{,*/,*/*/}*.js', 'app/src/common/{,*/,*/*/}*.js'],
    html: ['app/src/{,*/,*/*/}*.html'],
    config: ['app/config/{,*/,*/*/}*.json'],
    index: 'app/index.html',
    json: ['app/src/{,*/,*/*/}/*.json', 'app/src/common/{,*/,*/*/}/*.json'],
    templates: 'app/**/*.tpl.html',
    less: ['app/{,*/,*/*/,*/*/*/}*.less'],
    output: 'target/tmp/',
    outputCss: 'target/tmp/**/*.css',
    tests: 'test/e2e/**/*.spec.js',
    release: 'target/dist/**/*',
    releaseFolder: 'target/dist/', 
    jspm: ['./app/libs/**/*.{js,js.map,css}','!./app/libs/**/*.{gzip,md,json}'],
    systemConfig:  'app/system.config.js'
};
