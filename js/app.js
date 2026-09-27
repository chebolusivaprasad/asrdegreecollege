/**
 * ASR DEGREE COLLEGE — MASTER CLIENT-READY UI/UX & MOTION ENGINE
 * Pure Vanilla JavaScript (Zero build step, 100% static hosting compatible)
 * Authored to 2026 Higher-Education Design & Motion Standards
 */

document.addEventListener('DOMContentLoaded', () => {

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  // =========================================================================
  // 1. Top Scroll Progress Indicator (0% to 100%)
  // =========================================================================
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const updateScrollProgress = () => {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${scrollPercent}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // =========================================================================
  // 2. Logo Animation & Intro Sequence (Single time only on first site visit)
  // =========================================================================
  const alreadyVisited = sessionStorage.getItem('asr_welcomed');
  let welcomeOverlay = document.getElementById('welcomeOverlay');

  if (alreadyVisited) {
    if (welcomeOverlay) {
      welcomeOverlay.remove();
    }
  } else {
    // First time visit: record in sessionStorage so it never repeats
    sessionStorage.setItem('asr_welcomed', '1');

    if (!welcomeOverlay && !isReducedMotion) {
      const isSubpage = window.location.pathname.includes('/pages/');
      const logoSrc = isSubpage ? '../asr-logo.svg' : 'asr-logo.svg';
      welcomeOverlay = document.createElement('div');
      welcomeOverlay.id = 'welcomeOverlay';
      welcomeOverlay.className = 'welcome-overlay';
      welcomeOverlay.innerHTML = `
        <div class="welcome-geo-grid"></div>
        <div class="welcome-triangle-accent"></div>
        <div class="welcome-stage">
          <img src="${logoSrc}" alt="ASR Degree College Logo" class="welcome-logo" />
          <div class="welcome-line-draw"></div>
          <div class="welcome-title">ASR DEGREE COLLEGE</div>
          <div class="welcome-subtitle">ATMAKUR · SPSR NELLORE · AFFILIATED TO VSU</div>
          <div class="welcome-phrase">"Where Knowledge Meets Opportunity"</div>
        </div>
      `;
      document.body.prepend(welcomeOverlay);
    }

    if (welcomeOverlay) {
      // Gracefully dismiss after animation completes (~1100ms)
      setTimeout(() => {
        welcomeOverlay.classList.add('fade-out');
        setTimeout(() => {
          welcomeOverlay.remove();
        }, 600);
      }, 1100);
    }
  }

  // =========================================================================
  // 3. Desktop Header Scroll Dynamics & Back-to-Top Button
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 25);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('show', scrollY > 320);
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================================================================
  // 4. Custom Precision Cursor (Physics Interpolation, Desktop Only)
  // =========================================================================
  if (!isTouchDevice && !isReducedMotion) {
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'custom-cursor';
    cursorContainer.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring">
        <span class="cursor-badge"></span>
      </div>
    `;
    document.body.appendChild(cursorContainer);

    const cursorDot = cursorContainer.querySelector('.cursor-dot');
    const cursorRing = cursorContainer.querySelector('.cursor-ring');
    const cursorBadge = cursorContainer.querySelector('.cursor-badge');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursorContainer.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorContainer.style.opacity = '0';
      isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
      cursorContainer.style.opacity = '1';
      isVisible = true;
    });

    const renderCursorPhysics = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursorPhysics);
    };
    requestAnimationFrame(renderCursorPhysics);

    // Contextual Hover States
    const setCursorState = (stateClass, badgeText = '') => {
      cursorContainer.className = `custom-cursor ${stateClass}`;
      cursorBadge.textContent = badgeText;
    };

    const resetCursorState = () => {
      cursorContainer.className = 'custom-cursor';
      cursorBadge.textContent = '';
    };

    // Attach contextual hover listeners
    document.querySelectorAll('button, .btn, .nav-link, .quick-nav-link, .search-trigger, .menu-toggle').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('state-hover-btn'));
      el.addEventListener('mouseleave', resetCursorState);
    });

    document.querySelectorAll('.programme-interactive-row, .album-link-card, [data-cursor="explore"]').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('state-action', 'EXPLORE'));
      el.addEventListener('mouseleave', resetCursorState);
    });

    document.querySelectorAll('.facility-card, .about-flow-image-wrap, [data-cursor="view"]').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('state-action', 'VIEW'));
      el.addEventListener('mouseleave', resetCursorState);
    });

    document.querySelectorAll('.gallery-card, [data-cursor="open"]').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('state-action', 'OPEN'));
      el.addEventListener('mouseleave', resetCursorState);
    });

    document.querySelectorAll('.btn-crimson, .apply-action, [data-cursor="apply"]').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('state-action', 'APPLY'));
      el.addEventListener('mouseleave', resetCursorState);
    });

    document.querySelectorAll('a:not(.btn):not(.nav-link)').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('state-link'));
      el.addEventListener('mouseleave', resetCursorState);
    });
  }

  // =========================================================================
  // 5. Mobile Drawer Navigation
  // =========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileClose = document.querySelector('.mobile-close');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.classList.add('nav-open');
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  }

  document.querySelectorAll('.mobile-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });

  // =========================================================================
  // 6. Interactive Signature Infrastructure Hotspot Explorer
  // =========================================================================
  const hotspotWrap = document.querySelector('.hotspot-viewer-wrap');
  const hotspotViewerImage = document.querySelector('.hotspot-viewer-image');
  const hotspotPins = document.querySelectorAll('.hotspot-pin');
  const hotspotInfoPanel = document.querySelector('.hotspot-info-panel');
  const hotspotCloseBtn = document.querySelector('.hotspot-close-btn');

  const hotspotData = {
    'labs': {
      title: 'High-Tech Air-Conditioned Computer Labs',
      copy: 'Two modern labs housing 120+ Intel Core i5/i7 workstations with gigabit optical fiber, dual monitors, and licensed Python, Java, and AI toolchains.',
      image: 'https://images.pexels.com/photos/5530437/pexels-photo-5530437.jpeg?auto=compress&cs=tinysrgb&w=1400',
      badge: '120+ Workstations'
    },
    'library': {
      title: 'Central Digital Library & Reading Zone',
      copy: 'Houses 5,000+ volumes, international research journals, DELNET e-resources, and quiet study carrels dedicated to competitive exam prep.',
      image: 'https://images.pexels.com/photos/8199762/pexels-photo-8199762.jpeg?auto=compress&cs=tinysrgb&w=1400',
      badge: '5,000+ Volumes'
    },
    'classrooms': {
      title: 'Smart Digital Classrooms',
      copy: 'Acoustically balanced lecture spaces with multimedia digital projectors, high ventilation, and ergonomic seating.',
      image: 'https://images.pexels.com/photos/8197508/pexels-photo-8197508.jpeg?auto=compress&cs=tinysrgb&w=1400',
      badge: 'Smart AV Ready'
    },
    'hostel': {
      title: 'Dedicated On-Campus Girls Hostel',
      copy: 'Safe, gated accommodation with 24/7 CCTV surveillance, resident warden, pure RO water, hygienic steam mess, and mandatory evening study hours.',
      image: 'https://images.pexels.com/photos/20200756/pexels-photo-20200756.jpeg?auto=compress&cs=tinysrgb&w=1400',
      badge: 'Safe & Gated'
    },
    'bus': {
      title: 'Extensive College Bus Transport Network',
      copy: 'Punctual, safe bus fleet connecting Atmakur to Marripadu, Rapur, Kaluvoya, Ananthasagaram, Badvel, and surrounding rural mandals.',
      image: 'https://images.pexels.com/photos/20200756/pexels-photo-20200756.jpeg?auto=compress&cs=tinysrgb&w=1400',
      badge: '6+ Mandals Connected'
    },
    'sports': {
      title: 'Sports Grounds & Fitness Facilities',
      copy: 'Cricket pitch, volleyball court, badminton nets, and indoor sports room for chess and table tennis fostering teamwork.',
      image: 'https://images.pexels.com/photos/37623643/pexels-photo-37623643.jpeg?auto=compress&cs=tinysrgb&w=1400',
      badge: 'Annual Sports Meet'
    }
  };

  if (hotspotPins.length > 0 && hotspotWrap) {
    hotspotPins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const facilityKey = pin.dataset.facility;
        const info = hotspotData[facilityKey];
        if (info && hotspotInfoPanel && hotspotViewerImage) {
          hotspotWrap.classList.add('zoomed');
          hotspotViewerImage.src = info.image;
          hotspotInfoPanel.querySelector('.hotspot-title').textContent = info.title;
          hotspotInfoPanel.querySelector('.hotspot-copy').textContent = info.copy;
          hotspotInfoPanel.querySelector('.hotspot-badge').textContent = info.badge;
          hotspotInfoPanel.classList.add('active');
        }
      });
    });

    const closeHotspot = () => {
      hotspotWrap.classList.remove('zoomed');
      hotspotInfoPanel?.classList.remove('active');
    };

    hotspotCloseBtn?.addEventListener('click', closeHotspot);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeHotspot();
    });
  }

  // =========================================================================
  // 7. Interactive Department Explorer (Left List Tabs + Right Image Crossfade)
  // =========================================================================
  const deptTabs = document.querySelectorAll('.dept-tab-item');
  const deptPreviewImage = document.querySelector('.dept-preview-image');
  const deptPreviewTitle = document.querySelector('.dept-preview-title');
  const deptPreviewBadge = document.querySelector('.dept-preview-badge');

  if (deptTabs.length > 0 && deptPreviewImage) {
    deptTabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        deptTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const imgSrc = tab.dataset.image;
        const titleText = tab.dataset.title;
        const badgeText = tab.dataset.badge;

        deptPreviewImage.style.opacity = '0.4';
        setTimeout(() => {
          if (imgSrc) deptPreviewImage.src = imgSrc;
          if (titleText && deptPreviewTitle) deptPreviewTitle.textContent = titleText;
          if (badgeText && deptPreviewBadge) deptPreviewBadge.textContent = badgeText;
          deptPreviewImage.style.opacity = '1';
        }, 150);
      });
    });
  }

  // =========================================================================
  // 8. FAQ Accordion Interaction
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-question-btn');
      trigger?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close other items
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // =========================================================================
  // 9. Numerical Stat Counter Animation (High-Precision Cubic Easing)
  // =========================================================================
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const targetStr = counter.dataset.count;
          const target = parseFloat(targetStr) || 0;
          const isDecimal = targetStr.includes('.');
          const prefix = counter.dataset.prefix || '';
          const suffix = counter.dataset.suffix || '';
          const duration = 1400; // ms
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOut;

            if (isDecimal) {
              counter.textContent = prefix + currentVal.toFixed(1) + suffix;
            } else {
              counter.textContent = prefix + Math.floor(currentVal) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = prefix + target + suffix;
            }
          };

          requestAnimationFrame(updateCount);
          countObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(c => countObserver.observe(c));
  }

  // =========================================================================
  // 10. Scroll Reveals & Geometry Lines
  // =========================================================================
  const reveals = document.querySelectorAll('.reveal, .stagger, .clip-reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // =========================================================================
  // 11. Global Search Modal Index
  // =========================================================================
  const searchTriggers = document.querySelectorAll('.search-trigger');
  const searchModal = document.querySelector('.search-modal');
  const searchClose = document.querySelector('.search-close-btn');
  const searchInput = document.querySelector('.search-modal-input');
  const searchResults = document.querySelector('.search-modal-results');

  const siteSearchIndex = [
    { title: 'BCA (Bachelor of Computer Applications)', cat: 'Course', link: 'courses.html', sub: 'Programming, Data Structures, Python, Full Stack' },
    { title: 'BCA - Artificial Intelligence (AI)', cat: 'Course', link: 'courses.html', sub: 'Machine Learning, Neural Networks, Computer Vision' },
    { title: 'BCA - Data Science (DS)', cat: 'Course', link: 'courses.html', sub: 'Data Analytics, SQL, Big Data, Statistics' },
    { title: 'BBA - Business Analytics (BA)', cat: 'Course', link: 'courses.html', sub: 'Management, Business Intelligence, Digital Marketing' },
    { title: 'B.Sc - Computer Science (CS)', cat: 'Course', link: 'courses.html', sub: 'Computer Theory, Algorithms, Science Route' },
    { title: 'B.Sc - Food Science & Technology (FST)', cat: 'Course', link: 'courses.html', sub: 'Food Processing, Microbiology, Quality Control' },
    { title: 'B.Com - Computer Applications (CA)', cat: 'Course', link: 'courses.html', sub: 'Commerce, Tally, GST, Modern Accounting' },
    { title: 'Admissions 2026–27', cat: 'Admissions', link: 'admissions.html', sub: 'Eligibility, application process, JVD fee reimbursement' },
    { title: 'Placements & Career Cell', cat: 'Careers', link: 'placements.html', sub: 'Highest package 6.5 LPA, 40+ recruiters: TCS, Wipro, Infosys' },
    { title: 'Campus Infrastructure & Facilities', cat: 'Campus', link: 'infrastructure.html', sub: 'Computer labs, Girls hostel, College buses, Digital library' },
    { title: 'Faculty & Academic Team', cat: 'Academics', link: 'faculty.html', sub: 'Experienced HODs, Ph.D. scholars, and senior faculty' },
    { title: 'Administration & Leadership', cat: 'About', link: 'administration.html', sub: 'Chairman Desk, Principal Message, VSU Affiliation' },
    { title: 'Downloads & Prospectus', cat: 'Resources', link: 'downloads.html', sub: 'Application form, Syllabus PDF, Academic calendar' },
    { title: 'Contact & Campus Visit', cat: 'Contact', link: 'contact.html', sub: 'Atmakur address, Phone numbers, Google map directions' },
  ];

  if (searchTriggers.length > 0 && searchModal) {
    searchTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        searchModal.classList.add('open');
        setTimeout(() => searchInput?.focus(), 100);
      });
    });

    searchClose?.addEventListener('click', () => searchModal.classList.remove('open'));
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('open');
    });

    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '';
        return;
      }
      const isSubpage = window.location.pathname.includes('/pages/');
      const prefix = isSubpage ? '' : 'pages/';

      const matches = siteSearchIndex.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.sub.toLowerCase().includes(q) || 
        item.cat.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:20px;">No matching results found.</p>';
      } else {
        searchResults.innerHTML = matches.slice(0, 7).map(item => `
          <a class="search-result-item" href="${prefix}${item.link}">
            <strong>${item.title} <small style="color:#fbbf24; font-size:11px; margin-left:8px;">[${item.cat}]</small></strong>
            <span>${item.sub}</span>
          </a>
        `).join('');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('open')) {
        searchModal.classList.remove('open');
      }
    });
  }

  // =========================================================================
  // 12. Working Admissions Enquiry Generator (With Direct WhatsApp Link)
  // =========================================================================
  const enquiryForm = document.querySelector('#admissionsForm, #contactForm, .lead-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = enquiryForm.querySelector('[name="student_name"]')?.value || 'Student';
      const phone = enquiryForm.querySelector('[name="student_phone"]')?.value || '';
      const course = enquiryForm.querySelector('[name="student_course"]')?.value || 'Degree Course';
      const message = enquiryForm.querySelector('[name="student_message"]')?.value || 'I am interested in admission for 2026-27.';

      const cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      // Save lead locally
      const lead = { name, phone: cleanPhone, course, message, timestamp: new Date().toISOString() };
      try {
        const existing = JSON.parse(localStorage.getItem('asr_leads') || '[]');
        existing.push(lead);
        localStorage.setItem('asr_leads', JSON.stringify(existing));
      } catch (err) {
        console.warn('Storage warning', err);
      }

      // Pre-fill WhatsApp message directly to admissions officer
      const waText = encodeURIComponent(`Hello Admissions Team, ASR Degree College,\n\nName: ${name}\nPhone: ${cleanPhone}\nInterested Course: ${course}\nQuery: ${message}\n\nPlease share admissions details and fee structure for 2026-27.`);
      const waUrl = `https://wa.me/919866196838?text=${waText}`;

      const feedback = enquiryForm.querySelector('.form-feedback');
      if (feedback) {
        feedback.innerHTML = `
          <strong>✓ Thank you, ${name}! Your enquiry has been registered.</strong>
          <p style="margin: 6px 0 10px; font-size: 13px;">Our admissions officer will contact you at <strong>${cleanPhone}</strong>. To chat immediately, click below:</p>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-direct-btn">
            Open WhatsApp Chat with Admissions Desk ↗
          </a>
        `;
        feedback.className = 'form-feedback success';
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      enquiryForm.reset();
    });
  }

  // =========================================================================
  // 13. Universal In-Page Category & Keyword Filter Bar
  // =========================================================================
  const filterBars = document.querySelectorAll('.filter-bar');
  filterBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.filter-btn');
    const searchInput = bar.querySelector('.inpage-search');
    const container = bar.closest('.container') || bar.parentElement;
    const items = container.querySelectorAll('.filterable-item, .gallery-card, .faculty-card, .course-card, .notice-row');

    function applyFilter() {
      const activeBtn = bar.querySelector('.filter-btn.active');
      const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      items.forEach(item => {
        const cat = (item.getAttribute('data-category') || '').toLowerCase();
        const text = item.textContent.toLowerCase();

        const matchesCat = (filter === 'all' || cat.includes(filter.toLowerCase()));
        const matchesQuery = (!query || text.includes(query));

        if (matchesCat && matchesQuery) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
    }
  });

});
