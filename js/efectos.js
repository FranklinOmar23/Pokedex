const categorias = document.querySelector(".categorias");
const navList = document.querySelector(".nav-list");

categorias.addEventListener("click", function(event) {
  event.preventDefault();
  navList.classList.toggle("mostrar");
});

function scrollToElement(element) {
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  const scrollBtn = document.querySelector('.scroll-btn');
  scrollBtn.addEventListener('click', function() {
    scrollToElement('#main-section');
  });