const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin'),
    TerserWebpackPlugin = require('terser-webpack-plugin'),
    {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer'),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    SpriteLoaderPlugin = require('svg-sprite-loader/plugin'),
    ImageminPlugin = require('imagemin-webpack-plugin').default;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    // splitChunks: {
    //   chunks: 'all'
    // }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].${ext}`

const cssLoaders = extra => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hrm: true,
      reloadAll: true,
      modules: true
    }
  }, 'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
    }
  }];

  // if (isDev) {
  //   loaders.push('eslint-loader');
  // }

  return loaders;
}

const plugins = () => {
  const base  = [
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    new HtmlWebpackPlugin({
      template: './pug/index.pug',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/about.pug',
      filename: 'about.html',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/portfolio.pug',
      filename: 'portfolio.html',
      chunks: ['portfolio'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/team.pug',
      filename: 'team.html',
      chunks: ['team'],
    }),
    new HtmlWebpackPlugin({
      template: './pug/news.pug',
      filename: 'news.html',
      chunks: ['news'],
    }),
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/favicon.ico'),
        to: path.resolve(__dirname, '')
      },
      {
        from: path.resolve(__dirname, 'src/assets/fonts'),
        to: path.resolve(__dirname, 'assets/fonts')
      },
      {
        from: path.resolve(__dirname, 'src/assets/pics'),
        to: path.resolve(__dirname, 'assets/pics')
      },
      {
        from: path.resolve(__dirname, 'src/assets/images'),
        to: path.resolve(__dirname, 'assets/images')
      },
      {
        from: path.resolve(__dirname, 'src/assets/svg'),
        to: path.resolve(__dirname, 'assets/svg')
      },
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i }),
    new MiniCssExtractPlugin({
      filename: './css/custom/' + filename('css')
    }),
    new SpriteLoaderPlugin(),
  ]

  return base;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './assets/js/index.js',
    about: './assets/js/about.js',
    portfolio: './assets/js/portfolio.js',
    team: './assets/js/team.js',
    news: './assets/js/news.js',
  },
  output: {
    filename: './js/custom/' + filename('js'),
    path: path.resolve(__dirname, '')
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@js': path.resolve(__dirname, 'src/assets/js'),
      '@js-modules' : path.resolve(__dirname, 'src/assets/js/modules'),
      '@': path.resolve(__dirname, 'src'),
      '@styles' : path.resolve(__dirname, 'src/assets/sass'),
      '@images' : path.resolve(__dirname, 'src/assets/images'),
      '@pics' : path.resolve(__dirname, 'src/assets/pics'),
      '@svg' : path.resolve(__dirname, 'src/assets/svg'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  optimization: optimization(),
  devServer: {
    // historyApiFallBack: true,
    hot: isDev,
    inline: true,
    host: 'localhost',
    port: 4200,
    // proxy: {
    //   '/': {
    //     target: 'http://u.7enov.com.ua:4000',
    //     // pathRewrite: {'^/api' : ''},
    //     changeOrigin: true,
    //     secure: false,
    //   }
    // },
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        loaders: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }]
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        include: path.resolve(__dirname, 'src/assets/fonts'),
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            type: 'assets/fonts',
            name: '[path][name].[ext]',
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
    ]
  }
}