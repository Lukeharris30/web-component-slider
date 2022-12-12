
const css = `
                <style>
                    .container {
                        box-sizing: border-box;
                        display: flex;
                        overflow: auto;
                        outline: var(--sly-container-border);
                        flex: none;
                        min-width: calc(var(--sly-item-width) * 1.5);
                        height: var(--sly-container-height, 50vh);
                        flex-flow: row nowrap;
                        gap: var(--sly-container-item-gap, 10px);
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                        padding: 30px;
                    }
                    .container::-webkit-scrollbar {
                        display: none;
                    }
                    .x.mandatory-scroll-snapping {
                        scroll-snap-type: x mandatory;
                    }
                </style>
                `
let template = document.createElement("template");
template.innerHTML += `
    ${css}
    <div class="container x mandatory-scroll-snapping" >
        <slot></slot>
    </div>
    `
    class SlySlyder extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render(){
            let templateContent = template.content;
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    }

  export {SlySlyder}