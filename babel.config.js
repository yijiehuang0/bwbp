module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@app': './',
            '@assets': './assets/',
            '@components': './components/',
            '@env': './env.ts',
            '@screens': './screens/',
            '@utils': './utils/',
          },
        },
      ],
    ],
  };
};
