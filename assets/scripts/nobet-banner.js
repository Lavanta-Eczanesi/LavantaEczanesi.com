// Select Nobetci Eczane info box
var div_nobetci = document.getElementById("nobetci");

// Select the main body for top margin
var div_main = document.getElementById("business-card");

function hideInfoBox() {
  // Runs automatically when window is first loaded.
  // Hides the night-shift banner
  div_nobetci.style.display = "none";
}

function showInfoBox() {
  // Runs if current date and time is night-shift time.
  // Shows the night-shift banner
  div_nobetci.style.display = "block";
}

function pushBodyDown() {
  // Runs if current date and time is night-shift time.
  // Pushes everything except the night-shift banner down to make space.
  div_main.style.marginTop = "4.2em";
}

function pullBodyUp() {
  // Currently not in-use.
  // Revert  html.main's 'margin-top' to its default.
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

function detectNightShift() {
  // Detects if now is night-shift time.
  // Returns either a boolean value or null.

  // Read file containing night-shift datetime values.
  var nl = readJsonFile();
  
  // Create night-shift start time as datetime object.
  var d_1 = new Date(nl[nl.length-1].start);
  console.log("Nobet basla: (d_1)", d_1);

  // Create night-shift end time as datetime object.
  var d_2 = new Date(nl[nl.length-1].end);
  console.log("Nobet bitis: (d_2)", d_2);
  
  // Create datetime object for current time.
  var g = new Date();
  console.log("Now:           (g)", g);
  
  //console.log(dates.inRange(g, d_1, d_2));
  //console.log("  g: ", g.getTime());
  //console.log("d_1: ", d_1.getTime());
  //console.log("d_2: ", d_2.getTime());

  let nstatus;
  let msg;
  if      (g>d_2) {msg="Nobet gunu gecti";  nstatus=false;}
  else if (g>d_1) {msg="Nobet ani";         nstatus=true; }
  else if (d_1>g) {msg="Nobete daha var";   nstatus=false;}
  else            {msg="Tarihler sorunlu!"; nstatus=null; }
  console.log(msg);
  return nstatus;
}

function readJsonFile(){
  return liste;
}

// Upon loading of page;
//   hide night-shift banner,
//   if now is the shift time,
//   show it and push the main webpage body down
window.addEventListener("load",
  e => {
    hideInfoBox();
    if (detectNightShift()){
      showInfoBox();
      pushBodyDown();
    }
  }
);