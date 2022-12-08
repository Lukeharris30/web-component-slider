class VideoComponent extends HTMLElement {
    constructor() {
      super();

        // Create the shadow root
        this.shadow = this.attachShadow({ mode: 'open' });
        
        // Set the initial video ID
        this.videoId = this.getAttribute('video-id')

        // Parse the provided template and save it to a property
        let template = document.createElement('template');
        template.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${this.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        this.template = template.content;
    
    }
  
     // A method to update the iframe's src attribute based on the video ID
  updateVideo() {
    let iframe = this.template.cloneNode(true);
    iframe.src = `https://www.youtube.com/embed/${this.videoId}`;
    // Clear the shadow root and append the updated iframe
    this.shadow.innerHTML = '';
    this.shadow.appendChild(iframe);
    this.shadow.querySelector('iframe').src= iframe.src
  
  }

    // A lifecycle callback that is called when the element is added to the DOM
    connectedCallback() {
      this.updateVideo();
    }
  
    // A lifecycle callback that is called when the element's attributes are changed
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'video-id' && oldValue !== newValue) {
        console.log('old', oldValue, 'new', newValue)
        this.videoId = newValue
        this.updateVideo();
      }
    }
  
    // A static method that defines the observed attributes for the element
    static get observedAttributes() {
      return ['video-id'];
    }
  }

  export {VideoComponent}