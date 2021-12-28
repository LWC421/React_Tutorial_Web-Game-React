개발할 때 변경점이 존재할때마다 webpack을 실행해서 다시 컴파일 하기에는 귀찮다
따라서 hot-reload를 사용하자

npm install -D react-refresh @pmmmwh/react-refresh-webpack-plugin
으로 reload 모듈 설치

npm install -D webpack-dev-server
로 서버 설치


그리고 package.json에서 
scripts부분의
"scripts": {
    "dev": "webpack"
}
이였던 것을
"scripts":{
    "dev": "webpack serve --env development"
}
로 변경 -> 서버의 형태로 실행됨



webpack.config.js에서는
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
으로 react-refresh-webpack-plugin을 받아온다.
그리고 나서 이 것을
plugins: [
    new RefreshWebpackPlugin()
],
으로 적용해준다

또 한

babel-loader에 플러그인을 적용하기 위하여
'react-refresh/babel'을 적용

module: {
    rules: [{
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
            presets: [
                ['@babel/preset-env',{
                    targets: {
                        browsers: ['> 1% in KR'],
                    },
                    debug: true,
                }], 
                '@babel/preset-react',
            ],
            plugins:[
                '@babel/plugin-proposal-class-properties',
                'react-refresh/babel',
            ]
        }
    }]
},



devServer: {
    devMiddleware: {publicPath: '/dist/'},
    static: {directory: path.resolve(__dirname)},
    hot: true
}

이렇게 해줌으로써 server로 연다
devMiddleware에서는 webpack으로부터 빌드되는 파일의 위치를 적어준다.
static에는 index.html과 같이 정적파일이 존재하는 곳의 path를 적어준다