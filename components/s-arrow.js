class ArrowButton extends HTMLElement{
    constructor(){
        super()

        const css = `
        <style>
            button{
                position: relative;
            }
            .btn{
                width: var(--button-width, 20px);
                height: var(--button-width, 20px);
                // height: 100%;
                padding: 0;
                background: transparent;
                // border: none;
                border: var(--button-arrow-thickness) solid var(--button-arrow-color);
                cursor: pointer;
            }
            .btn:before{
                content: '';
                display: block;
                position: relative;
                top: 0;
                width: calc(var(--button-width) * .2);
                right: -42%;
                height: calc(var(--button-width) * .2);
                box-shadow: inset calc(var(--button-arrow-thickness) * -1) var(--button-arrow-thickness) 0 0 var(--button-arrow-color);
                transform:  rotate(45deg);
            }
            .btn:after{
                content: '';
                display: block;
                // right: 0;
                width: calc(var(--button-width) * .30);
                height: var(--button-arrow-thickness, 1px);
                transform: translate(16px, -5.5px);
                background: var(--button-arrow-color);
                position: absolute;
            }
            .btn:hover{
                background: hsla(0, 10%, 98%, .2);
                border: 1px solid black;
            }
        </style>
        `
        this.template = document.createElement("template")
        this.template.innerHTML += `
        ${css}
            <button title="right" class="btn btn-right" onclick="console.log('hello')"></button>
        `
        this.render()
    }
    render() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(this.template.content.cloneNode(true))
    }
    emitEvent() {
        const event = new CustomEvent('arrow-button-click', { bubbles: true })
        this.dispatchEvent(event)
    }
}

export {ArrowButton}