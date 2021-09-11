<template>
  <div class="home">
    <img
      class="screenshot"
      :src="screenshot"
      :style="screenshotStyle"
      @mousedown="handleMouseEvent"
      @mousemove="handleMouseEvent"
      @mouseup="handleMouseEvent"
      @click="handleMouseEvent"
      @dblclick="handleMouseEvent"
    />
  </div>
</template>

<script>
import socket from '../../utils/socket'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      msg: '',
      screenshot: '',
      screenshotStyle: '',
    }
  },
  computed: {
    skt() {
      return socket()
    },
  },
  created() {
    this.loading()
  },
  methods: {
    loading() {
      window.onkeypress =
        window.onkeyup =
        window.onkeydown =
          this.handleKeyboardEvent()
      const skt = this.skt
      skt.on('src', (src) => {
        const blob = new Blob([src], {
          type: 'image/png',
        }) // 传入一个合适的 MIME 类型
        const url = URL.createObjectURL(blob)
        this.screenshot = url
      })
      skt.on('screensize', (screensize) => {
        this.screenshotStyle = {
          width: screensize.width + 'px',
          height: screensize.height + 'px',
        }
      })
    },
    handleKeyboardEvent(e) {
      if (!e) return
      this.skt &&
        this.skt.emit('userevent', {
          type: 'keyboard',
          event: {
            type: e.type,
            keyName: e.key,
            keyCode: e.keyCode,
          },
        })
    },
    handleMouseEvent(e) {
      this.skt &&
        this.skt.emit('userevent', {
          type: 'mouse',
          event: {
            type: e.type,
            buttonType: e.buttons === 2 ? 'right' : 'left',
            x: e.offsetX,
            y: e.offsetY,
          },
        })
    },
  },
}
</script>
<style scoped>
.screenshot {
  width: 100%;
  height: 100%;
}
</style>
