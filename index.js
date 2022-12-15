import {SlySlyder} from './components/sly-slyder.js'
import {SModal} from './components/s-modal.js'
import {SlyderItem} from './components/slyder-item.js'
import {VideoComponent} from './components/s-video.js'
import {ArrowButton} from './components/s-arrow.js'

customElements.define("slyder-item", SlyderItem)
customElements.define('sly-slyder', SlySlyder)
customElements.define('s-modal', SModal)
customElements.define('video-component', VideoComponent)
customElements.define('arrow-button', ArrowButton)