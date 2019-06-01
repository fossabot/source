module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/source/applic.lazies.js',
    '/manifest.json',
    '/node_modules/@webcomponents/webcomponentsjs/**/*.js',
    '/resources/**/*'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!.*\.js$|\/data\/).*/]
}
