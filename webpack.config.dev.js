const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    entry: "./src/index.js",
    output: {
        //resolve permite conocer donde se encuentra nuestro proyecto(el optimizado)
        path: path.resolve(__dirname, "dist"),
         //Nombre al .js(optimizado) resultante dentro de la carpeta dist
        filename: '[name].[contenthash].js',
    },
    mode:"development",
    devtool:"source-map", //Esta configuración es para el modo desarrollo
    resolve: {
        extensions: [".js", "jsx"], 
    },
    module:{
        rules:[
          {
              test:/\.(js|jsx)$/,//para que utilice los .mjs o sino los .js
              exclude: /node_modules/,//para que no busque extensiones .js o mjs en node_modules
              use:{
                  loader: "babel-loader",//Este es el cargador para usar babel con webpack 
              }
          },
          {
              test:/\.html$/,//para que utilice los .html extensiones
              use:{
                  loader: "html-loader",//Este es el cargador para usar sintaxis html
              }
          },
          {
              test:/\.css$/,
              use: [MiniCssExtractPlugin.loader, "css-loader"]
          }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin( //Para optimizar el html
        {
            filename: "index.html",
            title: "Note Machine",
            inject: true,  
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin( //Para optimizar el CSS
        {
            filename: "[name].[contenthash].css",
        }),
    ],
    devServer: { //Configuración del webpack-dev-server
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080,
        open: true, //Abre el navegador predeterminado al iniciarse el server
       
    }   
}