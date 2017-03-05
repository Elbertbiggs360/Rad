module.exports = {
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.bundle.js',
    'dist/**.bundle.css',
    'dist/assets/images/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /eradapi\.herokuapp\.com/,
    handler: 'networkFirst'
  }]
};