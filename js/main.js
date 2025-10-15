
// main.js — interactions, animations & micro UX
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  ham && ham.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = Number(el.getAttribute('data-delay') || 0);
        setTimeout(()=> el.classList.add('visible'), delay);
        io.unobserve(el);
      }
    });
  }, {threshold: 0.12});
  revealEls.forEach(e=>io.observe(e));

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', e => {
      if (a.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Signup form (demo local handling)
  const signup = document.getElementById('signup');
  if (signup) {
    signup.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(signup);
      alert('Thanks ' + fd.get('name') + '! You will receive updates at ' + fd.get('email'));
      signup.reset();
    });
  }

  // Project filtering
  const chips = document.querySelectorAll('.chip');
  const projects = document.querySelectorAll('.project-card');
  chips.forEach(chip => chip.addEventListener('click', ()=> {
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.getAttribute('data-filter');
    projects.forEach(p => {
      if (f === 'all' || p.getAttribute('data-type') === f) p.style.display = '';
      else p.style.display = 'none';
    });
  }));

  // Event register buttons demo
  document.querySelectorAll('[data-event]').forEach(btn => btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-event');
    showEventModal(id);
  }));

  // Simple event modal (created on the fly)
  function showEventModal(id) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-inner"><h3>Register</h3><p>You are registering for ' + id + '. This is a demo registration.</p><button id="close">Close</button></div>';
    Object.assign(modal.style, {position:'fixed',inset:0,display:'grid',placeItems:'center',background:'rgba(0,0,0,0.6)',zIndex:9999});
    document.body.appendChild(modal);
    document.getElementById('close').addEventListener('click', ()=> modal.remove());
  }

  // Contact form demo
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Message sent — we will get back to you!');
      contactForm.reset();
    });
  }

  // tiny glitch animation on hero title
  const heroTitle = document.querySelector('.hero-inner h1');
  if (heroTitle) {
    setInterval(()=>{
      heroTitle.style.transform = 'translateY(-2px)';
      setTimeout(()=> heroTitle.style.transform = '', 200);
    }, 3500);
  }
});
