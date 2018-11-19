(function(window) {
    "use strict";


    // 分析食物对象
    //  属性
    //     1. width:   食物的宽度
    //     2. height:  食物的高度
    //     3. bgc:     食物的背景颜色
    //     4. x:       食物的水平坐标
    //     5. y：      食物的垂直坐标
    //  方法
    //      render（渲染）: 使用方法将食物渲染添加到地图上
    //          1. 创建一个div元素来表示食物
    //          2. 给div设置样式（来源于食物对象的属性）
    //          3. 将div添加到地图上


    var num = 10;

    function sum() {

    }

    // 改写上面传参的方式
    function Food(options) {
        // options： 形参
        options = options || {}; // 给options设置默认值为空对象；目的是为了防止下面代码报错
        // console.log(options);

        this.width = options.width || 20; // 给width属性设置默认值20
        this.height = options.height || 20;
        this.bgc = options.bgc || "green";
        this.x = options.x || 0;
        this.y = options.y || 0;


        // // 这是给所有实例对象添加的
        // // 造成内存浪费的问题
        // this.render = function(){

        // }
    }


    // 给原型添加render方法
    // 好处：
    //  1. 不会造成内存浪费问题
    //  2. 所有的实例对象都可以访问到
    // target 形参： 表示地图元素
    Food.prototype.render = function(target) {

        // 1. 创建一个div元素来表示食物
        // 2. 给div设置样式（来源于食物对象的属性）
        // 3. 将div添加到地图上

        // 1. 食物
        var div = document.createElement("div");

        // 2.
        // this 的指向： 谁调用了这个方法，this就指向谁
        // redner是被实例对象f调用了， this就指向了f
        // console.log(1, this);

        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.bgc;

        // 随机食物的位置（设置left、top属性）
        // 可以根据食物的x，y坐标去计算出来食物的位置
        // 现在是随机食物的位置，也就是随机食物的x，y坐标
        // 随机食物的x，y坐标的范围是 0-39
        // 39 如何来的： 地图的宽度 /  食物的宽度 - 1

        // 随机食物的x坐标
        // Math.random()   ==>   [0, 1)
        // 这里不需要减1了；
        this.x = parseInt(Math.random() * target.offsetWidth / this.width); // ==> [0, 40)
        this.y = parseInt(Math.random() * target.offsetHeight / this.height);
        // console.log(this.x , this.y);

        // 可以根据上面随机出来的坐标去计算食物的位置: 食物的坐标 * 食物的宽度
        // 注意点： 别忘记加上定位， 否则添加left、top会无效
        div.style.position = "absolute";
        div.style.left = this.x * this.width + "px";
        div.style.top = this.y * this.height + "px";

        // 3.
        target.appendChild(div);
    }


    // 将构造函数Food暴露到全局
    window.Food = Food;
})(window)
