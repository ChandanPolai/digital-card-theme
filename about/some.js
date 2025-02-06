
// DARK MODE AND LIGHT MODE FUNCTIONALITY
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check if dark mode is saved in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Toggle dark mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }
});





// Document height handler
const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  
  window.addEventListener("resize", documentHeight);
  documentHeight();
  
  // Scroll blocking patch
  function patchScrollBlockingListeners() {
    let supportsPassive = false;
    const x = document.createElement("x");
    x.addEventListener("cut", () => 1, {
      get passive() {
        supportsPassive = true;
        return !!1;
      },
    });
    x.remove();
  
    if (supportsPassive) {
      const originalFn = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (...args) {
        if (
          ["scroll", "touchmove", "touchstart"].includes(args[0]) &&
          (typeof args[2] !== "object" || args[2].passive === undefined)
        ) {
          args[2] = {
            ...(typeof args[2] === "object" ? args[2] : {}),
            passive: false,
          };
        }
        originalFn.call(this, ...args);
      };
    }
  }
  
  patchScrollBlockingListeners();
  
  // Main application code
  document.addEventListener("DOMContentLoaded", () => {
    // Helper functions for animations
    const animate = (element, properties) => {
      Object.keys(properties).forEach((prop) => {
        element.style.transition = "0.3s ease-in-out";
        element.style[prop] = properties[prop];
      });
    };
  
    const fadeIn = (element, duration = 100) => {
      element.style.display = "block";
      element.style.opacity = "0";
      setTimeout(() => (element.style.opacity = "1"), 0);
    };
  
    const fadeOut = (element, duration = 100) => {
      element.style.opacity = "0";
      setTimeout(() => (element.style.display = "none"), duration);
    };
  
    // Navigation handlers
    const handleQrClose = () => {
      const navQr = document.querySelector(".nav-qr");
      const navQr2 = document.querySelector(".nav-qr-other");
      
      const icon = navQr.querySelector("i");
      icon.classList.add("fa-chevron-up");
      icon.classList.remove("fa-chevron-down");

      const icon2 = navQr2.querySelector("i");
      icon2.classList.add("fa-chevron-up");
      icon2.classList.remove("fa-chevron-down");



      navQr.classList.remove("qropen");
      navQr2.classList.remove("qropen");


      animate(document.querySelector(".qr-content"), { bottom: "-105%" });
    };
  
    const goToGallery = () => {
      handleQrClose();
      animate(document.querySelector(".gallery"), { left: "0" });
      animate(document.querySelector(".main"), { left: "100%" });
      animate(document.querySelector(".about"), { right: "-200%" });
  
      document.querySelector(".nav-gallery").style.display = "none";
      document.querySelector(".nav-about").style.display = "none";
      document.querySelector(".header-nav").style.justifyContent = "flex-end";
      fadeIn(document.querySelector(".nav-gallery-back"));
    };
  
    const goToAbout = () => {
      handleQrClose();
      animate(document.querySelector(".gallery"), { left: "-200%" });
      animate(document.querySelector(".main"), { left: "-100%" });
      animate(document.querySelector(".about"), { right: "0" });
  
      document.querySelector(".nav-about").style.display = "none";
      document.querySelector(".nav-gallery").style.display = "none";
      document.querySelector(".header-nav").style.justifyContent = "flex-start";
      fadeIn(document.querySelector(".nav-about-back"));
    };
  
    const goToMain = () => {
      handleQrClose();
      animate(document.querySelector(".gallery"), { left: "-100%" });
      animate(document.querySelector(".main"), { left: "0" });
      animate(document.querySelector(".about"), { right: "-100%" });
  
      const backButtons = document.querySelectorAll(
        ".nav-back, .nav-gallery-back, .nav-about-back"
      );
      backButtons.forEach((btn) => (btn.style.display = "none"));
  
      fadeIn(document.querySelector(".nav-about"));
      fadeIn(document.querySelector(".nav-gallery"));
      document.querySelector(".header-nav").style.justifyContent =
        "space-between";
    };
  
    // Event listeners
    document.querySelector(".nav-gallery").addEventListener("click", (e) => {
      e.preventDefault();
      goToGallery();
    });
  
    // Touch swipe detection
    let touchStartX = 0;
    let touchEndX = 0;
  
    document.querySelector(".main").addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });
  
    document.querySelector(".main").addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const swipeLength = touchEndX - touchStartX;
  
      if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
          goToGallery();
        } else {
          goToAbout();
        }
      }
    };
  
    // Navigation event listeners
    document
      .querySelectorAll(".nav-back, .nav-gallery-back, .nav-about-back")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          goToMain();
        });
      });
  
    document.querySelector(".nav-about").addEventListener("click", (e) => {
      e.preventDefault();
      goToAbout();
    });
  
    // Gallery image handler
    document.querySelectorAll(".gallery-small").forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        const image = img.getAttribute("data-image");
        document.querySelector(
          ".big-images"
        ).style.backgroundImage = `url('${image}')`;
      });
    });
  
    // QR code toggle
    document.querySelector(".nav-qr").addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (this.classList.contains("qropen")) {
        this.classList.remove("qropen");
        icon.classList.add("fa-chevron-up");
        icon.classList.remove("fa-chevron-down");
        animate(document.querySelector(".qr-content"), { bottom: "-105%" });
      } else {
        this.classList.add("qropen");
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
        animate(document.querySelector(".qr-content"), { bottom: "0" });
      }
    });


    document.querySelector(".nav-qr-other").addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (this.classList.contains("qropen")) {
        this.classList.remove("qropen");
        icon.classList.add("fa-chevron-up");
        icon.classList.remove("fa-chevron-down");
        animate(document.querySelector(".qr-content"), { bottom: "-105%" });
      } else {
        this.classList.add("qropen");
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
        animate(document.querySelector(".qr-content"), { bottom: "0" });
      }
    });

  
  });
  


