var path = require("path");
var webpack = require("webpack");

var node_env = process.env.NODE_ENV === "development"
    ? "development"
    : "production";//default to prod

var conf = {
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "app")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {loader: "eslint-loader"},
                ]
                , exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ]
            },
            {
                test: /\.(png|jpg|gif|otf|eot|svg|ttf|woff|woff2)(\?.*)?$/i,
                use: [
                    {loader: "url-loader"},
                ]
            }
        ],
        noParse: /\.elm$/
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(node_env)
            }
        })
    ]
};

if(node_env === "production"){
    conf.devtool = "source-map";

    conf.plugins = conf.plugins.concat([
        //Clean and minify JS bundle
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]);
}else{
    conf.devtool = "eval";
}

module.exports = conf;
