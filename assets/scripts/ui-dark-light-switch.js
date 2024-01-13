///////////////////
// VARIABLES
/* Select <meta name="theme-color"> tag */
var theme_color = document.querySelector('meta[name="theme-color"]');

// Define colors
const color_lavanta = "#796177";
const color_dark_lavanta = "#4C3D4B";


///////////////////
// FUNCTIONS
// Define basic color changing functions
function lightenUi(){
    theme_color.setAttribute('content', color_lavanta);
}

function darkenUi(){
    theme_color.setAttribute('content', color_dark_lavanta);
}

function paintUi() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    darkenUi();
  } else {
    lightenUi();
  }
};


///////////////////
// EVENT LISTENERS
/* Listens the change in system's, device's or web browser's color scheme (dark or light) 
   Invoke the necessary function to match Google Maps' iframe's colors */
// References
// https://stackoverflow.com/a/59621903/4258598
// https://web.dev/prefers-color-scheme/

// DARK-LIGHT THEME RELATED EVENT LISTENERS ARE MOVED TO 'dark-light-change-events.js'
// window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", 
//   e => e.matches && darkenUi() 
// ); 

// window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", 
//   e => e.matches && lightenUi() 
// ); 


///////////////////
// MAIN FUNCTION
// This function should be run once this script loads so correct UI color is picked
paintUi();
