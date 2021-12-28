수많은 JS파일들을 webpack을 이용해서 하나로 만들어 준다

npm init
npm install react react-dom
npm install -D webpack webpack-cli
-> D는 Development용이라는 뜻이므로 개발시에만 필요하므로 D옵션을 넣은 것

그 후 
`webpack.config.js`파일을 생성

.js확장자와 .jsx확장자는 크게 차이가 없다
하지만 확장자를 jsx로 표기하므로써 react파일인것이라는 것을 알 수 있게 됨.

근데 html에서는 파일 하나로 인식을 할 수 있음
-> 그래서 webpack이 필요함
-> webpack.config.js에서 정의

webpack.config.js에서 정의 할 시
name
mode
devtool
정의 한 후
entry와 output을 정의해야 하는데

entry에서는 output을 만들기 위해 필요한 파일들(jsx, css, json)을 적고
output에서는 최종적으로 만들어져야 할 파일의 이름과 경로를 적는다.

entry작성시에는 jsx간에 require를 따져서 의존성을 파악하므로
여러개의 파일을 작성할 필요 없이 하나의 파일의 이름만 작성하여도 의존된 다른 파일또한 자동으로
entry에 들어가게 된다.

또 한 resolve옵션을 사용하여서 파일이름 작성 시 따로 확장자를 작성하지 않아도 
파일을 찾을 수 있게 해줄 수 있다.

webpack.config.js 작성을 완료 하였으면
bash에서 `webpack` 명령어를 사용하여서 실행
webpack을 실행하기 위해서는
npx webpack을 사용해서 실행하면 됨

webpack설정 내용에 babel관련 설정을 해줘야됨
따라서 
npm install -D @babel/core
npm install -D @babel/preset-env
npm install -D @babel/preset-react
npm install -D babel-loader
로 babel관련 설치 후 webpack.config.js에 설정

module: {
        rules: [{
            test: /\.jsx?/,  //js와 jsx파일에 적용하겠다, 정규표현식임
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }]
},

과 같이 적용할 방법들을 표기

presets: [
    ["@babel/preset-env"],{
        targets: {
            browsers: ["last 2 chrome versions"]
        }
    }
]

위와 같이 preset에 대한 설정을 적용할 수 있다
-> presets:[[], {}]
위의 예시에서는 preset-env를 target을 지정함으로써 browsers를 지정하여
지원하는 브라우저를 직접 지정할 수 있다.

상세한 옵션들은
`https://github.com/browserslist/browserslist`
를 참고하자

2_gugudan의 webpack.config.js 참고해보자