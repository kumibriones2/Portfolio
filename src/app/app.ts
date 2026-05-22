import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Typed: any;
declare const Swiper: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  title = 'kumi-portfolio';

  // State
  isLoading = false;
  showPreloaderDOM = false;
  sidebarOpen = false;
  showScrollTop = false;
  showPopup = false;
  activeNav = 'hero';
  activeFilter = '*';

  // Cursor
  cursorX = 0;
  cursorY = 0;
  ringX = 0;
  ringY = 0;

  // Contact Form
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  formSuccess = false;
  formLoading = false;

  // Typed instance
  private typedInstance: any = null;
  private typedStarted = false;

  // Projects
  projects = [
    {
      title: 'REITECH VA Offshoring Services',
      img: 'project_reitech.png',
      desc: 'Official website for REITECH VA Offshoring Services. Created as part of my web development work at Nola Web Solutions, this platform offers comprehensive business offshoring solutions with a premium, user-friendly interface built with high-converting layouts.',
      link: 'https://reitechva.biz/',
      category: 'ghl',
      label: 'GHL'
    },
    {
      title: 'TCAFV - Helene Cool Official Website',
      img: 'project_helene.png',
      desc: 'Developed during my OJT at Nola Web Solutions, this official website for Hélène Cool provides professional coaching resources, custom-tailored branding, and interactive services modules designed for a seamless user experience.',
      link: '',
      category: 'ghl',
      label: 'GHL'
    },
    {
      title: 'PetPro Template',
      img: 'project_petpro.png',
      desc: 'A comprehensive pet services website template built using advanced web layout frameworks during my OJT at Nola Web Solutions. It features responsive, user-friendly booking blocks, pet health profiles, and service showcases.',
      link: '',
      category: 'ghl',
      label: 'GHL'
    },
    {
      title: 'NineThreeFive Website',
      img: 'https://kumibriones.netlify.app/assets/img/projects/ninethreefive-website.png',
      desc: 'Built with HTML, CSS, JS, and Firebase, this website showcases handmade crochet bags with a clean and modern interface. It offers smooth navigation and an engaging user experience to highlight the craftsmanship behind each product.',
      link: 'https://ninethreefive.netlify.app/',
      category: 'web-dev',
      label: 'Web Dev'
    },
    {
      title: 'One Laiya Resort',
      img: 'https://kumibriones.netlify.app/assets/img/projects/one-laiya-website.png',
      desc: 'A WordPress-based website designed for a beach resort, featuring a fully responsive layout, intuitive navigation, and an integrated booking system optimized for both desktop and mobile users.',
      link: 'https://onelaiyaresort.com/',
      category: 'cms',
      label: 'CMS'
    },
    {
      title: 'Sweet Side Website',
      img: 'https://kumibriones.netlify.app/assets/img/projects/sweet-side-website.png',
      desc: 'Developed with HTML, CSS, and JS, this bakery website beautifully presents Sweet Side\'s selection of pastries, cakes, and Filipino delicacies with an elegant and user-friendly design.',
      link: 'https://thesweetside.netlify.app/',
      category: 'web-dev',
      label: 'Web Dev'
    },
    {
      title: 'Pawtect Website',
      img: 'https://kumibriones.netlify.app/assets/img/projects/Pawtect-website.png',
      desc: 'Developed using the MEAN stack, this website is dedicated to animal advocacy, providing resources, adoption opportunities, and awareness campaigns to support animal welfare.',
      link: 'https://pawtechph.netlify.app/',
      category: 'web-dev',
      label: 'Web Dev'
    },
    {
      title: 'Savoria Restaurant',
      img: 'https://kumibriones.netlify.app/assets/img/projects/savoria.png',
      desc: 'Built with Vue.js, this restaurant website offers an intuitive and interactive experience, showcasing a diverse menu, online reservations, and customer reviews for an engaging dining experience.',
      link: 'https://savoria.netlify.app/',
      category: 'web-dev',
      label: 'Web Dev'
    }
  ];

  // Certificates
  certificates = [
    {
      img: 'https://kumibriones.netlify.app/assets/img/certification/free_code_camp.png',
      link: 'https://www.freecodecamp.org/certification/AlyannaCyrelleKumiBriones/responsive-web-design',
      alt: 'FreeCodeCamp Responsive Web Design'
    },
    {
      img: 'https://kumibriones.netlify.app/assets/img/certification/free_code_camp_data.png',
      link: 'https://www.freecodecamp.org/certification/AlyannaCyrelleKumiBriones/javascript-algorithms-and-data-structures',
      alt: 'FreeCodeCamp JavaScript Algorithms'
    },
    {
      img: 'https://kumibriones.netlify.app/assets/img/certification/CCNA-Introduction.png',
      link: 'https://www.credly.com/earner/earned/share/1c100ee6-fb20-45e1-94a7-c3879aafb679',
      alt: 'CCNA Introduction'
    },
    {
      img: 'https://kumibriones.netlify.app/assets/img/certification/cyber-threat-management.png',
      link: 'https://www.credly.com/earner/earned/share/18a07532-1d49-4bad-9fbe-7b94b3737336',
      alt: 'Cyber Threat Management'
    },
    {
      img: 'https://kumibriones.netlify.app/assets/img/certification/seo-1.png',
      link: 'https://app.hubspot.com/academy/achievements/kkj32hzg/en/1/kumi-briones/seo',
      alt: 'HubSpot SEO I'
    },
    {
      img: 'https://kumibriones.netlify.app/assets/img/certification/seo-2.png',
      link: 'https://app.hubspot.com/academy/achievements/060927js/en/1/alyanna-cyrelle-kumi-briones/seo-ii',
      alt: 'HubSpot SEO II'
    },
    {
      img: 'https://kumibriones.netlify.app/assets/img/certification/google-analytics.png',
      link: 'https://skillshop.credential.net/a7c80415-dba5-4bd2-96ed-44a30d61e6cf#acc.JNDVCX4s',
      alt: 'Google Analytics'
    }
  ];

  // Testimonials
  testimonials = [
    {
      quote: '"Our family reunion shirts turned out amazing! They created a meaningful and stylish design that captured the spirit of our gathering."',
      img: 'https://kumibriones.netlify.app/assets/img/testimonial/lyn.jpg',
      name: 'Cherrylyn Evangelista',
      role: 'Family Representative'
    },
    {
      quote: '"She is a hardworking and reliable web development student. She picks up new concepts quickly and puts real effort into making her projects both functional and user-friendly. I\'m confident she\'ll do well in any future role she takes on."',
      img: 'https://kumibriones.netlify.app/assets/img/testimonial/sir-jo.jpg',
      name: 'Joseph Esquivel',
      role: 'Professor'
    },
    {
      quote: '"Kumi exceeded my expectations! The design was clean, responsive, and easy to work with, making my project development smoother."',
      img: 'https://kumibriones.netlify.app/assets/img/testimonial/rainier.jpg',
      name: 'Rainier Galicio',
      role: 'Student'
    },
    {
      quote: '"Working with Kumi was a great experience! The design is beautiful, professional, and perfectly represents Sweet Bites by Hannah!"',
      img: 'https://kumibriones.netlify.app/assets/img/testimonial/mariles.jpg',
      name: 'Mariles Alabaso',
      role: 'Home-Based Baker'
    }
  ];

  // Timeline
  timeline = [
    {
      year: '2015-2016',
      title: 'Grade 6 – Discovering My Passion',
      desc: 'My very first encounter with technology and computing in elementary school, which sparked a deep curiosity.'
    },
    {
      year: '2016-2020',
      title: 'High School – ICT Specialization',
      desc: 'Studied at an ICT-focused high school, deepening my interest in computers and laying a solid foundation for my tech journey.'
    },
    {
      year: '2022',
      title: 'Enrolled in BS IT',
      desc: 'Officially started my academic journey in Information Technology, specializing in Web Development.'
    },
    {
      year: '2022',
      title: 'First Web Project',
      desc: 'Built my first complete website and realized the power of bringing ideas to life on the web.'
    },
    {
      year: '2023',
      title: 'Diving into Frameworks',
      desc: 'Explored Angular, Vue.js, and the MEAN stack, leveling up my development skills significantly.'
    },
    {
      year: '2026',
      title: 'College Graduation & Career Launch',
      desc: 'Successfully graduated with a BS in IT specializing in Web Development, completing OJT and part-time work at Nola Web Solutions.'
    }
  ];

  // Grid photo placeholders
  gridItems = [
    { emoji: '💻', label: 'Coding' },
    { emoji: '🎨', label: 'Design' },
    { emoji: '🌸', label: 'Aesthetic' },
    { emoji: '🎮', label: 'Gaming' },
    { emoji: '👤', label: 'About Me', isPopup: true },
    { emoji: '📚', label: 'Reading' },
    { emoji: '🌟', label: 'Dreams' },
    { emoji: '☕', label: 'Coffee' },
    { emoji: '🐕', label: 'Dogs' }
  ];

  get filteredProjects() {
    if (this.activeFilter === '*') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter);
  }



  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = window.scrollY > 300;
    this.updateActiveNav();
  }

  updateActiveNav() {
    const sections = ['hero', 'about', 'portfolio', 'contact'];
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) {
        this.activeNav = id;
        break;
      }
    }
  }

  ngOnInit() {
    this.initTyped();
  }

  ngAfterViewInit() {
    setTimeout(() => this.initSwipers(), 2500);
    this.initSmoothCursor();
  }

  initSmoothCursor() {
    const dot = document.querySelector('.cursor-dot') as HTMLElement;
    const ring = document.querySelector('.cursor-ring') as HTMLElement;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      // Interpolate dot position (fast)
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      // Interpolate ring position (slower with spring effect)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      requestAnimationFrame(animate);
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Start animation loop
    animate();
  }

  initTyped() {
    if (this.typedStarted) return;
    const el = document.querySelector('.typed-text');
    if (el && typeof Typed !== 'undefined') {
      this.typedInstance = new Typed('.typed-text', {
        strings: ['Developer', 'Designer', 'Freelancer'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true
      });
      this.typedStarted = true;
    } else {
      setTimeout(() => this.initTyped(), 500);
    }
  }

  initSwipers() {
    if (typeof Swiper === 'undefined') {
      setTimeout(() => this.initSwipers(), 500);
      return;
    }

    new Swiper('.cert-swiper', {
      loop: true,
      speed: 600,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.cert-pagination', clickable: true },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      }
    });

    new Swiper('.testimonials-swiper', {
      loop: true,
      speed: 600,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.testimonials-pagination', clickable: true },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 25 }
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.activeNav = sectionId;
    }
    this.closeSidebar();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  onGridItemClick(item: any) {
    if (item.isPopup) this.openPopup();
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.formLoading = true;
    setTimeout(() => {
      this.formLoading = false;
      this.formSuccess = true;
      this.contactForm = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => this.formSuccess = false, 5000);
    }, 1500);
  }

  ngOnDestroy() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }
}
