class SlyderItem extends HTMLElement {
    constructor() {
        super();
        const css = ` 
        <style> 
            .sly-item {
                box-sizing: border-box;
                scroll-snap-align: center;
                flex: none;
                background: var(--sly-item-background, aliceblue);
                border: var(--sly-item-border);
                font-size: 20px;
                width: var(--sly-item-width, 300px);
                min-width: 189px;
                max-width: 400px;
                height: 100%;
                font-family: sans-serif;
                /* padding: 20px; */
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            }
            .sly-item-content{
                padding: 20px 94px 20px 20px;
            }
            ::slotted(h2){
                margin-top: 0;
                margin-bottom: 0;

            }
            .sly-item img{
                width: 100%;
                display: block;
            }
            .sly-item:hover{
                // transform: scale(1.06);
                transition: ease-in-out .19s;
                cursor: pointer;
                box-shadow: 5px 5px 10px 5px rgb(225, 221, 221);
            }
            .sly-item h2 {
                font-size: 1em;
            }
            .sly-item-video{
                position: relative;
            }
            .image-wrapper{
                position: relative;
                width: 189px;
                height: 336px;
            }
            .sly-item-video .image-wrapper:before,
            .sly-item-video .image-wrapper:after{
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 46px;
                height: 46px;
                display: block;
                border-radius: 50%;
                background-color: hsla(0, 50%, 100%, .8);
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            }
            .sly-item-video .image-wrapper:after{
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(calc(50% - 15px), -50%) rotate(45deg);
                width: 0px;
                height: 0px;
                border-radius: 0;
                border-top: 6px solid black;
                border-right: 6px solid black;
                border-left: 6px solid transparent;
                border-bottom: 6px solid transparent;
                background-color: transparent;
                box-shadow: none;
            }
            .sly-item-video {
                background: var(--sly-item-background);
                color: #fff;
            }
            .sly-item-video:hover .image-wrapper:before{
                background: hsla(353,96%, 56%, .7);
            }
            .sly-item-video:hover {
                background: hsl(351, 80%, 50%);
                color: #fff;
            }

        </style>
        `

        this.template = document.createElement("template");
        this.template.innerHTML += `
        ${css}
            <div class="sly-item">
                <div class="image-wrapper">
                    <img src="https://picsum.photos/id/237/300">
                </div>
                <div class="sly-item-content">
                    <slot></slot>
                </div>
            </div>
        `

        this.render()

        // this should all be in connectedCallback
        this.videoUrl = this.getAttribute('videoUrl')
        this.imageUrl = this.getAttribute('imgSrc')

        if (this.videoUrl) {
            let videoWrapper = this.shadowRoot.querySelector(".sly-item")
            videoWrapper.classList.add('sly-item-video')
            this.addEventListener('click', this.emitEvent)
        }
        if (this.imageUrl) {
            const image = this.shadowRoot.querySelector('img')
            
            // disallow image drag
            image.ondragstart = () => {
                return false;
            };

            image.setAttribute("src", this.getAttribute('imgSrc'))
        }

    }
    render() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
    emitEvent() {
        const event = new CustomEvent('card-click', { bubbles: true, detail: this.videoUrl })
        this.dispatchEvent(event)
    }
}
export { SlyderItem }