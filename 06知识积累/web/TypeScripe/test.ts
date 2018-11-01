// 泛型方法
function getMin<T>(arr: Array<T>) :T {
    let min=arr[0];
    arr.forEach((value)=>{
        if(value < min){
            min = value;
        }
    });
    return min;
}
console.log('function' , getMin([1, 3, 5, 7, 8]));
console.log('function' , getMin(["tom","jerry","jack","sunny"]));

// 泛型类
class GetMin<T> {
    arr:T[] = [];
    add(ele:T) {
        this.arr.push(ele);
    }
    min():T {
        var min = this.arr[0];
        this.arr.forEach((value) => {
            if (value < min) {
                min = value;
            }
        });
        return min;
    }
}
var gm1= new  GetMin<number>();
   gm1.add(5);
   gm1.add(3);
   gm1.add(2);
   gm1.add(9);
console.log('GetMin class' , gm1.min())

//泛型函数接口
interface ConfigFn {
    // 一个T类型的value
    <T>(value:T): T;
}
var getData:ConfigFn = function<T>(value:T):T {
    return value;
}
getData<string>('张三');
getData(1243); 


// 分四个层次  https://blog.csdn.net/u011127019/article/details/73848942


//泛型使用实例
class BeeKeeper {
    hasMask: boolean = true;
}
 
class ZooKeeper {
    nametag: string = "Zoo";
}
 
class Animal {
    numLegs: number = 999;
}
 
class Bee extends Animal {
    keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
    keeper: ZooKeeper= new ZooKeeper();
}
 
// 两种写法 {new(): A;}     new () => A   这边C是形参 随便叫什么都可以
function createInstance<A extends Animal>(C: new () => A): A {
    console.log('createInstance' , C);
    return new C();
}
console.log(new Lion());
console.log(new ZooKeeper());
console.log(createInstance(Lion).keeper.nametag);
console.log(createInstance(Bee).keeper.hasMask);

// --------------------- 
// 作者：天马3798 
// 来源：CSDN 
// 原文：https://blog.csdn.net/u011127019/article/details/73848942 
// 版权声明：本文为博主原创文章，转载请附上博文链接！





function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
 
let x = {a:1, b:2, c:3, d:4};
getProperty(x, "a"); // 正常
// getProperty(x, "m"); // 异常

// 在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如，

function create<T> (c: {new(): T;}): T {
    return new c();
}



// class BeeKeeper {
//     hasMask: boolean;
// }

// class ZooKeeper {
//     nametag: string;
// }

// class Animal {
//     numLegs: number;
// }

// class Bee extends Animal {
//     keeper: BeeKeeper;
// }

// class Lion extends Animal {
//     keeper: ZooKeeper;
// }

// function createInstance<A extends Animal>(c: new () => A): A {
//     return new c();
// }

// createInstance(Lion).keeper.nametag;  // typechecks! 只做了检查~~~~ 运行是报错的 因为内部没有实例化
// createInstance(Bee).keeper.hasMask;   // typechecks!
