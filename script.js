/* =========================================================
   Ayan Hussain Portfolio — script.js
   Handles: nav state, scroll reveals, data-driven sections,
   custom 3D tilt interaction, and the Three.js hero backdrop.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---------- Active nav tracking ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinksAll.forEach(a => a.classList.remove('active'));
        const target = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (target) target.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
  sections.forEach(s => navIo.observe(s));

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Scroll reveals ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Skills data ---------- */
  const skills = [
    { name: 'Premiere Pro', logo: 'assets/logos/premiere-pro.svg', size: 'lg' },
    { name: 'After Effects', logo: 'assets/logos/after-effects.svg', size: 'lg' },
    { name: 'Photoshop', logo: 'assets/logos/photoshop.svg', size: 'md' },
    { name: 'Illustrator', logo: 'assets/logos/illustrator.svg', size: 'md' },
    { name: 'Lightroom', logo: 'assets/logos/lightroom.svg', size: 'sm' },
    { name: 'InDesign', logo: 'assets/logos/indesign.svg', size: 'sm' },
    { name: 'Filmora', logo: 'assets/logos/filmora.svg', size: 'sm' },
    { name: 'Motion Graphics', logo: 'assets/logos/creative-cloud.svg', size: 'md' },
    { name: 'Video Editing', logo: 'assets/logos/davinci-resolve.svg', size: 'lg' },
    { name: 'Color Grading', logo: 'assets/logos/davinci-resolve.svg', size: 'sm' },
    { name: 'Animation', logo: 'assets/logos/blender.svg', size: 'md' },
    { name: 'UI Design', logo: 'assets/logos/figma.svg', size: 'sm' },
    { name: 'Branding', logo: 'assets/logos/cinema4d.svg', size: 'sm' },
  ];

  const skillsGrid = document.getElementById('skillsGrid');
  skills.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = `skill-card skill-card--${s.size} reveal`;
    card.style.transitionDelay = (i % 4) * 60 + 'ms';
    card.innerHTML = `
      <img src="${s.logo}" alt="${s.name}" class="skill-logo">
      <span class="skill-label">${s.name}</span>
    `;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    skillsGrid.appendChild(card);
  });

  /* ---------- Services data ---------- */
  const services = [
    { title: 'Motion Graphics', desc: 'Animated visuals that give brands rhythm, motion, and personality on screen.', icon: `<path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>`, size: 'lg' },
    { title: 'Video Editing', desc: 'Precise, story-first edits — pacing, sound design, and cuts that keep people watching.', icon: `<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M17 9l4-3v12l-4-3"/>`, size: 'md' },
    { title: 'YouTube Editing', desc: 'Retention-focused edits built for long-form and short-form channel growth.', icon: `<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>`, size: 'md' },
    { title: 'Brand Identity Videos', desc: "Cinematic brand films that turn a company's story into a visual signature.", icon: `<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>`, size: 'sm' },
    { title: 'Social Media Content', desc: 'Scroll-stopping short-form content tuned for Reels, Shorts, and TikTok.', icon: `<rect x="4" y="2" width="16" height="20" rx="3"/><path d="M9 18h6"/>`, size: 'sm' },
    { title: 'Creative Direction', desc: 'End-to-end creative oversight — concept, mood, and execution aligned to one vision.', icon: `<path d="M12 2v6M12 16v6M2 12h6M16 12h6"/><circle cx="12" cy="12" r="3"/>`, size: 'lg' },
  ];

  const servicesGrid = document.getElementById('servicesGrid');
  services.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = `service-card service-card--${s.size} reveal`;
    card.style.transitionDelay = (i % 3) * 80 + 'ms';
    card.innerHTML = `
      <div class="service-num">0${i + 1}</div>
      <div class="service-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${s.icon}</svg></div>
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
    `;
    servicesGrid.appendChild(card);
  });

  /* ---------- Projects data ---------- */
  const projects = [
    { title: 'Nova Beauty — Brand Film', cat: 'Branding & Motion', desc: "A cinematic brand story for a beauty label's flagship launch.", image: 'image for skills section/motion branding.png' },
    { title: 'Kuku FM — Trailer Series', cat: 'Video Editing', desc: 'A set of punchy podcast trailers built for social-first discovery.', image: 'image for skills section/kukutv.png' },
    { title: 'Transpixel — Product Reel', cat: 'Motion Graphics', desc: 'Kinetic product reveal animation for a commercial launch campaign.', image: 'image for skills section/motiong graphics.jpg' },
    { title: 'Wanderlust — Travel Edit', cat: 'YouTube Editing', desc: 'A long-form travel vlog edit tuned for pacing and retention.', image: 'image for skills section/video editing.jpg' },
    { title: 'Pulse Fitness — Campaign', cat: 'Social Media Content', desc: 'A short-form content series built for Reels and Shorts growth.', image: 'image for skills section/social media content.jpg' },
    { title: 'Aether — Motion Identity', cat: 'Creative Direction', desc: 'Full motion identity system for an early-stage tech brand.', image: 'image for skills section/creative direction.png' },
  ];

  const projectsTrack = document.getElementById('projectsTrack');
  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.transitionDelay = (i % 3) * 80 + 'ms';
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title}" class="project-image">
        <span class="mono">0${i + 1}</span>
      </div>
      <div class="project-body">
        <p class="project-cat">${p.cat}</p>
        <h4 class="project-title">${p.title}</h4>
        <p class="project-desc">${p.desc}</p>
        <a href="#" class="project-link">View Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    `;
    projectsTrack.appendChild(card);
  });

  /* ---------- Projects scroll nav ---------- */
  const projPrev = document.getElementById('projPrev');
  const projNext = document.getElementById('projNext');
  if (projPrev && projNext && projectsTrack) {
    const scrollAmt = 400;
    projPrev.addEventListener('click', () => projectsTrack.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
    projNext.addEventListener('click', () => projectsTrack.scrollBy({ left: scrollAmt, behavior: 'smooth' }));
  }

  /* observe dynamically-injected cards */
  document.querySelectorAll('.skill-card, .service-card, .project-card').forEach(el => {
    io.observe(el);
  });

  /* =========================================================
     3D TILT — hero profile photo
     Custom vanilla implementation (no external tilt library):
     tracks pointer position inside the frame, converts it into
     rotateX/rotateY + a moving radial glare highlight.
     ========================================================= */
  const tiltWrap = document.getElementById('tiltWrap');
  const avatarFrame = document.getElementById('avatarFrame');
  const glare = document.getElementById('avatarGlare');

  const MAX_TILT = 12;      // degrees
  const GLARE_SIZE = 140;   // % used for radial-gradient sizing feel

  function handleTiltMove(e) {
    const rect = avatarFrame.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0 -> 1
    const py = (e.clientY - rect.top) / rect.height;    // 0 -> 1

    const rotateY = (px - 0.5) * MAX_TILT * 2;
    const rotateX = (0.5 - py) * MAX_TILT * 2;

    avatarFrame.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03) translateZ(10px)`;

    glare.style.background =
      `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.35), transparent 60%)`;
  }

  function resetTilt() {
    avatarFrame.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1) translateZ(0)';
  }

  if (tiltWrap && avatarFrame) {
    tiltWrap.addEventListener('mousemove', handleTiltMove);
    tiltWrap.addEventListener('mouseleave', resetTilt);

    // gentle idle sway so the frame never feels static, even before hover
    let idle = 0;
    function idleSway() {
      idle += 0.006;
      if (!tiltWrap.matches(':hover')) {
        const ry = Math.sin(idle) * 3;
        const rx = Math.cos(idle * 0.8) * 2;
        avatarFrame.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      }
      requestAnimationFrame(idleSway);
    }
    idleSway();
  }

  /* =========================================================
     THREE.JS — ambient hero backdrop
     A sparse field of soft accent-colored points drifting behind
     the hero copy, with subtle mouse-driven parallax. Kept low
     opacity and slow so it reads as texture, not decoration.
     ========================================================= */
  (function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const heroSection = document.querySelector('.hero');
    let width = heroSection.offsetWidth;
    let height = heroSection.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // sparse point field
    const COUNT = 260;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x6C63FF,
      size: 1.4,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // a faint wireframe icosahedron as a signature ambient object
    const icoGeo = new THREE.IcosahedronGeometry(22, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x6C63FF, wireframe: true, transparent: true, opacity: 0.12 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(18, -4, -20);
    scene.add(ico);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    function resize() {
      width = heroSection.offsetWidth;
      height = heroSection.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', resize);

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0006;
      points.rotation.x += 0.0002;
      ico.rotation.y += 0.0016;
      ico.rotation.x += 0.001;

      camera.position.x += (mouseX * 8 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 8 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  })();

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) return;

      const body = `Hi Ayan,%0D%0A%0D%0AName: ${name}%0AEmail: ${email}%0A${subject ? 'Subject: ' + subject + '%0A' : ''}%0D%0AMessage:%0D%0A${message}`;
      window.location.href = `mailto:hello@ayanhussain.com?subject=${encodeURIComponent(subject || 'New inquiry from ' + name)}&body=${body}`;

      const btn = contactForm.querySelector('.btn-submit');
      btn.innerHTML = `Sent! <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = `Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>`;
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 3000);
    });
  }

});
