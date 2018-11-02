var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  装饰器
// 声明一个装饰器，第三个参数是 "成员的属性描述符"，如果代码输出目标版本(target)小于 ES5 返回值会被忽略。
var validate = function (target, propertyKey, descriptor) {
    // 保存原来的方法
    var method = descriptor.value;
    // 重写原来的方法
    descriptor.value = function (newValue) {
        // 检查是否是空字符串
        if (!newValue) {
            throw Error('name is invalid');
        }
        else {
            // 否则调用原来的方法
            method();
        }
    };
};
var User = /** @class */ (function () {
    function User(name, id) {
        this.name = name;
        this.id = id;
    }
    // 调用装饰器
    User.prototype.changeName = function (newName) {
        this.name = newName;
    };
    __decorate([
        validate
    ], User.prototype, "changeName");
    return User;
}());
