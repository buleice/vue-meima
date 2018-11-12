<template>
<div class="slider" ref="slider">
  <div class="slider-group" ref="slidergroup">
    <slot>
    </slot>
  </div>
  <div class="dots">
    <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
  </div>
</div>
</template>

<script>
import 'whatwg-fetch'
import BScroll from 'better-scroll'
import {
  addClass
} from 'common/js/dom'

export default {
  name: 'carrousel',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },

  data() {
    return {
      dots: [],
      currentPageIndex: 0,
      refStatus: 0
    }
  },
  created() {
    // this.refStatus = 0;
  },

  mounted() {
    // 监听窗口大小改变时间
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })

    setTimeout(() => {
      if (this.refStatus == 1) {
        console.log("mounted执行")
        this._setSliderWidth();
        // 在初始化slider前初始化dot
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }
    }, 20)

  },
  updated() {
    if (this.refStatus == 0) {
      this._setSliderWidth();
      this._initDots(true)
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
      this.refStatus = 1;
    }
  },
  methods: {
    _setSliderWidth(sliderFlag) {
      this.children = this.$refs.slidergroup.children;
      let Totalwidth = 0;
      let screenWidth = this.$refs.slider.clientWidth;

      for (let i = 0; i < this.children.length; i++) {

        let child = this.children[i];
        //添加class
        addClass(child, 'slider-item');
        child.style.width = `${screenWidth}px`;
        Totalwidth += screenWidth;
      }
      if (this.loop && !sliderFlag) {
        Totalwidth += 2 * screenWidth;
      }
      this.$refs.slidergroup.style.width = `${Totalwidth}px`;
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop, // 开启循环播放
          // steem:100,
          // stepY: 100, // 每页高度为 100em
          threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
          speed: 4000 // 切换动画时长 400ms
        }
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play();
        }
      })
      // this.slider.on('beforeScrollStart', () => {
      //   if (this.autoPlay) {
      //     clearTimeout(this.timer)
      //   }
      // })
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      // currentPageIndex为不含首尾副本的索引，因此若有循环要+2
      // let nextPageIndex = this.currentPageIndex + 1;
      // if (this.loop) {
      //   nextPageIndex += 1;
      // }
      this.Timer = setTimeout(() => {
        this.slider.next()
        // this.slider.goToPage(nextPageIndex, 0, 400)
      }, this.interval)
    }
  },
  watch: {

  },
  components: {}
}
</script>

<style scoped lang="scss">
.slider {
    min-height: 0.1em;
    position: relative;
    height: 15em;
    .slider-group {
        position: relative;
        height: 100%;
        overflow: hidden;
        white-space: nowrap;
        .slider-item {
            float: left;
            height: 100%;
            box-sizing: border-box;
            text-align: center;
            list-style-type: none;
        }
    }
    .dots {
        position: absolute;
        right: 30px;
        left: 0px;
        bottom: 12px;
        text-align: right;
        // font-size: 0em;
        .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
            &.active {
                // width: 20px;
                border-radius: 5px;
                background: lightgray;
            }
        }
    }
}
</style>
