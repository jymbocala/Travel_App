const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        libraryTarget: "var",
        library: "Client",
    },
    optimization: {
        minimizer: [new TerserPlugin({}),new CssMinimizerPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    {
                      // Adds CSS to the DOM by injecting a `<style>` tag
                    loader: MiniCssExtractPlugin.loader
                    },
                    {
                      // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                    },
                    {
                      // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                        plugins: function () {
                            return [
                            require('autoprefixer')
                            ];
                        }
                        }
                    }
                    },
                    {
                      // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/html/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ]
}
