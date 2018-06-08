/*
 * @Author: cewei
 * @Date:   2018-02-09 16:45:02
 * @Last Modified by:   cewei
 * @Last Modified time: 2018-06-05 20:34:50
 */
require("./index.css");


function Slider() {

}

const prototype = {
    config: {
        index: 0,
        state: false,
        pics: document.querySelector('#pics'),
        dots: document.querySelector('#dots'),
        pre: document.querySelector('.pre'),
        next: document.querySelector('.next'),
        dotsNum: document.querySelectorAll('#pics .img').length - 2,
        timer: null
    },
    init: function() {
        this.dotsInit()
        this.bindEvent()
    },
    dotsInit: function() {
        const fragment = document.createDocumentFragment()
        let dot
        for (let i = 0; i < this.config.dotsNum; i++) {
            dot = document.createElement('span')
            dot.className = 'dot'
            dot.setAttribute('index', i)
            if (i === 0) {
                dot.className = 'dot active'
            }
            fragment.appendChild(dot)
        }
        this.config.dots.appendChild(fragment)
    },
    bindEvent: function() {
        const _this = this
        let index = this.config.index
        this.config.next.addEventListener('click', function() {
            if (_this.config.state) {
                return
            }
            _this.animate(-830)
            if (index === 4) {
                index = 0
            } else {
                index++
            }
            _this.addColorForDots(index)
        })

        this.config.pre.addEventListener('click', function() {
            if (_this.config.state) {
                return
            }
            _this.animate(830)
            if (index === 0) {
                index = 4
            } else {
                index--
            }
            _this.addColorForDots(index)
        })
        this.config.dots.addEventListener('click', function(e) {
            if (/dot/.test(e.target.className)) {
                let dotIndex = parseInt(e.target.getAttribute('index'))
                _this.animate((dotIndex - index) * (-830))
                index = dotIndex
                _this.addColorForDots(index)
            }
        })
    },
    animate: function(offset) {
        this.config.state = true
        const time = 300
        const interval = 10
        const speed = offset / (time / interval)
        let pic = this.config.pics
        let newLeft = parseInt(pic.style.left) + offset
        let _this = this


        function slide() {
            if ((speed < 0 && newLeft < parseInt(pic.style.left)) || (speed > 0 && newLeft > parseInt(pic.style.left))) {
                pic.style.left = parseInt(pic.style.left) + speed + 'px'
                setTimeout(slide, interval)
            } else {
                _this.config.state = false
                pic.style.left = newLeft + 'px'
                if (parseInt(pic.style.left) < -4150) {
                    pic.style.left = -830 + 'px'
                }
                if (parseInt(pic.style.left) > -600) {
                    pic.style.left = -4150 + 'px'
                }
            }
        }
        slide()
    },
    addColorForDots: function(index) {
        let dotsNum = this.config.dotsNum
        let dots = this.config.dots.querySelectorAll('.dot')
        for (let i = 0; i < dotsNum; i++) {
            if (/active/.test(dots[i].className)) {
                dots[i].className = 'dot'
                break
            }
        }
        dots[index].className = 'dot active'
    },
}

Slider.prototype = prototype

const slider = new Slider()
module.exports = Slider