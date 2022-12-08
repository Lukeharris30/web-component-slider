class SlyderItem extends HTMLElement {
    constructor() {
        super();
        const css = ` 
        <style> 
            .sly-item {
                box-sizing: border-box;
                text-align: center;
                scroll-snap-align: center;
                flex: none;
                background: var(--sly-item-background, aliceblue);
                border: var(--sly-item-border);
                font-size: 20px;
                width: var(--sly-item-width, 300px);
                min-width: 200px;
                max-width: 400px;
                height: 100%;
                font-family: sans-serif;
                /* padding: 20px; */
            }
            .sly-item img{
                width: 100%;
            }
            .sly-item:hover{
                transform: scale(1.06);
                transition: ease-in-out .19s;
                cursor: pointer;
                box-shadow: 5px 5px 10px 5px rgb(225, 221, 221);
            }
            .sly-item h2 {
                font-size: 1em;
            }
            .sly-item-video img{
                position: relative;
            }
            .sly-item-video img::before{
                content: "hello";
                position: absolute;
                top: calc(50% - 25px);
                left: calc(50% - 50px);
                width: 40px;
                height: 40px;
                display: block;
                border: 2px solid red;
                border-radius: 50%;
                padding: 0;
                margin: 0 auto;
                user-select: none;
                background-color: rgba(0, 0, 0, 0.6);
                transition: background-color 0.5s ease;
            }
        </style>
        `

        this.template = document.createElement("template");
        this.template.innerHTML += `
        ${css}
            <div class="sly-item">
                <img src="https://picsum.photos/id/237/300"/>
                <slot></slot>
            </div>
        `
        this.render()
      
        
        this.videoUrl = this.getAttribute('videoUrl')
        this.imageUrl = this.getAttribute('imgSrc')

        if(this.videoUrl){
          let videoWrapper = this.shadowRoot.querySelector(".sly-item")
          videoWrapper.classList.add('sly-item-video')
          this.addEventListener('click', this.showVideo)
        }
          if(this.imageUrl){
            const image = this.shadowRoot.querySelector('img')       
            image.setAttribute("src", this.getAttribute('imgSrc'))
          }
       
      }
      render() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(this.template.content.cloneNode(true));
      }
      showVideo(){
        const event = new CustomEvent('showVideo', {bubbles: true, detail: this.videoUrl})
        this.dispatchEvent(event)
      }
    }
export {SlyderItem}