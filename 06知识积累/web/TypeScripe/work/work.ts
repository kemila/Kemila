import { Action } from './action';
import { ActionClass } from './define';
// 写法1  利用define.ts 中定义的 type ActionClass 直接限定cls是个函数 且函数中的属性也能访问
//new标识这个对象，可同过new关键字实例化，也就是说这是个类
function regAction1(cls: ActionClass) {
    console.log('regAction1');
    console.log(cls);
    console.log(`${cls.Module}.${cls.Action}`, cls.Process);
}


// 写法2  直接引用aciton类  进行泛型约束 只能约束是 action的子类  直接指定cls是A的构造函数 但不能进行属性check 和访问
// 不能访问属性 不好!!!!
function regAction2<A extends Action>(cls: new () => A) {
    console.log('regAction2');
    console.log(cls);
    let a  = new cls();
    console.log(a);
    // console.log(`${cls.Module}.${cls.Action}`, cls.Process);
}

regAction1(Action);
regAction2(Action);