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
                    width: 100%;
                    margin: auto;
                    scroll-behavior: smooth;
                }
                .container.active{
                    cursor: grabbing;
                }
                .container.active * {
                    cursor: grabbing;
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
                .desktop-only{
                    display: none;
                }
                @media (min-width: 900px){
                    .desktop-only {
                        display: block;
                    }
                    .container {
                        width: calc(100% - calc(var(--button-width) * 4));
        
                    }
                }
            </style>
            `
            this.template = document.createElement("template");
            this.template.innerHTML += `
            ${css}
            <div class="sly-slyder-wrapper">
                <arrow-button class="btn-right desktop-only" ></arrow-button>
                <arrow-button class="btn-left desktop-only"></arrow-button>
                <div class="container x mandatory-scroll-snapping" >
                    <slot></slot>
                </div>
            </div>
            `
            
            this.render()
            
            let shadowRoot = this.shadowRoot
            this.container = shadowRoot.querySelector('.container')
            console.log(shadowRoot.querySelector('.container'), 'from callback')
            
            //configure buttons
            shadowRoot.querySelector('.btn-right').addEventListener('click', (e) => {
                console.log('slidng', this.container)
                this.container.scrollLeft += 189
            })
            shadowRoot.querySelector('.btn-left').addEventListener('click', (e) => {
                console.log('slidng', this.container)
                this.container.scrollLeft -= 189
            })

            //configure grab and slide
            let isDown = false
            let startX = 0;
            this.scrollLeft=0
            
            this.container.addEventListener('mousedown',(e) => {
                isDown = true
                this.container.classList.add('active')
            })

            this.container.addEventListener('mouseup', () => {
                isDown = false;
                this.container.classList.remove('active');
            });

            this.container.addEventListener('mousemove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - this.container.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                this.container.scrollLeft = 
                // 187
                this.scrollLeft - walk;
                console.log(walk);
              });

        }
        

        render(){
            let templateContent = this.template.content;
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
            console.log('rendering')
        }
        connectedCallback() {
        }
    }

  export {SlySlyder}