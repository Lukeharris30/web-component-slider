import {clickedOutside} from '../helpers/clickOutside.js'
class SModal extends HTMLElement {
    static get observedAttributes() { return ['showmodal']; }
    constructor(){
        super()
        const css = `
            <style>
                .modal {
                    display: block
                }
                .modal-open{
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: hsla(0, 0%, 8%, .8);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 0;
                    align-items: center;
                }
                .hide-modal {
                    display: none;
                }
                .modal-content{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            </style>
        `
        this.isOpen = this.getAttribute('showModal')
        this.template = document.createElement('template')
        this.template.innerHTML += `
            ${css}
            <div class="modal hide-modal">
                <div class="modal-content">
                    <slot></slot>
                </div>
            </div>
        `

        this.render()
        
        this.addEventListener('card-click', e => this.toggleModal(e))
        // this.addEventListener('click', e => this.toggleModal(e))
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.toggleModal(this)
    }
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ''
        }
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
    toggleModal(e) {
        this.isOpen = !this.isOpen
        if(this.isOpen === true){
            this.shadowRoot.querySelector('.modal').classList.add('modal-open')
            this.shadowRoot.querySelector('.modal').classList.remove('hide-modal')
        }
        else {
            this.shadowRoot.querySelector('.modal').classList.remove('modal-open')
            this.shadowRoot.querySelector('.modal').classList.add('hide-modal')
        }
    }
    
}

export {SModal}