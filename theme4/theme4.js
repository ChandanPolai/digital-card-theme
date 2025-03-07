const sections = document.querySelectorAll(".card-inner");
const menuItems = document.querySelectorAll(".top-menu ul li a");

// Function to handle clicks
function handleTabClick(event) {
  event.preventDefault();

  // Agar screen width 1023px se upar hai to tab ka behavior rakho
  if (window.innerWidth > 1023) {
    sections.forEach((section) => section.classList.remove("active"));

    const targetSection = document.querySelector(this.getAttribute("href"));
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Active class tab par lagao
    document
      .querySelectorAll(".top-menu ul li")
      .forEach((li) => li.classList.remove("active"));
    this.parentElement.classList.add("active");
  } else {
    // Agar screen 1023px se chhoti hai, to default anchor scroll hone do
    const targetSection = document.querySelector(this.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Event listener sabhi menu items ke liye
menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", handleTabClick);
});
