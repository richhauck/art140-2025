document.addEventListener("DOMContentLoaded", (event) => {
  // Toggle Nav
  const toggleNav = document.getElementById("toggle-nav");
  toggleNav.addEventListener("click", () => {
    console.log("toggle nav");
    document.body.classList.toggle("nav-open");
    toggleNav.classList.toggle("is-active");
  });

  /**
   * Window listener that closes nav windows when expanded to desktop.
   */
  const onResize = () => {
    if (window.innerWidth >= 768) {
      document.body.classList.remove("nav-open");
    }
  };
  //$(window).bind('resize', onResize);
  //onResize();

  var optimizedResize = (function () {
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
      callbacks.forEach(function (callback) {
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
      add: function (callback) {
        if (!callbacks.length) {
          window.addEventListener("resize", resize);
        }
        addCallback(callback);
      },
    };
  })();

  // start process
  optimizedResize.add(function () {
    onResize();
  });

  document.querySelector("#top-button").addEventListener("click", (event) => {
    event.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});
