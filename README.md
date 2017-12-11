
# image-swipe

## 说明
- 这是一个移动端图片预览组件
- 不兼容 IE
- 原生无依赖,不超过`200`行代码,修改方便
- 只接受 `touch` 事件,在浏览器中调试需打开移动端调试工具

## 快速使用
> 你只需要引入 `https://lanten.github.io/image-swipe/dist/image-swipe.js`  
> 你也可以从 [image-swipe.js](./dist/image-swipe.js) 中复制 类 `imageSwipeClass` 到你的 js 文件中

```html
<script src="https://lanten.github.io/image-swipe/dist/image-swipe.js"></script>
<script>
  const imageList = [
    './images/1.png',
    './images/2.png',
    './images/3.png',
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
document.addEventListener('touchmove', function(e){e.preventDefault()}, false)
```

## options
参数|说明|类型|默认值
---|---|---|---
background|容器背景颜色| string|'#444'
contentStyle|容器样式(类似react样式写法)|object|{}
imageStyle|图片元素样式| object|{}
switchOffset|场景切换的距离| number|2.5 (屏幕宽度 / 2.5)
animationTime|动画持续时间| number|800 (ms)
animationFun|动画函数| string|'cubic-bezier(0.175, 0.82, 0.265, 1)'
controller|是否显示指示器| Boolean|true
controllerStyle|指示器容器样式| object|{}
controllerItemStyle|指示器样式| object|{}
imageItemClick|图片点击事件| function 返回(imageUrl,imageIndex) | null