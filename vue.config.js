/* eslint-disable */
module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap(args => {
      args[0].title = 'Movie balanceship';
      return args;
    });
  },
  publicPath: '/movie-balanceship/',
};
