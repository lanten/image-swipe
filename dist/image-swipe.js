(() => {

  class imageSwipeClass {

    // 初始化
    init(imgArr, el, options = {}) {
      this.options = options
      this.imgArr = imgArr
      this.content = el
      this.imageIndex = 0
      this.touchTime = 0

      const { background = '#444', contentStyle, imageStyle } = this.options
      this.contentStyle = {
        backgroundColor: background,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflowX: 'hidden'
      }

      this.imageStyle = {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        backgroundPosition: '50%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }

      contentStyle && Object.assign(this.contentStyle, contentStyle)
      imageStyle && Object.assign(this.imageStyle, imageStyle)

      this.renderImages()

      this.content.addEventListener('touchstart', this.touchEventStart.bind(this), false);
      this.content.addEventListener('touchmove', this.touchEventMove.bind(this), false);
      this.content.addEventListener('touchend', this.touchEventEnd.bind(this), false);
    }

    // 渲染图片
    renderImages() {
      this.contentWidth = content.offsetWidth
      this.contentHeight = content.offsetHeight
      this.imgContent = document.createElement('div')

      const { animationTime = 800, animationFun = 'cubic-bezier(0.175, 0.82, 0.265, 1)' } = this.options

      Object.assign(this.imgContent.style, {
        position: 'relative',
        height: '100%',
        transition: `all ${animationTime / 1000}s ${animationFun}`
      })
      this.imgArr.forEach((val, i) => {
        let left = this.contentWidth * i
        let imgItem = document.createElement('div')
        Object.assign(imgItem.style, Object.assign(this.imageStyle, {
          left: `${left}px`,
          backgroundImage: `url('${val}')`,
        }))
        this.imgContent.appendChild(imgItem)
      })
      this.content.appendChild(this.imgContent)

      Object.assign(this.content.style, this.contentStyle)
    }

    // 滑动开始事件
    touchEventStart(e) {
      const { pageX, pageY } = e.targetTouches[0]
      // console.log('start', pageX, pageY)
      this.startX = pageX
      this.startY = pageY
      this.touchInterval = setInterval(() => {
        this.touchTime++
      }, 1)
    }

    // 滑动时事件
    touchEventMove(e) {
      const { pageX, pageY } = e.targetTouches[0]
      const offSetX = pageX - this.startX + (~this.imgContent.offsetWidth * this.imageIndex)
      // console.log('Move', offSetX)
      this.imgContent.style.left = `${offSetX}px`

    }

    // 滑动结束事件
    touchEventEnd(e) {
      const { pageX, pageY } = e.changedTouches[0]
      const offSetXEnd = pageX - this.startX
      const isLeft = offSetXEnd >= 0 ? false : true
      const touchTime = this.touchTime
      let isChange = false
      clearInterval(this.touchInterval)
      this.touchTime = 0

      if (touchTime >= 10 && touchTime <= 100 && (offSetXEnd < 0 ? ~offSetXEnd : offSetXEnd >= 100)) {
        if (isLeft) {
          if (this.imageIndex < (this.imgArr.length - 1)) {
            this.imageIndex++
            isChange = true
          }
        } else {
          if (this.imageIndex > 0) {
            this.imageIndex--
            isChange = true
          }
        }
      } else {
        let switchOffset = this.contentWidth / (this.options.switchOffset || 2.5)
        if (isLeft) {
          if (~offSetXEnd >= switchOffset && this.imageIndex < (this.imgArr.length - 1)) {
            this.imageIndex++
            isChange = true
          }
        } else {
          if (offSetXEnd >= switchOffset && this.imageIndex > 1) {
            this.imageIndex--
            isChange = true
          }
        }
      }

      let toValue = `-${this.imageIndex * this.contentWidth}` - 0
      this.imgContent.style.left = toValue + 'px'
    }

  }

  window.imageSwipe = new imageSwipeClass()
})()