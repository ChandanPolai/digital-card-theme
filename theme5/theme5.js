const comapny = document.getElementById("comapny");
console.log(comapny)
const personal = document.getElementById("personal");
const cContent = document.getElementById("cContent");
const pContent = document.getElementById("pContent");

comapny.addEventListener("click", () => {        
    comapny.classList.add("active");
    personal.classList.remove("active");
    cContent.classList.add("show");
    pContent.classList.remove("show");
});

personal.addEventListener("click", () => {
    personal.classList.add("active");
    comapny.classList.remove("active");

    pContent.classList.add("show");
    cContent.classList.remove("show");
});





