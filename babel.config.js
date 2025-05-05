// babel.config.js
module.exports = {
    presets: [
      [
        'next/babel',
        {
          'preset-env': {
            targets: {
              browsers: ['> 1%', 'not ie 11', 'not op_mini all']
            },
            // Éviter les polyfills inutiles
            useBuiltIns: 'usage',
            corejs: 3,
            // Éviter les transformations inutiles
            bugfixes: true,
            loose: true
          }
        }
      ]
    ]
  };