function filtrar(cat){
  let cards = document.querySelectorAll('.card');

  cards.forEach(c=>{
    if(cat === 'todos'){
      c.style.display = 'block';
    } else {
      c.style.display = c.classList.contains(cat) ? 'block' : 'none';
    }
  });
}

function abrirJuego(url){
  window.open(url, '_blank');
}
