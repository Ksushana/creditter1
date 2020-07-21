module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: false,
          loose: true,
          corejs: '2',
          useBuiltIns: 'usage',
        },
      ],
    ],
    plugins: [
      [require.resolve('@babel/plugin-syntax-dynamic-import')],
      [
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        { useBuiltIns: true },
      ],
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      [
        require.resolve('@babel/plugin-transform-classes'),
        {
          loose: true,
        },
      ],
    ],
  };
};
