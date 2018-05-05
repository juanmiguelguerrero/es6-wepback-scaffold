const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	entry: [
		'./src/main.js',
		'./src/style.scss'
	],
    output: {
        filename: 'main.js',
		path: path.resolve(__dirname, 'public')
    },
	watch: true,
    module: {
        rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',						
					}
				}
			},
            {
                 test: /\.js$/,
				 exclude: /node_modules/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }			
            },
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?-minimize', 'sass-loader']
				})
		    }
        ]
    },
	devServer: {
		contentBase: path.join(__dirname, "public"),
		compress: true,
		port: 3000,
		open: true,
		stats: "errors-only"
	},
    resolve: {
        extensions: [".js", ".vue", ".css", ".scss"],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src')
		}
    },
	plugins: [
		new ExtractTextPlugin('./style.css'),
		new LiveReloadPlugin()
  	]
};