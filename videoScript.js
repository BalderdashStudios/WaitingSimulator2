document.addEventListener('DOMContentLoaded', e => { 
  let introVid =  document.getElementById("introVid")

  introVid.addEventListener("click", function() {
    introVid.muted = false;
    introVid.play();
  });


  introVid.addEventListener('loadedmetadata', function() { 
   this.currentTime = 79;
   //set to 79 for skip
 }, false);


});

let introVid = document.getElementById("introVid");
introVid.onended = function() {
  console.log("Video ended");
  theCanvas.show();
  loop();
  introVid.remove();
  startSim();
};

