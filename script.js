
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }


  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});


document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


const roles = ['estudante em busca de estágio', 'Desenvolvedor em formação', 'Apaixonado por tecnologia'];
let roleIndex = 0;
let charIndex = 0;
let deleting  = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}

type();

const fadeEls = document.querySelectorAll(
  '.project-card, .skill-card, .contact-info, .contact-form-wrap, .section-heading'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const submitText  = document.getElementById('submitText');
const sendIcon    = document.getElementById('sendIcon');
const spinner     = document.getElementById('spinner');
const successMsg  = document.getElementById('successMsg');
const resetFormBtn = document.getElementById('resetForm');

function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

function clearErrors() {
  ['nameError', 'emailError', 'messageError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

function validateForm(name, email, message) {
  let valid = true;
  if (name.trim().length < 2) {
    showError('nameError', 'Nome é obrigatório (mínimo 2 caracteres).');
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('emailError', 'Email inválido.');
    valid = false;
  }
  if (message.trim().length < 10) {
    showError('messageError', 'Mensagem deve ter pelo menos 10 caracteres.');
    valid = false;
  }
  return valid;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  const name    = contactForm.name.value;
  const email   = contactForm.email.value;
  const message = contactForm.message.value;

  if (!validateForm(name, email, message)) return;


  submitBtn.disabled = true;
  submitText.textContent = 'Enviando...';
  sendIcon.classList.add('hidden');
  spinner.classList.remove('hidden');

  await new Promise(resolve => setTimeout(resolve, 1600));


  contactForm.classList.add('hidden');
  successMsg.classList.remove('hidden');


  submitBtn.disabled = false;
  submitText.textContent = 'Enviar Mensagem';
  sendIcon.classList.remove('hidden');
  spinner.classList.add('hidden');
});

resetFormBtn.addEventListener('click', () => {
  contactForm.reset();
  clearErrors();
  successMsg.classList.add('hidden');
  contactForm.classList.remove('hidden');
});


document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('year').textContent = new Date().getFullYear();
