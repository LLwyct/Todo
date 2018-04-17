const path = require('path');

module.exports = {
    // 入口文件，我们假设是单入口
    entry: {
        main: './src/index.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        // 当你import奇怪的后缀的时候webpack是看不懂的，他只认识js，所以需要一些奇怪的loader（加载器）
        // 而且这些加载器要安装，详情见底下
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.less$/, use: 'less-loader' },
            { test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/, use: 'url-loader' },
        ]
    },
    devServer: {},
    plugins: [],
}