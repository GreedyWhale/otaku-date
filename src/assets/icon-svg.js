(function (window) {
  let svgSprite = '<svg><symbol id="i-loading" viewBox="0 0 1024 1024"><path d="M923.851581 338.007247c-20.012799-47.313585-47.717791-90.324168-82.448804-128.128169 6.875594-13.544481 10.753925-28.866445 10.753925-45.096081 0-55.099922-44.667316-99.767238-99.767238-99.767238-29.051663 0-55.19816 12.420891-73.431429 32.237215-53.058426-21.390169-109.183701-32.237215-166.958546-32.237215-60.334133 0-118.873388 11.821233-173.98866 35.134195-53.232388 22.51376-101.031021 54.741765-142.073786 95.78453-41.045835 41.043788-73.272817 88.844467-95.785553 142.073786C76.837504 393.126612 65.014224 451.665867 65.014224 512.001023c0 60.33311 11.82328 118.873388 35.134195 173.989683 22.51376 53.230342 54.741765 101.029998 95.785553 142.073786 41.041742 41.043788 88.841398 73.27077 142.073786 95.785553 55.116295 23.311939 113.65555 35.134195 173.989683 35.134195s118.873388-11.822257 173.992753-35.134195c53.229319-22.514783 101.029998-54.742788 142.072763-95.785553 41.045835-41.043788 73.272817-88.843444 95.785553-142.073786 23.309892-55.116295 35.134195-113.656573 35.134195-173.989683C958.985776 451.665867 947.161473 393.127635 923.851581 338.007247zM887.891578 670.783353c-20.545942 48.575322-49.960879 92.203982-87.430258 129.676431-37.473473 37.470403-81.100086 66.88841-129.679501 87.432305-50.28015 21.263279-103.702873 32.047904-158.783353 32.047904-55.07741 0-108.500133-10.782577-158.785399-32.047904-48.575322-20.545942-92.203982-49.961902-129.676431-87.432305-37.47245-37.47245-66.88841-81.101109-87.430258-129.676431-21.267373-50.28015-32.050973-103.703897-32.050973-158.784376s10.783601-108.503203 32.050973-158.783353c20.541849-48.575322 49.958832-92.206028 87.430258-129.676431 37.47245-37.470403 81.101109-66.887386 129.676431-87.433328 50.285267-21.266349 103.70799-32.04995 158.785399-32.04995 50.600445 0 99.797937 9.107425 146.447397 27.074635-3.767813 10.514471-5.824659 21.842471-5.824659 33.653471 0 55.099922 44.667316 99.767238 99.767238 99.767238 24.573675 0 47.065945-8.889461 64.452941-23.620977 29.737278 33.372062 53.603849 71.037916 71.050196 112.285343 21.266349 50.28015 32.04995 103.702873 32.04995 158.783353S909.15895 620.503203 887.891578 670.783353z"  ></path></symbol><symbol id="i-left" viewBox="0 0 1024 1024"><path d="M700.509091 151.272727c9.309091-9.309091 9.309091-23.272727 0-32.581818s-23.272727-9.309091-32.581818 0L351.418182 437.527273c-44.218182 44.218182-46.545455 118.690909-2.327273 162.909091l304.872727 304.872727c4.654545 4.654545 11.636364 6.981818 16.290909 6.981818s11.636364-2.327273 16.29091-6.981818c9.309091-9.309091 9.309091-23.272727 0-32.581818L381.672727 565.527273c-25.6-25.6-25.6-69.818182 2.327273-95.418182L700.509091 151.272727z" fill="" ></path></symbol><symbol id="i-right" viewBox="0 0 1024 1024"><path d="M672.581818 437.527273L356.072727 118.690909c-9.309091-9.309091-23.272727-9.309091-32.581818 0s-9.309091 23.272727 0 32.581818l318.836364 318.836364c27.927273 27.927273 27.927273 69.818182 2.327272 95.418182L337.454545 872.727273c-9.309091 9.309091-9.309091 23.272727 0 32.581818 4.654545 4.654545 11.636364 6.981818 16.29091 6.981818s11.636364-2.327273 16.290909-6.981818L674.909091 600.436364c44.218182-44.218182 44.218182-118.690909-2.327273-162.909091z" fill="" ></path></symbol></svg>'
  let script = (function () {
    let scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }())
  let shouldInjectCss = script.getAttribute('data-injectcss')
  let ready = function (fn) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        let loadFn = function () {
          document.removeEventListener('DOMContentLoaded', loadFn, false)
          fn()
        }
        document.addEventListener('DOMContentLoaded', loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded (w, fn) {
      let d = w.document
      let done = false
      let init = function () {
        if (!done) {
          done = true
          fn()
        }
      }
      let polling = function () {
        try {
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        init()
      }
      polling()
      d.onreadystatechange = function () {
        if (d.readyState === 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }
  let before = function (el, target) {
    target.parentNode.insertBefore(el, target)
  }
  let prepend = function (el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg () {
    let div, svg
    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write('<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>')
    } catch (e) {
      console && console.log(e)
    }
  }
  ready(appendSvg)
})(window)
