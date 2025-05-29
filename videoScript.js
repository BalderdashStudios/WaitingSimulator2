document.addEventListener('DOMContentLoaded', e => { 
  let introVid =  document.getElementById("introVid")

  // introVid.addEventListener('ended', function(e) { 
//introVid.pause();
  //       introVid.removeAttribute('src'); // empty source
  //       introVid.load();
  //       var level = document.createElement('script');
  //       level.src = "movementTest.js";
  //       document.body.appendChild(level);
  //       console.log("Video Ended");
  // })

  introVid.addEventListener("click", function() {
    introVid.muted = false;
    introVid.play();
  });


  introVid.addEventListener('loadedmetadata', function() { 
   this.currentTime = 70;
 }, false);


});

let introVid = document.getElementById("introVid");
introVid.onended = function() {
  console.log("Video ended");
  theCanvas.show();
  loop();
  introVid.remove();
  //introVid.style.visibility = "hidden";
};

