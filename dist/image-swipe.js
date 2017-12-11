(() => {
  class imageSwipeClass {
    // 初始化
    init(imgArr, el, options = {}) {
      this.options = options
      this.imgArr = imgArr
      this.content = el
      this.imageIndex = 0
      this.touchTime = 0

      const {
        background = '#444',
        contentStyle,
        imageStyle,
        controllerStyle,
        animationTime = 800,
        animationFun = 'cubic-bezier(0.175, 0.82, 0.265, 1)'
       } = this.options

      this.animation = `all ${animationTime / 1000}s ${animationFun}`

      this.contentStyle = Object.assign({
        backgroundColor: background,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflowX: 'hidden'
      }, contentStyle)

      this.imageStyle = Object.assign({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        backgroundPosition: '50%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }, imageStyle)

      this.controllerStyle = Object.assign({
        position: 'absolute',
        bottom: '88px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }, controllerStyle)

      this.renderImages()
      this.content.addEventListener('touchstart', this.touchEventStart.bind(this), false)
      this.content.addEventListener('touchmove', this.touchEventMove.bind(this), false)
      this.content.addEventListener('touchend', this.touchEventEnd.bind(this), false)
    }

    // 渲染图片
    renderImages() {
      const { controller = true, controllerItemStyle = {}, imageItemClick } = this.options
      this.contentWidth = content.offsetWidth
      this.contentHeight = content.offsetHeight
      this.imgContent = document.createElement('div')
      this.controllerContent = document.createElement('div')
      Object.assign(this.imgContent.style, {
        position: 'relative',
        height: '100%',
        zIndex: 20,
      })
      Object.assign(this.controllerContent.style, this.controllerStyle)
      this.imgArr.forEach((val, i) => {
        let left = this.contentWidth * i
        let imgItem = document.createElement('div')
        Object.assign(imgItem.style, Object.assign(this.imageStyle, {
          display: 'block',
          left: `${left}px`,
          backgroundImage: `url('${val}')`,
        }))

        if (imageItemClick) imgItem.onclick = () => imageItemClick(val, i)
        this.imgContent.appendChild(imgItem)

        if (controller) {
          let controllerItem = document.createElement('span')
          Object.assign(controllerItem.style, Object.assign({
            border: '1px solid rgba(255,255,255,0.75)',
            backgroundColor: 'rgba(255,255,255,0.45)',
            borderRadius: '90px',
            cursor: 'pointer',
            width: '24px',
            height: '24px',
            margin: '0 10px',
            boxShadow: '1px 1px 2px 2px rgba(0,0,0,0.15)',
            transition: this.animation
          }, controllerItemStyle))
          this.controllerContent.appendChild(controllerItem)
        }
      })
      this.content.appendChild(this.imgContent)
      if (controller) this.controllerContent.children[0].style.backgroundColor = 'rgba(255,255,255,1)'
      if (controller) this.content.appendChild(this.controllerContent)
      Object.assign(this.content.style, this.contentStyle)
    }

    // 滑动开始事件
    touchEventStart(e) {
      const { clientX } = e.changedTouches[0]
      this.startX = clientX
      if (!this.touchInterval) this.touchInterval = setInterval(() => {
        this.touchTime++
      }, 1)
    }

    // 滑动时事件
    touchEventMove(e) {
      console.log(e)
      const { clientX } = e.changedTouches[0]
      const offSetX = clientX - this.startX + (~this.imgContent.offsetWidth * this.imageIndex)
      if (this.imgContent.style.transition != 'null') this.imgContent.style.transition = 'none'
      this.imgContent.style.left = `${offSetX}px`
      if (this.imageIndex >= 0) this.controllerContent.children[this.imageIndex].style.backgroundColor = `rgba(255,255,255,0.45)`
    }

    // 滑动结束事件
    touchEventEnd(e) {
      const { clientX } = e.changedTouches[0]
      const offSetXEnd = clientX - this.startX
      const isLeft = offSetXEnd >= 0 ? false : true
      const touchTime = this.touchTime
      let isChange = false
      clearInterval(this.touchInterval)
      delete this.touchInterval
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
      this.imgContent.style.transition = this.animation
      this.imgContent.style.left = toValue + 'px'
      for (let i = 0; i < this.controllerContent.children.length; i++) {
        const el = this.controllerContent.children[i];
        let bg = (i == this.imageIndex ? 1 : 0.45)
        el.style.backgroundColor = `rgba(255,255,255,${bg})`
      }
    }
  }

  window.imageSwipe = new imageSwipeClass()
})()