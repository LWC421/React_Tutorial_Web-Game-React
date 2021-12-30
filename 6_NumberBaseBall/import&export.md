ES Module에서는

export const object = () => {

}

이렇게 선언할 경우 import {object} from "./FileName"



export default object = () => {

}
이렇게 선언할 경우 import Ojbect from "./fileName"
으로 가능하다,
하지만 default의 경우 한 파일당 하나만 가능


----------------------

노드 모듈 시스템 -> Common.js
exports.object = 'object';

const Object = require('object')
이렇게 import한다

----------------------

그런데 Babel이 require를 import로 바꿔주는 역할을 한다.
그래서 React에서는 import - export(또는 export default)를 사용하면 적절하다.

그런데 webpack은 node가 처리하므로 const - require를 해야한다.
