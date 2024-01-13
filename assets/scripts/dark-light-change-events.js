///////////////////
// FUNCTIONS
// Wrapper function to run other functions from various scripts in a sandbox
function wrapper(fn){
  try {
    fn();
  } catch (e) {
    if (e.name == "ReferenceError") {
      console.warn("Expected error catched!");
      console.warn(e);
    } else {
      console.error(e);
    }
  }
}


///////////////////
// EVENT LISTENERS
/* Listens the change in system's, device's or web browser's color scheme (dark or light) 
   Invoke the necessary function to match Google Maps' iframe's colors */
// References
// https://stackoverflow.com/a/59621903/4258598
// https://web.dev/prefers-color-scheme/
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const lightModeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");

darkModeMediaQuery.addEventListener("change", (e) => {
  const isDarkModeOn = e.matches;
  console.log(`Dark mode is ${isDarkModeOn ? 'switched on. It is Batman time 🌒 ' : 'switched off. Morning sunshine! ☀️'}.`);
  if (isDarkModeOn){
    wrapper(darkenMap);
    wrapper(darkenUi);
  }
});

lightModeMediaQuery.addEventListener("change", e => {
  const isLightModeOn = e.matches;
  console.log(`Light mode is ${isLightModeOn ? 'switched on. Put your glasses on ☀️' : 'switched off. Getting dark 🌒'}.`);
  if (isLightModeOn){
    wrapper(lightenMap);
    wrapper(lightenUi);
  }
});
