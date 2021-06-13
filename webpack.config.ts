import { Configuration } from 'webpack';

export default {
  module: {
    rules: [
      {
        test: /\.scss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: () => [
              require('postcss-import'),
              require('tailwindcss'),
              require('postcss-nested'),
              require('autoprefixer'),
            ],
          },
        },
      },
    ],
  },
} as Configuration;
