React문법 내부에서는 if문을 사용못하고 삼항연산자만 사용가능
따라서 render하는 부분을 따로 빼는 것이 편함
-> 함수로 따로 빼거나 새로운 component로 만들어주는 것이 좋다.
-> 이왕이면 component를 만들고 props를 넘기는 방식으로



react의 return내부에서 if같은거 쓸려면
{(() => {})}와 같이 함수의 형태로 작성한다.
이렇게 즉시 실행함수로 써야 됨
-> 코드가 지저분하니까 그냥 따로 함수로 빼거나 component쓰는게 낫다