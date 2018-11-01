var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 泛型方法
function getMin(arr) {
    var min = arr[0];
    arr.forEach(function (value) {
        if (value < min) {
            min = value;
        }
    });
    return min;
}
console.log('function', getMin([1, 3, 5, 7, 8]));
console.log('function', getMin(["tom", "jerry", "jack", "sunny"]));
// 泛型类
var GetMin = /** @class */ (function () {
    function GetMin() {
        this.arr = [];
    }
    GetMin.prototype.add = function (ele) {
        this.arr.push(ele);
    };
    GetMin.prototype.min = function () {
        var min = this.arr[0];
        this.arr.forEach(function (value) {
            if (value < min) {
                min = value;
            }
        });
        return min;
    };
    return GetMin;
}());
var gm1 = new GetMin();
gm1.add(5);
gm1.add(3);
gm1.add(2);
gm1.add(9);
console.log('GetMin class', gm1.min());
var getData = function (value) {
    return value;
};
getData('张三');
getData(1243);
// 分四个层次  https://blog.csdn.net/u011127019/article/details/73848942
//泛型使用实例
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper() {
        this.hasMask = true;
    }
    return BeeKeeper;
}());
var ZooKeeper = /** @class */ (function () {
    function ZooKeeper() {
        this.nametag = "Zoo";
    }
    return ZooKeeper;
}());
var Animal = /** @class */ (function () {
    function Animal() {
        this.numLegs = 999;
    }
    return Animal;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keeper = new BeeKeeper();
        return _this;
    }
    return Bee;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keeper = new ZooKeeper();
        return _this;
    }
    return Lion;
}(Animal));
// 两种写法 {new(): A;}     new () => A   这边C是形参 随便叫什么都可以
function createInstance(C) {
    console.log('createInstance', C);
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
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // 正常
// getProperty(x, "m"); // 异常
// 在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如，
function create(c) {
    return new c();
}
