function Stack5() {
    let items = [];

    this.push = function (element) {
        items.push(element);
    }

    this.printarray =function () {
        for(n of items){
            console.log(n);
        }
    }

    this.pop =function () {
        return items.pop();
    }

    this.peek =function () {
        return items[items.length-1];
    }

    this.isEmpty=function () {
        return items.length==0;
    }

    this.size =function () {
        return items.length;
    }

    this.clear = function () {
        items = [];
    }

    this.print = function () {
        console.log(items.toString())
    }
}


class Stack6{
    constructor(){
        this.items = [];
    }
    //...方法
    push(element) {
        this.items.push(element);
    }
}

//symbol类

//使用weakmap  闭包的 stack类

let Stack_weak =(function () {
    const items = new WeakMap();
    class Stack_weak{
        constructor(){
            console.log(this);
            items.set(this,[])
        }

        push(element){
            let s = items.get(this);
            s.push(element);
        }

        print(){
            let s = items.get(this);
            console.log(s);
        }

    }
    return Stack_weak;
})()