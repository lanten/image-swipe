
# image-swipe
## 说明
- 这是一个移动端图片预览组件
- 不兼容 IE
- 原生无依赖,100行左右代码量,修改方便
只接受 `touch` 事件,在浏览器中调试需打开移动端调试工具

## 快速使用
> 你只需要引入 `./dist/image-swipe.js`

```html
<script src="./dist/image-swipe.js"></script>
<script>
  const imageList = ['http://i0.hdslb.com/bfs/drawyoo/083e1198c87ba40c94396a130df8a3793dd7a03d.png',
    'http://i0.hdslb.com/bfs/drawyoo/9aaa6884d3765077eeabf94ac27d8ad6fd942d13.png',
    'http://i0.hdslb.com/bfs/drawyoo/bcdbd1d7e8eced61974e87f2592e0ecf80f8fff1.png'
  ]

  imageSwipe.init(imageList, document.getElementById('content'), {
    contentStyle: {
      backgroundColor: '#444',
    },
    switchOffset: 2.5,
    animationTime: 650,
  })
</script>
```

## 禁用垂直滚动
```js
// 在你的 js 中加入此代码
document.querySelector('body').addEventListener('touchstart', function (ev) {
	ev.preventDefault();
});
```

## options
参数|说明|类型|默认值
---|---|---|---
background|容器背景颜色| string|'#444'
contentStyle|容器样式(类似react样式写法)|object|{}
imageStyle|图片元素样式| object|{}
switchOffset|场景切换的距离| number|2.5 (屏幕宽度 / 2.5)
animationTime|动画持续时间| number|800 (ms)
animationFun|动画函数| string|'cubic-bezier(0.175, 0.82, 0.265, 1)'