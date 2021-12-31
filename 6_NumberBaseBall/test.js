// Array.prototype.mymap = function(callback){
//     for (let index=0; index < this.length; index++){
//         callback(this[index], index, this);
//     }
// }

array1 = [1, 2, 3]

// array1.mymap((value) => {
//     console.log(value)
// })

const testFunc = (callback, arg1, arg2, arg3) => {
    callback(arg1, arg2, arg3)
}

testFunc(console.log, 1, 2)