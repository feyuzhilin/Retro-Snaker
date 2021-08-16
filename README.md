# 贪吃蛇

## html结构

```html
<div id="map"></div>
```

样式

```css
#map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background-color: #ccc;
  position: relative;
}
```

## 食物对象

- Food
  - 属性
    - 宽度 width
    - 高度 height
    - 背景色 bgColor
    - 横坐标  x
    - 纵坐标  y
  - 方法
    - render  需要将食物渲染到地图上
- Food的构造函数

```javascript
//所有的参数都放到options这个对象中
function Food(options){
  options = options || {};
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.bgColor = options.bgColor || "blue";
  this.x = options.x || 0;
  this.y = options.y || 0;
}
```

- 给Food.prototype添加了render方法

```javascript
//target: 将来创建出来的食物需要添加到谁身上。
Food.prototype.render = function (target) {
  //1. 创建一个div出来
  var div = document.createElement("div");
  //2. 把div添加到target
  target.appendChild(div);

  //3. 设置div的一些样式  width height 背景色  left top
  div.style.width = this.width + "px";
  div.style.height = this.height + "px";
  div.style.backgroundColor = this.bgColor;
  
  //4. 设置div的left值与top
  //this.x 会是 [0 - 800/20)  之间的随机数
  this.x = parseInt(Math.random() * target.offsetWidth/this.width);
  this.y = parseInt(Math.random() * target.offsetHeight/this.height);
  div.style.left = this.x * this.width + "px";
  div.style.top = this.y * this.height + "px";
  div.style.position = "absolute";
}
```

食物对象：单独的js



## 蛇对象

- Snake（蛇是由多个小方格组成）
  - 属性
    - width  蛇的小方格的宽度 默认值：20
    - height 蛇的小方格的高度 默认值 20
    - headColor:  蛇头颜色
    - bodyColor: 身体颜色
  - 方法
    - render  把蛇渲染到地图上
    - move    蛇要会动



- 创建Snake构造函数

```javascript
function Snake(options){
  options = options || {};
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.headColor = options.headColor || "green";
  this.bodyColor = options.bodyColor || "red";

  //蛇的核心：组成蛇的一个一个小方块,  默认蛇由三个小方块组成
  this.body = [
    {x:2, y:0},
    {x:1, y:0},
    {x:0, y:0}
  ];
}
```

+ 蛇的渲染方法

```javascript
Snake.prototype.render = function (target) {
    //思路：遍历数组，根据每一个对象创建一个div，添加到target中
    for (var i = 0; i < this.body.length; i++) {
        var span = document.createElement("span");
        span.style.width = this.width + "px";
        span.style.height = this.height + "px";
        span.style.backgroundColor = i == 0 ? this.headColor : this.bodyColor;
        span.style.position = "absolute";
        span.style.left = this.body[i].x * this.width + "px";
        span.style.top = this.body[i].y * this.height + "px";
        target.appendChild(span);
    }
}
```

+ 蛇的move方法

```javascript
Snake.prototype.move = function (target) {
  //添加蛇头，删除蛇尾
  var newNode = {
    x:this.body[0].x,
    y:this.body[0].y
  };
  this.body.unshift(newNode);
  this.body.pop();

  //控制蛇头移动
  switch (this.direction) {
    case "left":
      newNode.x--;
      break;
    case "right":
      newNode.x++;
      break;
    case "up":
      newNode.y--;
      break;
    case "down":
      newNode.y++;
      break;
  }

  // 渲染之前，删除之前所有的内容
  var spans = target.querySelectorAll("span");
  for(var i = 0; i < spans.length; i++) {
    target.removeChild(spans[i]);
  }
  //重新渲染
  this.render(target);
}
```

## 游戏对象

游戏对象的作用：

+ 控制游戏的开始和结束
+ 蛇和食物对象都是属于游戏对象的。

游戏对象

+ 属性
  + food：食物对象
  + snake: 蛇对象
  + map: 地图对象
+ 方法
  + start() ： 开始游戏

蛇的构造函数

```javascript
function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }
```

开始游戏

```javascript
Game.prototype.start = function () {
    this.food.render(this.map);
    this.snake.render(this.map);

    var that = this;

    setInterval(function () {
        that.snake.move(that.map);
    }, 300);

    //给document注册keyup事件
    document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
            case 37:
                that.snake.direction = "left";
                break;
            case 38:
                that.snake.direction = "up";
                break;
            case 39:
                that.snake.direction = "right";
                break;
            case 40:
                that.snake.direction = "down";
                break;
        }
    });
};
```

## 蛇吃食物

吃食物是属于蛇的方法，应该放到snake.js中的move方法里面



## 蛇撞墙的逻辑

```javascript
//蛇撞墙的逻辑
var head = that.snake.body[0];
if (head.x < 0 || head.x > that.map.offsetWidth / that.snake.width ||
    head.y < 0 || head.y > that.map.offsetHeight / that.snake.height) {
    return true;
}
```

## 撞身体的逻辑

```javascript
 //蛇撞身体的逻辑
for (var i = 4; i < that.snake.body.length; i++) {
    if (head.x == that.snake.body[i].x && head.y == that.snake.body[i].y) {
        return true;
    }
}
```

