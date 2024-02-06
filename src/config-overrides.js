const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(config, env) {
  // 난독화 설정 추가
  config.optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        keep_classnames: false,
        keep_fnames: false,
      },
    }),
  ];

  return config;
};
