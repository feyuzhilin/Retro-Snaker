(function(window) {
    "use strict";

    // 游戏对象： 把他理解成裁判（用来开始游戏，和结束游戏）
    // 游戏对象需要管理和这个游戏相关的所有对象（食物对象、蛇对象、地图元素）
    //  属性：
    //      1. 食物对象
    //      2. 蛇对象
    //      3. 地图元素

    //  方法：
    //      1. 开始游戏： startGame
    //      2. 结束游戏


    function Game(target) {
        this.food = new Food(); // 创建一个食物对象添加给游戏对象的实例的food属性
        this.snake = new Snake(); // 创建一个蛇对象添加给游戏对象的实例的snake属性

        this.map = target; // 把地图元素作为游戏对象的实例的map属性
    }


    // 专门用来渲染的方法
    Game.prototype.render = function() {
        this.snake.render(this.map); // 渲染蛇
        this.food.render(this.map); // 渲染食物
    }


    // 专门用来开始游戏的，让蛇跑起来
    Game.prototype.start = function() {
        // 把this的指向赋值给that；
        var that = this;

        // 开定时器，让蛇跑起来
        var timerId = setInterval(function() {
            // 定时器内的this指向是window
            // console.log(this);

            // 拿到蛇的move方法， 调用
            //  拿到食物对象传递到move方法内部
            that.snake.move(that.map, that.food);


            // 调用gameOver方法，获取游戏是否结束了
            var ret = that.gameOver();
            // console.log(ret);
            if(ret){
                alert("game Over");
                clearInterval(timerId);
            }
        }, 100)
    }

    // 专门用来做游戏结束的判断,不去处理游戏结束的逻辑
    Game.prototype.gameOver = function(){
        var isOver = false; // isOver是游戏结束的标识，默认是false，表示游戏没有结束

        var that = this;

        // 这里写蛇撞墙的逻辑
        // 获取到蛇头
        var newHead = that.snake.body[0]; // 这就是蛇头的坐标
        if (
            newHead.x < 0 || newHead.y < 0 ||
            newHead.x > that.map.offsetWidth / that.snake.width - 1 ||
            newHead.y > that.map.offsetHeight / that.snake.height - 1
        ) {
            isOver = true; // 这里表示游戏结束了，将isOver标识改为true
        }


        // 蛇吃到自己了
        // 判断条件： 蛇头的坐标和身体的每一节坐标比较是否重合了，需要遍历蛇的每一节身体
        // 注意点： i不能从0开始，需要从1开始
        // 优化的点： i 可以从4开始，少遍历几次
        for (var i = 4; i < that.snake.body.length; i++) {
            var item = that.snake.body[i]; // 蛇的每一节
            // console.log(item);

            if (newHead.x === item.x && newHead.y === item.y) {
                // 蛇头碰到自己了
                isOver = true;
            }
        }
        

        // 将游戏结束的标识返回出去
        return isOver;
    }


    // 专门用来添加事件监听的
    Game.prototype.bindEvent = function(){
        var that = this;

        document.addEventListener("keyup", function(e) {
            // 任何函数都有自己的this；
            // 事件处理函数，this指向了事件源
            // console.log(this);

            // console.log(e.keyCode);

            switch (e.keyCode) {
                case 37: // 左
                    // 当蛇移动的方向为右的时候，就不能指向下面按键的操作
                    // 蛇的方向不能和键盘按键方向相反，相反就禁止操作
                    if (that.snake.direction === "right") {
                        return;
                    }
                    that.snake.direction = "left";
                    break;
                case 38: // 上
                    if (that.snake.direction === "down") {
                        return;
                    }
                    that.snake.direction = "up";
                    break;
                case 39: // 右
                    if (that.snake.direction === "left") {
                        return;
                    }
                    that.snake.direction = "right";
                    break;
                case 40: // 下
                    if (that.snake.direction === "up") {
                        return;
                    }
                    that.snake.direction = "down";
                    break;
            };
        })
    }


    // 给Game的原型添加 startGame ，游戏开始的方法
    Game.prototype.startGame = function() {
        // this.render();

        this.start();

        this.bindEvent();
    }


    window.Game = Game;
})(window)
