// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {};

System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {
    'angular2/*': 'node_modules/angular2/*.js',
    'rxjs/*': 'node_modules/rxjs/*.js'
  },
  packages: {
    'base/src/app': {
      defaultExtension: false,
      format: 'register',
      map: Object.keys(window.__karma__.files).
      filter(onlyAppFiles).
      reduce(function createPathRecords(pathsMapping, appPath) {
        // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
        // './hero.service': '/base/src/app/hero.service.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
        var moduleName = appPath.replace(/^\/base\/src\/app\//, './').replace(/\.js$/, '');
        pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath];
        return pathsMapping;
      }, {})
    }
  }
});

System.import('angular2/src/platform/browser/browser_adapter').then(function (browser_adapter) {
  browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function () {
    return Promise.all(
      Object.keys(window.__karma__.files) // All files served by Karma.
        .filter(onlySpecFiles)
        .map(file2moduleName)
        .map(function (path) {
          return System.import(path);
        }));
  })
  .then(function () {
    __karma__.start();
  }, function (error) {
    console.error(error.stack || error);
    __karma__.start();
  });


function onlySpecFiles(path) {
  return /[\.|_]spec\.js$/.test(path);
}

function onlyAppFiles(filePath) {
  return /^\/base\/src\/app\/.*\.js$/.test(filePath)
}

// Normalize paths to module names.
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')
    .replace(/^\/base\//, '')
    .replace(/\.js/, '');
}
