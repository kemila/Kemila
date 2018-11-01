"use strict";
exports.__esModule = true;
var action_1 = require("./action");
// 写法1  利用define.ts 中定义的 type ActionClass 直接限定cls是个函数 且函数中的属性也能访问
function regAction1(cls) {
    console.log('regAction1');
    console.log(cls);
    console.log(cls.Module + "." + cls.Action, cls.Process);
}
exports.regAction1 = regAction1;
// 写法2  直接引用aciton类  进行泛型约束 只能约束是 action的子类  直接指定cls是A的构造函数 但不能进行属性check TSLint会报错 JS可以运行
function regAction2(cls) {
    console.log('regAction2');
    console.log(cls);
    // console.log(`${cls.Module}.${cls.Action}`, cls.Process);
}
exports.regAction2 = regAction2;
regAction1(action_1.Action);
regAction2(action_1.Action);
