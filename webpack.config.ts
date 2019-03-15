import fs from 'fs';
import os from 'os';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import dotenv from 'dotenv';
import chalk from 'chalk';

// make log statements colorful
const info = chalk.blue;
const warn = chalk.bold.yellow;
const error = chalk.bold.red;
// ! recommend vscode packages to install with recommended
// const recommended = chalk.bold.magentaBright;

// dotenv package is needed to read the root .env file and append to process.env
dotenv.config();

// initialize array of the variables that must be included in the .env file
const environmentVariables = [
  {
    key: 'NODE_ENV',
    value: 'development',
  },
  {
    key: 'NODE_PEM',
    value: '<./path/to/pem/file>',
  },
  {
    key: 'NODE_KEY',
    value: '<./path/to/key/file>',
  },
  {
    key: 'NODE_CA',
    value: '<./path/to/ca/file/created/by/mkcert>',
  },
  {
    key: 'NODE_FOLDER',
    value: '<./path/to/folder/containing/pem/and/key/files>',
  },
  {
    key: 'NODE_URL',
    value: 'tos.collegeboard.org',
  },
  {
    key: 'NODE_PORT',
    value: 8080,
  },
];

try {
  // attempt to read the .env file. If it fails, go to catch statement
  fs.readFileSync('.env');

  // go through the process.env object and find the environment variables (with values)
  Object.entries(process.env)
    .filter(([envName, envValue]) => envName.includes('NODE_') && envValue.length > 0)
    .reduce((previousStore, [name], i, array) => {
      // remove environment names from the store as they are found
      const newStore = previousStore.filter(env => env.key !== name);

      // on the final iteration of the actual environment variables
      if (i === array.length - 1) {
        // if names still exist, it means the .env file is missing some
        if (newStore.length > 0) {
          // for each variable missing (will still be in the store), log it
          newStore.map(({ key, value }) =>
            console.log(
              error(
                `You are missing the variable ${key} from your environment file. Please add it to the .env file at the root of your directory with a value of ${value}.`,
              ),
            ));

          // terminate execution of program
          process.exit();
        }
      }

      // make store updates available for next iteration
      return newStore;
      // initialize store to the array of expected environment variables
    }, environmentVariables);
} catch {
  // notify the developer if a .env file was not found and help them create one
  console.warn(
    error(
      'STOP RIGHT THERE! You have not created an environment file, but that is OK. Create a .env file at the root of your directory and this error will go away. Be sure to add the following key/value pairs to it without quotes:\n',
    ),
    environmentVariables.map(({ key, value }) => warn(`${key}=${value}`)).join('\n '),
  );

  // terminate execution of program
  process.exit();
}

// set the environment to dev or prod
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// the path to the https folder containing the key and pem files
const httpsFolder = path.join(os.homedir(), process.env.NODE_FOLDER);

// webpack configuration object
const config: webpack.Configuration = {
  // determine webpack optimizations
  mode: env,

  /*
  see:
  [HMR] Updated modules:
    [HMR]  - ./../MyModule1.jsx
    [HMR]  - ./../MyModule2.jsx

  instead of:
  [HMR] Updated modules:
    [HMR]  - 1009
    [HMR]  - 1007

  Note: this invalidates the new webpack.NamedModulesPlugin()
   */
  optimization: {
    namedModules: true,
  },

  // enable sourcemaps for debugging webpacks output
  // devtool: 'eval-source-map',
  devtool: 'source-map',

  // directory tree to start bundling files
  entry: { app: './client/app/index.tsx' },

  // directory to save webpack bundled files
  output: {
    // create and save bundled files to a folder named dist
    path: path.resolve(__dirname, 'dist'),

    publicPath: path.resolve(__dirname, 'dist'),

    // name of the bundled file
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      // patch react-dom package to enable react 16.6+ features
      'react-dom': '@hot-loader/react-dom',
    },
    plugins: [
      // allows typescript to recognize paths defined in paths in the tsconfig.json
      new TsconfigPathsPlugin(),
    ],
  },

  devServer: {
    // open app in a new tab
    open: false,

    // enable hmr
    hot: true,

    // enable gzip compression for everything served
    compress: true,

    // watch for file changes
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },

    // all 404s redirect to index.html
    historyApiFallback: true,

    // files are served from the dist folder created in memory by dev server
    // tells the path where to take static files
    contentBase: path.resolve(__dirname, 'dist'),

    publicPath: path.resolve(__dirname, 'dist'),

    // Show full-screen overlay in the browser when there are compiler errors
    overlay: true,

    writeToDisk: true,

    // url that will open when you run the start script
    host: process.env.NODE_URL,

    // configure https
    https: {
      key: fs.readFileSync(`${path.resolve(`${httpsFolder}`, process.env.NODE_KEY)}`, 'utf8'),
      cert: fs.readFileSync(path.resolve(`${httpsFolder}`, process.env.NODE_PEM)),
      ca: fs.readFileSync(path.resolve(__dirname, process.env.NODE_CA)),
    },

    // setup the port
    port: Number(process.env.NODE_PORT) || 8080,

    // only log relevant statistics
    stats: {
      // renders various colored text output during webpack build
      colors: true,
      // adds the hash of the build
      hash: false,
      // adds timing info: ie "Time: 17007ms"
      timings: true,
      // would display chunk info
      chunks: false,
      // would display built modules info to chuck info
      chunkModules: false,
      // would display built modules info
      modules: false,
      entrypoints: false,
      assets: false,
    },

    after: () =>
      console.log(
        info(`
        If you are using vscode, consider installing the following modules:

        YAML: formats yaml files
      `),
      ),
  },

  module: {
    // the order of loaders matters
    // first transpile the tsx files through babel-loader, then through ts-loader
    rules: [
      {
        test: /\.tsx?$/,
        // dont transpile node_modules
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              // cache previous babel transpilations
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
              plugins: [
                'react-hot-loader/babel',
                '@babel/plugin-transform-react-jsx-source', // add source file and line numbers to jsx
                // fixes regenerator runtime error
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true,
                  },
                ],
                // fixes exports is not defined error
                '@babel/plugin-transform-modules-commonjs',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // defer type checking to fork-ts-checker-webpack-plugin for speed
              // otherwise there would be duplicate errors from typescript
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|c)ss$/,
        use: [
          // style-loader for dev, css chunks for prod
          env ? 'style-loader' : ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // delete all files in the dist directory before each build
    new CleanWebpackPlugin(['dist']),

    // runs typescript type checker on a separate process so that its faster
    // results in the green "no type errors found" message when compiling
    new ForkTsCheckerWebpackPlugin(),

    // needed in for --hot parameter to work in webpack-dev-server
    new webpack.HotModuleReplacementPlugin(),

    // 1. import dotenv
    // 2. dotenv.config() immediately after
    // 3. this line adds environment variables to the bundle
    new webpack.EnvironmentPlugin(['NODE_ENV', 'NODE_DISPLAY', 'NODE_STYLE']),

    // enables hmr for css changes
    new ExtractCssChunks({ filename: 'css/style.css' }),

    // create index.html file in dist folder during 'npm run build'
    // base the index file off of the one in the public folder
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      inject: 'body',
    }),
  ],
};

export default config;
