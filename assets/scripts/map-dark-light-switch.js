/* Select Google Maps' Embed iframe */
var iframe = document.getElementById("gm-iframe");

function paintMap() {
  /* Runs when iframe is first loaded. Apply correct color scheme
     Runs automatically due to 'onload=paintMap()' attribute in <iframe> tag*/
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
  if (prefersDarkScheme.matches) {
    iframe.style["filter"] = "invert(100%) hue-rotate(180deg) brightness(115%) contrast(75%) sepia(5%)";
  } else if (prefersLightScheme){
    iframe.style["filter"] = "";
  }
};


///////////////////
// EVENT LISTENERS
/* Listens the change in system's, device's or web browser's color scheme (dark or light) 
   Invoke the necessary function to match Google Maps' iframe's colors */

// DARK-LIGHT THEME RELATED EVENT LISTENERS ARE MOVED TO 'dark-light-change-events.js'
// window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",
//   e => e.matches && darkenMap()
// );

// window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",
//   e => e.matches && lightenMap()
// );

function darkenMap() {
  iframe.style["filter"] = "invert(100%) hue-rotate(180deg) brightness(115%) contrast(75%) sepia(5%)";
};

function lightenMap() {
  iframe.style["filter"] = "";
};