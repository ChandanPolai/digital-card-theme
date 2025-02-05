
// functionality for DARK AND WHITE MODE
const darkIcon = document.getElementById("dark-icon");
const body = document.body;

if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkIcon.innerHTML = '<i class="fa-sharp fa-solid fa-sun"></i>';
}

darkIcon.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkIcon.innerHTML = '<i class="fa-sharp fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkIcon.innerHTML = '<i class="fa-sharp fa-solid fa-moon"></i>';
  }
});


// QR CODE SHOWING OF THE USER
const qrbtn = document.querySelector(".qr-btn");
const qrmodel = document.querySelector("#qr-section");


qrbtn.addEventListener("click", () => {
  if (qrmodel.classList.contains("show-qr")) {
    qrmodel.classList.remove("show-qr");
    setTimeout(() => {
      qrmodel.style.display = "none";
    }, 500);
  } else {
    qrmodel.style.display = "block";
    qrmodel.classList.add("show-qr");
  }
});


// IMAGE GALLERY FUNCTIONALITY
function changeImage(element) {
  document.getElementById("mainImage").src = element.src;

  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });

  element.classList.add("active");
}


// Select navigation buttons
const gallery = document.querySelector(".gallery");
const info = document.querySelector(".info");
const social = document.querySelector(".social");

// Select content containers
const tab1 = document.querySelector(".gallery-container");
const tab2 = document.querySelector(".main");
const tab3 = document.querySelector(".info-container");

// Function to hide all containers
function hideAllContainers() {
    tab1.style.display = 'none';
    tab2.style.display = 'none';
    tab3.style.display = 'none';
}

// Function to add active state to buttons
function resetButtonStates() {
    gallery.classList.remove('active');
    social.classList.remove('active');
    info.classList.remove('active');
}

// Event listeners for navigation buttons
gallery.addEventListener('click', () => {
    hideAllContainers();
    tab1.style.display = 'block';
    resetButtonStates();
    gallery.classList.add('active');
});

social.addEventListener('click', () => {
    hideAllContainers();
    tab2.style.display = 'block';
    resetButtonStates();
    social.classList.add('active');
});

info.addEventListener('click', () => {
    hideAllContainers();
    tab3.style.display = 'block';
    resetButtonStates();
    info.classList.add('active');
});

// Set default view (Social tab)
function initializeTabs() {
    hideAllContainers();
    tab2.style.display = 'block';
    social.classList.add('active');
}

// Call initialization when page loads
document.addEventListener('DOMContentLoaded', initializeTabs);
