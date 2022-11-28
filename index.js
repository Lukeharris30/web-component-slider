console.log('mounted')

customElements.define(
    "sly-slyder",
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById("sly-slyder");
        let templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
      }
    }
  );
  
  customElements.define(
    "slyder-item",
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById("slyder-item");
        let templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
      }
    }
  );