import {ArrowButton} from './s-arrow.js'

customElements.define('arrow-button', ArrowButton)
    class SlySlyder extends HTMLElement {
        constructor() {
            super();
            const css = `
            <style>
                *, *:before, *:after {
                    box-sizing: border-box;
                }
                .container {
                    box-sizing: border-box;
                    display: flex;
                    overflow: auto;
                    outline: var(--sly-container-border);
                    flex: none;
                    // min-width: calc(var(--sly-item-width) * 1.5);
                    height: var(--sly-container-height, 50vh);
                    flex-flow: row nowrap;
                    gap: var(--sly-container-item-gap, 10px);
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    padding: 30px 0;
                    width: calc(100% - calc(var(--button-width) * 4));
                    margin: auto;
                }
                .container::-webkit-scrollbar {
                    display: none;
                }
                .x.mandatory-scroll-snapping {
                    scroll-snap-type: x mandatory;
                }
                .sly-slyder-wrapper {
                    display: flex;
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .btn-right {
                    position: absolute;
                    right: calc( var(--button-width) / 2 * -1);
                    top: 50%;
                    transform: translate(-50%, -50%);
                    // height: 100%;
                }
                .btn-left {
                    position: absolute;
                    top: 50%;
                    transform:  translate(0%, -50%) rotate(180deg);
                }
            </style>
            `
            this.template = document.createElement("template");
            this.template.innerHTML += `
            ${css}
            <div class="sly-slyder-wrapper">
                <arrow-button class="btn-right"></arrow-button>
                <arrow-button class="btn-left"></arrow-button>
                <div class="container x mandatory-scroll-snapping" >
                    <slot></slot>
                </div>
            </div>
            `

            
            this.render()
            console.log(this.container, 'container')
            this.container = this.shadowRoot.querySelector('.container')
        }
        

        render(){
            let templateContent = this.template.content;
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
        slideLeft(){
            
                // let slideArea = this.shadowRoot.querySelector('.container')
                this.scroolLeft = this.scrollLeft + 189
            console.log('sliding left', this.scrollLeft)
            
            
        }
    }

  export {SlySlyder}