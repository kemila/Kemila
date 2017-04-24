<!DOCTYPE html>
<html lang="en">
<script type="text/javascript" src="jquery.js"></script>

<head>
	<meta charset="UTF-8">
	<title>ES6</title>
</head>

<body>

	<!-- ()=>  =function() promise demo1-->
<!--
	<script>
		console.log("demo1");
		const tasks = [];
		for (var i = 0; i < 5; i++) {
			((j) => {
				tasks.push(new Promise((resolve) => {
					setTimeout(() => {

						console.log(new Date, j);
						resolve();

					}, 1000 * j);
				}));

			})(i);
		}

		Promise.all(tasks).then(() => {

			setTimeout(() => {
				console.log(new Date, i)
			}, 1000)
		});
	</script>
-->

	<!--    demo2   无法运行 有问题-->

	<!--
	<script>
		console.log("demo2");
		const sleep = (time)=> new Promise((resolve)=>{
			setTimeout(resolve,time);
		});
		
		
		(async ()=>{
			for(var i=0;i<5;i++){
				await sleep(1000);
				console.log(new Date,i);
			
			}
		
		
		await sleep();
		console.log(new Date,i);
		
		})();
		
		
	
	</script>
-->

	<script>
		var array = [1, 2, 3];
		 //传统写法
		array.forEach(function (v, i, a) {
			console.log("v", v);
			console.log("i", i);
			console.log("a", a);
		});
		 //ES6
		array.forEach((v, i, a) => console.log(v, i, a));
	</script>


	<script>
		//产生一个随机数
		var num = Math.random();
		 //将这个数字输出到console
		console.log(`your num is ${num}`);
	</script>

	<script>
		function sayHello(name) {
			//传统的指定默认参数的方式
			var name = name || 'dude';
			console.log('Hello ' + name);
		}
		 //运用ES6的默认参数
		function sayHello2(name = 'dude') {
			console.log(`Hello ${name}`);
		}
		sayHello(); //输出：Hello dude
		sayHello('Wayou'); //输出：Hello Wayou
		sayHello2(); //输出：Hello dude
		sayHello2('Wayou'); //输出：Hello Wayou
	</script>
	<script>
		var people = ['Wayou', 'John', 'Sherlock'];
		 //sayHello函数本来接收三个单独的参数人妖，人二和人三
		function sayHello(people1, people2, people3) {
			console.log(`Hello ${people1},${people2},${people3}`);
		}
		 //但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
		sayHello(...people); //输出：Hello Wayou,John,Sherlock 

		 //而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
		sayHello.apply(null, people); //输出：Hello Wayou,John,Sherlock
	</script>

	<script>
		var someArray = ["a", "b", "c"];

		for (v of someArray) {
			console.log(v); //输出 a,b,c
		}

		for (index in someArray) {
			console.log(index); //输出 a,b,c
		}
	</script>
	<!--
	<script>
		//创建promise
		var promise = new Promise(function (resolve, reject) {
			// 进行一些异步或耗时操作
			if ( /*如果成功 */ ) {
				resolve("Stuff worked!");
			} else {
				reject(Error("It broke"));
			}
		});
		 //绑定处理程序
		promise.then(function (result) {
			//promise成功的话会执行这里
			console.log(result); // "Stuff worked!"
		}, function (err) {
			//promise失败会执行这里
			console.log(err); // Error: "It broke"
		});
	</script>
-->

	<script>
		function printHello(ready) {
			return new Promise(function (resolve, reject) {
				if (ready) {
					resolve("Hello");
				} else {
					reject("Good bye!");
				}
			});
		}

		function printWorld() {
			console.log("1111");
			setTimeout(function(){console.log("World");},5000);
			console.log("2222");
//			for(var i =0 ;i<3000000000;i++){
//			
//			}
		}

		function printExclamation() {
			console.log("3333");
			setTimeout(function(){console.log("!");},2000)
			console.log("4444");
		}

		printHello(true)
			.then(function (message) {
				console.log(message);
			})
			.then(printWorld)
			.then(printExclamation);
		

		
	</script>

</body>

</html>
