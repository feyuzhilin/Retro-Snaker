(function(window) {
    "use strict";

    // 分析蛇对象
    // 属性：
    //  1. width:  蛇一节的宽度
    //  2. height: 蛇一节的高度
    //  3. headBgc： 蛇头的背景颜色
    //  4. bodyBgc： 蛇身体的背景颜色
    //  5. body:     蛇的每一节坐标信息
    // [
    //    {x: 2, y: 0},   // 这个对象表示的是蛇头的坐标信息
    //    {x: 1, y: 0},   // 蛇中间一节的坐标信息
    //    {x: 0, y: 0}    // 蛇尾的坐标信息
    // ]

    // 方法： 
    //      render方法： 根据蛇对象的属性创建蛇元素（span）,添加到地图上
    //      move方法： 想要蛇动，需要修改body的坐标信息
    //          1. 需要修改的蛇的每一节坐标信息，需要进行遍历蛇的每一节，这种方式性能稍低（因为需要遍历到每一节，当节数比较多的时候，性能差）
    //          2. 赋值原来的蛇头，得到一个新的蛇头，根据蛇的移动方向去改变新蛇头的坐标信息，删除蛇尾

    // 创建一个蛇对象
    function Snake(options) {
        options = options || {};

        this.width = options.width || 20;
        this.height = options.height || 20;
        this.headBgc = options.headBgc || "green";
        this.bodyBgc = options.bodyBgc || "pink";

        // 给蛇对象添加蛇的移动方向
        this.direction = options.direction || "right";

        // 蛇的每一节坐标信息， 默认值三节
        this.body = options.body || [
            { x: 13, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 12, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 11, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 10, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 9, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 8, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 7, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 6, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 5, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 4, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 3, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 2, y: 0 }, // 这个对象表示的是蛇头的坐标信息
            { x: 1, y: 0 }, // 蛇中间一节的坐标信息
            { x: 0, y: 0 } // 蛇尾的坐标信息
        ]
    }


    // target形参表示的是地图元素
    Snake.prototype.render = function(target) {
        // 1. 根据body属性来创建蛇元素（span） -- 需要遍历
        // 2. 给span设置样式
        // 3. 将span添加到地图上

        // 1.
        // this ==> 实例对象s
        for (var i = 0; i < this.body.length; i++) {
            var item = this.body[i]; // 这是每一节的坐标信息  ==> 是个对象
            // console.log(item);

            var span = document.createElement("span");
            span.style.width = this.width + "px";
            span.style.height = this.height + "px";

            span.innerHTML = i;

            // 三元简化
            span.style.backgroundColor = i === 0 ? this.headBgc : this.bodyBgc;

            // 设置蛇每一节的位置： 根据蛇的每一节坐标去计算蛇的每一节的位置
            span.style.position = "absolute";
            span.style.left = item.x * this.width + "px";
            span.style.top = item.y * this.height + "px";

            // 3.
            target.appendChild(span);
        }
    }


    // 往原型上添加蛇移动的方法move
    // target:形参表示的是地图元素
    // food: 形参表示的是食物对象，对象上有当前食物的坐标，用来和蛇头做判断，是否有吃到食物
    Snake.prototype.move = function(target, food) {
        // console.log(food);

        // 新蛇头坐标
        var newHead = {
            x: this.body[0].x, // 蛇头的x坐标
            y: this.body[0].y // 蛇头的y坐标
        }

        // 2. 
        switch (this.direction) {
            case "up": // 上
                newHead.y--;
                break;
            case "down": //下
                newHead.y++;
                break;
            case "left": //左
                newHead.x--;
                break;
            case "right": //右
                newHead.x++;
                break;
        };



        // 蛇吃食物代码逻辑
        // 此时的newHead是最新的坐标（根据方向去修改）
        // 判断条件： 蛇头的坐标和食物的坐标是否重合了（x,y坐标相等了）
        if (newHead.x === food.x && newHead.y === food.y) {
            // 说明蛇头吃到食物了，找到地图上的食物元素，移除掉
            // console.log("说明蛇头吃到食物了");

            // 1. 
            // 不能从document上去找食物元素，这样找到的是地图元素
            // var div = document.querySelector("div");

            var div = target.querySelector("div"); // 才是食物元素
            // 2. 从地图上移除掉
            target.removeChild(div);

            // 在食物元素删除之后，在重新渲染一份食物元素添加到地图上，就是食物元素的render方法
            // 注意传参
            food.render(target);
        } else {

            // 蛇没有吃到食物
            // 4.
            //  删除蛇尾是有条件的：删除蛇尾是在蛇没有吃到食物的时候删除掉蛇尾
            this.body.pop();
        }


        // 3.
        this.body.unshift(newHead);


        // 以上操纵都是在操作body数据层，页面上是没有变化的，还需要重新去渲染(render)蛇到地图上

        // 在每次渲染之前，需要将地图上已经存在的span（蛇的每一节）给移除掉
        // 删除之后在重新去渲染

        // 1. 找到地图上所有的蛇（span）
        // 2. 一个一个的去删除掉
        var spans = target.querySelectorAll("span"); // 这个事地图上所有表示蛇的span元素
        for (var i = 0; i < spans.length; i++) {
            target.removeChild(spans[i])
        }

        // 删除之后再去重新渲染
        this.render(target);
        // console.log(this.body);
    }

    
    window.Snake = Snake;
})(window)
