let introVid = document.getElementById("introVid");
      //function playVid() {
      //      introVid.play();
      //}   
      //playVid();
      console.log("videoScript WORKS");
      //introVid.time(60);
      //introVid.muted = false;
      introVid.onended = function() {
        var level = document.createElement('script');
        level.src = "movementTest.js";
        document.body.appendChild(level);
      };

