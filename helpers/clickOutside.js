const clickedOutside = function(elementSelector){
    const clickedOutside = false
    document.addEventListener("click", (evt) => {
        const flyoutEl = document.querySelector(elementSelector);
        let targetEl = evt.target; // clicked element      
        do {
          if(targetEl == flyoutEl) {
            // This is a click inside, does nothing, just return.
            clickedOutside = false
          }
          else clickedOutside = true
          // Go up the DOM
          targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.      
    });
    return clickedOutside
}
export {clickedOutside}
