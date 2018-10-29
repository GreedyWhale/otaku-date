const dynamicRem = () => {
  // 获取html元素
  const rootNode = document.documentElement
  // 判断页面改变大小的事件类型
  const eventType = 'onorientationchange' in window ? 'orientationchange' : 'resize'
  // 设计稿宽度
  const designWidth = 375
  // 基准字体大小
  const baseFontsize = 100

  function setFontsize () {
    const clientWidth = window.screen.availWidth
    rootNode.style.fontSize = (clientWidth / designWidth) * baseFontsize + 'px'
  }

  window.addEventListener(eventType, setFontsize, false)
  document.addEventListener('DOMContentLoaded', setFontsize, false)
}

export default dynamicRem
