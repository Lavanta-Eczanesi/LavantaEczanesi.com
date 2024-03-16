///////////////////
// VARIABLES
/**
 * let mql
 * is defined in `detect-mobile.js`
 */

/**
 * Current time
 * Date() object
 */
// SOON TO BE DEPRECATED
// let now;

/**
 * End of currently-in-night-shift's date-time
 * Date() object
 */
let ns_end;

/**
 * Night-shift status. Are we in night-shift or not?
 * Boolean. Initiate as false.
 */
let nstatus = false;

// Select Nobetci Eczane info box
var div_nobetci = document.getElementById("nobetci");

// Select the main body for top margin
var div_main = document.getElementById("business-card");

///////////////////
// FUNCTIONS
/**
 * Runs automatically when window is first loaded.
 * Hides the night-shift banner
 */
function hideInfoBox() {
  div_nobetci.style.display = "none";
}


/**
 * Runs if current date and time is night-shift time.
 * Shows the night-shift banner
 */
function showInfoBox(smallScreen=false) {
  div_nobetci.style.display = "block";
  if (smallScreen === true) {
    // Don't use .replace() since there might not be the class to replace
    div_nobetci.classList.add('hanging-low');
    div_nobetci.classList.remove('hanging-high');
  }
  else {
    // Don't use .replace() since there might not be the class to replace
    div_nobetci.classList.add('hanging-high');
    div_nobetci.classList.remove('hanging-low');
  }
}


/**
 * Runs if current date and time is night-shift time.
 * Pushes everything except the night-shift banner down to make space.
 */
function pushBodyDown(smallScreen=false) {
  if (smallScreen)
    div_main.style.marginTop = "3.5em";
  else 
    // div_main.style.marginTop = "4.2em"; Before navbar  
    div_main.style.marginTop = "1.2em";
}


/**
 * Currently not in-use.
 * Reverts  html.main's 'margin-top' to its default.
 */
function pullBodyUp() {
  div_main.style["margin-top"] = "1.2px";
}


/*
Provides helper functions for date objects.
var dates = {
  // Source: http://stackoverflow.com/questions/497790
  convert:function(d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp) 
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return (
      d.constructor === Date ? d :
      d.constructor === Array ? new Date(d[0],d[1],d[2]) :
      d.constructor === Number ? new Date(d) :
      d.constructor === String ? new Date(d) :
      typeof d === "object" ? new Date(d.year,d.month,d.date) :
      NaN
    );
  },
  compare:function(a,b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      isFinite(a=this.convert(a).valueOf()) &&
      isFinite(b=this.convert(b).valueOf()) ?
      (a>b)-(a<b) :
      NaN
    );
  },
  inRange:function(d,start,end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      isFinite(d=this.convert(d).valueOf()) &&
      isFinite(start=this.convert(start).valueOf()) &&
      isFinite(end=this.convert(end).valueOf()) ?
      start <= d && d <= end :
      NaN
    );
  }
}
*/


/**
 * Detects either the current time is night-shift time
 * or a night-shift is incoming.
 * Returns either a boolean value or null.
 */
function detectNightShift() {
  // FOLLOWING ALGORITHM ASSUMES `nl` (nobet list) IS A SORTED ARRAY

  // Read file containing night-shift datetime values.
  var nl = readJsonFile();

  // Variable to hold the message to print to console
  let msg;

  for (let n_iter=0; n_iter>=0 && n_iter<3;){
    // Create night-shift start time as datetime object.
    var d_1 = new Date(nl[n_iter].start);
    // console.log("Nobet basla: (d_1)", d_1);

    // Create night-shift end time as datetime object.
    var d_2 = new Date(nl[n_iter].end);
    // console.log("Nobet bitis: (d_2)", d_2);

    // Create datetime object for current time.
    var g = new Date();
    // console.log("Now:           (g)", g);
    
    if      (g>d_2) {nstatus=false; msg="Listedeki 1 nöbet atlandı. Çünkü nöbet günü geçti"; console.log(msg);}
    else if (g>d_1) {nstatus=true;  ns_end=d_2; msg="Nobet anı!";                             break;}
    else if (d_1>g) {nstatus=false; msg="Nöbete daha var.";                                   break;}
    else            {nstatus=null;  msg="Listedeki 1 nöbetin tarihleri sorunlu!";            console.warn(msg);}
    n_iter=n_iter+1;
  }
  console.log(msg);
  return nstatus;
}


/**
 * Returns JSON object that is the list (array) of night-shifts
 */
function readJsonFile(){
  // liste is defined in `nobet-listesi.js`
  // and made available here via imports in html file
  return liste;
}


/** 
 * Detect if shift is continuing
 * Variables checked are not null if and only if it is shift hours when the page is loaded
 * This function is an helper function to redrawBanner()
 * This is to be used to redraw the shift banner upon screen width or orientation changes
 */
let isShiftContinue = () => {
  var current_time = new Date();
  return (current_time < ns_end);
};

/**
 * Define night shift banner operations in an arrow function
 */
let redrawBanner = () => {
    hideInfoBox();
    if (nstatus && isShiftContinue()){
      showInfoBox(smallScreen=mql.matches);
      pushBodyDown(smallScreen=mql.matches);
    }
};


/** 
 * Make shift banner (info box) sticky to top border when scrolled down
 * This operation only necessary when info box is hanging low
 * It would hang low only if window width is small (e.g. mobile device)
 */
function updateOnScroll(){
  if (mql.matches && isShiftContinue()){
    let nobetci_rect = div_nobetci.getBoundingClientRect();
    if (window.pageYOffset > (nobetci_rect.top-5)) {
      // console.log("scroll y", window.pageYOffset);
      // console.log("nobetci_y", nobetci_rect.top);
      div_nobetci.classList.add("sticky");
    } 
    else {
      div_nobetci.classList.remove("sticky");
    }
  }
}


///////////////////
// EVENT LISTENERS

/** 
 * Upon loading of page;
 * hide night-shift banner,
 * if now is the shift time,
 * show it and push the main webpage body down
 */  
window.addEventListener("load",
  e => {
    hideInfoBox();
    if (detectNightShift()){
      showInfoBox(smallScreen=mql.matches);
      pushBodyDown(smallScreen=mql.matches);
    }
  }
);


/**
 * Upon change in screen-width or page-width below or above threshold;
 * redraw night-shift banner
 * redraw function checks if the shift is continuing
 */
mql.onchange = (e) => {
  if (e.matches) {
    // console.log("Small screen")
    redrawBanner();
  }
  else {
    // console.log("Wide screen")
    redrawBanner();
  }
};

/**
 * See updateOnScroll declaration for more info
 */
document.addEventListener('scroll', updateOnScroll);


///////////////////
// MAIN FUNCTION
// Following commands run once this script loads

/**
 * See updateOnScroll declaration for more info
 */
updateOnScroll();
