document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('rsvp-form');
  const result = document.getElementById('rsvp-result');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    result.textContent = '';
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      guests: parseInt(form.guests.value,10) || 1,
      message: form.message.value.trim()
    };

    try{
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      if(res.ok){
        result.style.color = 'green';
        result.textContent = 'Obrigado! Sua confirmação foi recebida.';
        form.reset();
      } else {
        const err = await res.json().catch(()=>({message:'Erro ao enviar'}));
        result.style.color = 'crimson';
        result.textContent = err.message || 'Erro ao enviar. Tente novamente.';
      }
    }catch(err){
      result.style.color = 'crimson';
      result.textContent = 'Erro de conexão. Verifique sua internet.';
    } finally{
      btn.disabled = false;
      btn.textContent = 'Confirmar presença';
    }
  });
});

// Floating emojis background
(function(){
  const EMOJIS = ['💖','🎪','🎈','🎀','🌸'];
  const COUNT = 14;
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

