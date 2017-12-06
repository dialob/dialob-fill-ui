module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Dialob',
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    }
  },
  webpack: {
    html: {
      template: 'demo/src/index.html'
    }
  },
  karma: {
    testFiles: ['tests/**/*Test.js'],
    frameworks: ['mocha', 'chai', 'chai-immutable', 'intl-shim'],
    plugins: [
      require('karma-chai-plugins'),
      require('karma-chai-immutable'),
      require('karma-intl-shim')
    ]
  }
}
