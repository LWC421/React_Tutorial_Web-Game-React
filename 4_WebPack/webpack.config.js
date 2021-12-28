const path = require('path')

module.exports = {
    name: 'WordRelay-setting',
    mode: 'development', //실제 서비스시에는 production으로 설정
    devtool: 'eval',
    
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry:{
        // app: ['./client.jsx', './WordRelay.jsx'],
        app: ['./client']
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?/,  //js와 jsx파일에 적용하겠다, 정규표현식임
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }]
    },

    plugins:[], //추가적으로 필요한 module들 정의

    output:{
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    } //출력
};