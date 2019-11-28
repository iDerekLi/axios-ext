module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true,
              node: 'current',
            },
          },
        ],
      ],
    },
  },
  plugins: ['@babel/plugin-syntax-dynamic-import'],
};
