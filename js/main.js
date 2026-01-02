document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('whatsapp-btn');
  const inputName = document.getElementById('confirm-name');
  const inputGuest = document.getElementById('confirm-guest');

  if(!btn) return;

  btn.addEventListener('click', function(){
    const name = (inputName && inputName.value || '').trim();
    const guest = (inputGuest && inputGuest.value || '').trim();
    if(!name){
      alert('Por favor, Digite seu nome para garantir seu lugar no espetáculo.');
      inputName && inputName.focus();
      return;
    }

    let phone = (btn.dataset.phone || '').replace(/[^0-9]/g, '');
    if(!phone){
      alert('Número de WhatsApp não configurado. Atualize o atributo data-phone do botão.');
      return;
    }

    // Mensagem conforme solicitado pelo usuário
    // "olá sou "o nome da pessoa" e queria confirmar minha presença e de "nome do convidado SE TIVER" para o aniversário da de 1 ano da Clarice."
    let message = `Oi! Eu sou ${name} e já estou pronto(a) para esse grande espetáculo! `;
    if(guest) message += ` e Junto comigo está ${guest}`;
    message += ` 🎟️ Confirmando presença .`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank');
  });
});

// Floating emojis background
(function(){
  const EMOJIS = ['💖','🎪','🎈','🎀','🌸'];
  const COUNT = 3;
  const container = document.getElementById('emoji-bg');
  if(!container) return;

  function rand(min, max){ return Math.random()*(max-min)+min }

  for(let i=0;i<COUNT;i++){
    const el = document.createElement('div');
    el.className = 'emoji';
    el.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    const left = rand(2, 96);
    const size = Math.round(rand(18, 44));
    const dur = rand(6, 18);
    const delay = rand(-12, 6);
    el.style.left = left + '%';
    el.style.fontSize = size + 'px';
    el.style.animation = `floatUp ${dur}s linear ${delay}s infinite`;
    // Slight horizontal drift using transform
    el.style.transform = `translateY(0) rotate(${Math.round(rand(-20,20))}deg)`;
    container.appendChild(el);
  }

  // regenerate on resize for better spread
  let resizeTimer = null;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=>{
      while(container.firstChild) container.removeChild(container.firstChild);
      for(let i=0;i<COUNT;i++){
        const el = document.createElement('div');
        el.className = 'emoji';
        el.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
        const left = rand(2, 96);
        const size = Math.round(rand(18, 44));
        const dur = rand(6, 18);
        const delay = rand(-12, 6);
        el.style.left = left + '%';
        el.style.fontSize = size + 'px';
        el.style.animation = `floatUp ${dur}s linear ${delay}s infinite`;
        el.style.transform = `translateY(0) rotate(${Math.round(rand(-20,20))}deg)`;
        container.appendChild(el);
      }
    }, 250);
  });
})();

