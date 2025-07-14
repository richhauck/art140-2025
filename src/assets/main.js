document.addEventListener('DOMContentLoaded', function(event) {

    // Toggle Nav
    document.querySelector('#toggle-nav').onmouseup = function(){
      document.body.classList.toggle('nav-open');
      this.classList.toggle('is-active');
    }

  // arrows in primary nav
  function collectionHas(a, b) { //helper function (see below)
    for(var i = 0, len = a.length; i < len; i ++) {
        if(a[i] == b) return true;
    }
    return false;
  }
  function findParentBySelector(elm, selector) {
      var all = document.querySelectorAll(selector);
      var cur = elm.parentNode;
      while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
          cur = cur.parentNode; //go up
      }
      return cur; //will return null if not found
  }

  let elementsArray = document.querySelectorAll('.group input[type="image"]');
  elementsArray.forEach(function(elem) {
    elem.addEventListener('click', function(elem) {
      let group = findParentBySelector(this, '.group');
        group.classList.toggle('open');
    });
  });

  /**
   * Window listener that closes nav windows when expanded to desktop.
   */
   function onResize(){
     if(window.innerWidth >= 768){
       document.body.classList.remove('nav-open');
     };
   }
   //$(window).bind('resize', onResize);
   //onResize();

   var optimizedResize = (function() {
     var callbacks = [],
         running = false;

     // fired on resize event
     function resize() {
         if (!running) {
             running = true;
             if (window.requestAnimationFrame) {
                 window.requestAnimationFrame(runCallbacks);
             } else {
                 setTimeout(runCallbacks, 66);
             }
         }
     }

     // run the actual callbacks
     function runCallbacks() {
         callbacks.forEach(function(callback) {
             callback();
         });
         running = false;
     }

     // adds callback to loop
     function addCallback(callback) {
         if (callback) {
             callbacks.push(callback);
         }
     }

     return {
         // public method to add additional callback
         add: function(callback) {
             if (!callbacks.length) {
                 window.addEventListener('resize', resize);
             }
             addCallback(callback);
         }
     }
  }());

// start process
optimizedResize.add(function() {
 onResize();
});


document.querySelector('#top-button').addEventListener('click', function(event){
  event.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});


});
