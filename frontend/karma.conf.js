module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    // list of files / patterns to load in the browser
    files: [
      //'node_modules/traceur/bin/traceur-runtime.js',
      { pattern: 'app/build/**/*.js', included: false, serve: true },
      'node_modules/es6-module-loader/dist/es6-module-loader.js',
      'node_modules/systemjs/dist/system.js',
      'https://code.angularjs.org/2.0.0-snapshot/angular2.js', // TODO: Find a way of loading from node_modules!
      'karma-test-shim.js',
      {
        pattern: 'app/test/**/*spec.js',
        included: false,
        serve: true,
        watch: true
      }
    ],


    // list of files to exclude
    exclude: [
      'app/build/bootstrap.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['typescript']
    },

    typescriptPreprocessor: {
      "compilerOptions": {
        "target": "ES5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
      },
      "exclude": [
        "node_modules"
      ]
    },

    transformPath: function(path) {
      return path.replace(/\.ts$/, '.js');
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter'
    ]
  })
};