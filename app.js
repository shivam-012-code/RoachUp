/**
 * RoachUp - Main Application Engine & Session State Manager
 */

// Initial Seed Data
const DEFAULT_STUDENTS = [
  {
    id: "std-101",
    name: "Rohan Sharma",
    email: "rohan.s@du.ac.in",
    phone: "9876543210",
    college: "Delhi University (North Campus)",
    location: "New Delhi, Delhi",
    rating: 4.9,
    reviewsCount: 14,
    walletBalance: 4250,
    feeStatus: "Paid ₹299",
    idStatus: "Approved",
    idCardUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60",
    txnId: "TXN-ROACH-89201",
    joinedDate: "15 Aug 2026",
    appliedGigs: ["gig-201"]
  },
  {
    id: "std-102",
    name: "Ananya Patel",
    email: "ananya@iitb.ac.in",
    phone: "9812345678",
    college: "IIT Bombay",
    location: "Powai, Mumbai",
    rating: 4.8,
    reviewsCount: 9,
    walletBalance: 2800,
    feeStatus: "Paid ₹299",
    idStatus: "Approved",
    idCardUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60",
    txnId: "TXN-ROACH-77412",
    joinedDate: "16 Aug 2026",
    appliedGigs: ["gig-202"]
  },
  {
    id: "std-103",
    name: "Karthik Raja",
    email: "karthik@christuniversity.in",
    phone: "9765432109",
    college: "Christ University",
    location: "Hosur Road, Bangalore",
    rating: 4.7,
    reviewsCount: 6,
    walletBalance: 1500,
    feeStatus: "Paid ₹299",
    idStatus: "Pending",
    idCardUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
    txnId: "TXN-ROACH-66311",
    joinedDate: "18 Aug 2026",
    appliedGigs: []
  }
];

const DEFAULT_CUSTOMERS = [
  {
    id: "cust-501",
    name: "Vikram Mehta",
    company: "Apex Events & Media",
    email: "vikram@apexevents.com",
    phone: "9899001122",
    location: "South Delhi",
    rating: 4.8
  },
  {
    id: "cust-502",
    name: "Priya Nair",
    company: "TechCampus India",
    email: "priya@techcampus.in",
    phone: "9877112233",
    location: "Koramangala, Bangalore",
    rating: 4.9
  }
];

const DEFAULT_GIGS = [
  {
    id: "gig-201",
    title: "Campus Music Fest Event Operations Manager",
    category: "Event Staff",
    employerId: "cust-501",
    employerName: "Apex Events & Media",
    employerRating: 4.8,
    location: "Delhi University, North Campus",
    pay: 1200,
    hours: "6 Hours (Weekend)",
    description: "Manage guest check-ins, VIP ushering, and stage logistics for campus music fest.",
    status: "Active",
    applicants: ["std-101"]
  },
  {
    id: "gig-202",
    title: "Brand Ambassador for Youth Fintech App",
    category: "Campus Ambassador",
    employerId: "cust-502",
    employerName: "TechCampus India",
    employerRating: 4.9,
    location: "IIT Bombay & Nearby Colleges",
    pay: 1800,
    hours: "Flexible 10 Hrs / Week",
    description: "Promote student savings app on campus, organize workshop, and onboard student users.",
    status: "Active",
    applicants: ["std-102"]
  },
  {
    id: "gig-203",
    title: "Social Media Reel Creator & Graphic Assistant",
    category: "Content & Marketing",
    employerId: "cust-501",
    employerName: "Apex Events & Media",
    employerRating: 4.8,
    location: "Remote / Work from Campus",
    pay: 900,
    hours: "4 Hours / Project",
    description: "Create 3 engaging Instagram reels and posters showcasing student life & event highlights.",
    status: "Active",
    applicants: []
  },
  {
    id: "gig-204",
    title: "Academic Survey & Market Data Collector",
    category: "Research & Survey",
    employerId: "cust-502",
    employerName: "TechCampus India",
    employerRating: 4.9,
    location: "Bangalore University Hub",
    pay: 750,
    hours: "3 Hours",
    description: "Collect 50 filled survey forms from college students regarding career preferences.",
    status: "Active",
    applicants: []
  },
  {
    id: "gig-301",
    title: "⚡ 30-Min Fast Campus Flyer Distribution",
    category: "Quick Task",
    isQuickTask: true,
    employerId: "cust-501",
    employerName: "Apex Events & Media",
    employerRating: 4.8,
    location: "DU North Campus Metro Gate",
    pay: 350,
    hours: "30 Mins",
    description: "Distribute 40 concert flyers to students near metro gate. Takes 30 mins, fast payout!",
    status: "Active",
    applicants: []
  },
  {
    id: "gig-302",
    title: "⚡ 30-Min App Feedback & User Testing",
    category: "Quick Task",
    isQuickTask: true,
    employerId: "cust-502",
    employerName: "TechCampus India",
    employerRating: 4.9,
    location: "Remote / Online Task",
    pay: 250,
    hours: "30 Mins",
    description: "Test a new student savings UI and record a 3-minute video feedback. Instant payout!",
    status: "Active",
    applicants: []
  },
  {
    id: "gig-303",
    title: "⚡ 40-Min Seminar Hall Desk Setup",
    category: "Quick Task",
    isQuickTask: true,
    employerId: "cust-501",
    employerName: "Apex Events & Media",
    employerRating: 4.8,
    location: "IIT Bombay Auditorium",
    pay: 450,
    hours: "40 Mins",
    description: "Help arrange 2 banner standees and QR code cards before guest seminar starts.",
    status: "Active",
    applicants: []
  }
];

const DEFAULT_REVENUE_LEDGER = [
  { txnId: "TXN-ROACH-89201", studentName: "Rohan Sharma", contact: "9876543210", amount: 299, method: "UPI GPay", date: "15 Aug 2026, 14:20" },
  { txnId: "TXN-ROACH-77412", studentName: "Ananya Patel", contact: "9812345678", amount: 299, method: "PhonePe UPI", date: "16 Aug 2026, 11:45" },
  { txnId: "TXN-ROACH-66311", studentName: "Karthik Raja", contact: "9765432109", amount: 299, method: "Debit Card", date: "18 Aug 2026, 19:10" }
];

const DEFAULT_FOUNDER_INFO = {
  name: "Shivam Kumar",
  role: "Founder & Chief Executive Officer",
  email: "shivam012@gmail.com",
  bio: "Shivam is a passionate student entrepreneur who recognized the challenge students face in balancing academics with income generation. Under his leadership, RoachUp has grown into a trusted network connecting over 2,400 verified students with local and remote micro-tasks.",
  vision: "RoachUp was founded with a clear mission: to enable college and university students to achieve financial independence, build professional experience, and land flexible part-time tasks while studying."
};

const DEFAULT_FEEDBACKS = [
  { name: "Vikram Mehta", email: "vikram@apexevents.com", rating: "5", text: "RoachUp made hiring campus event coordinators incredibly fast and seamless!", date: "18 Aug 2026" }
];

class RoachUpApp {
  constructor() {
    this.students = this.loadStorage('roachup_students', DEFAULT_STUDENTS);
    this.customers = this.loadStorage('roachup_customers', DEFAULT_CUSTOMERS);
    this.gigs = this.loadStorage('roachup_gigs', DEFAULT_GIGS);
    this.revenueLedger = this.loadStorage('roachup_revenue', DEFAULT_REVENUE_LEDGER);
    this.founderInfo = this.loadStorage('roachup_founder_info', DEFAULT_FOUNDER_INFO);
    this.feedbacks = this.loadStorage('roachup_feedbacks', DEFAULT_FEEDBACKS);
    this.session = this.loadStorage('roachup_session', null);

    // Registration Form Temp State
    this.registrationDraft = null;
    this.activeSelectedPayMethod = 'upi';
    this.selectedAdminStudentId = null;
    this.ratingTarget = null;
    this.selectedRatingStars = 5;

    this.init();
  }

  init() {
    this.renderLandingGigs();
    this.renderQuickTasks();
    this.renderTopStudents();
    this.renderAboutPage();
    this.updateGlobalCounters();
    this.checkSessionAndRenderNav();
  }

  // Password Visibility Toggle Feature
  togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      btn.innerHTML = `<i data-lucide="eye-off"></i>`;
    } else {
      input.type = 'password';
      btn.innerHTML = `<i data-lucide="eye"></i>`;
    }
    if (window.lucide) lucide.createIcons();
  }

  // LocalStorage Helpers
  loadStorage(key, defaultVal) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultVal;
    } catch(e) {
      return defaultVal;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch(e) {
      console.error(e);
    }
  }

  // Toast System
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✔' : 'ℹ'}</span>
      <div>${message}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  // View Navigation
  showView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Refresh view specific data
    if (viewId === 'landing-view') {
      this.renderLandingGigs();
      this.renderQuickTasks();
      this.renderTopStudents();
      this.updateGlobalCounters();
    } else if (viewId === 'about-view') {
      this.renderAboutPage();
    } else if (viewId === 'student-dashboard-view') {
      this.renderStudentDashboard();
    } else if (viewId === 'customer-dashboard-view') {
      this.renderCustomerDashboard();
    } else if (viewId === 'admin-dashboard-view') {
      this.renderAdminDashboard();
    }

    if (window.lucide) lucide.createIcons();
  }

  showRoleModal() {
    this.showView('landing-view');
    const rolesSection = document.querySelector('.roles-grid');
    if (rolesSection) {
      rolesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToGigs() {
    if (this.session && this.session.role === 'student') {
      this.showView('student-dashboard-view');
    } else {
      this.showView('landing-view');
      const feed = document.getElementById('landing-gigs-container');
      if (feed) feed.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Session & Nav Bar State
  checkSessionAndRenderNav() {
    const guestNav = document.getElementById('nav-guest-actions');
    const userNav = document.getElementById('nav-user-actions');

    if (this.session && this.session.currentUser) {
      guestNav.style.display = 'none';
      userNav.style.display = 'flex';

      const u = this.session.currentUser;
      document.getElementById('user-display-name').textContent = u.name;
      document.getElementById('user-display-role').textContent = this.session.role === 'customer' ? 'Consumer' : (this.session.role === 'admin' ? 'Admin' : 'Student');
      document.getElementById('user-avatar-text').textContent = u.name.charAt(0).toUpperCase();
    } else {
      guestNav.style.display = 'flex';
      userNav.style.display = 'none';
    }
  }

  goToActiveDashboard() {
    if (!this.session) return;
    if (this.session.role === 'student') this.showView('student-dashboard-view');
    else if (this.session.role === 'customer') this.showView('customer-dashboard-view');
    else if (this.session.role === 'admin') this.showView('admin-dashboard-view');
    else this.showView('college-view');
  }

  // LOGOUT CONFIRMATION DIALOG
  promptLogout() {
    this.openModal('logout-confirm-modal');
  }

  confirmLogout() {
    this.closeModal('logout-confirm-modal');
    this.session = null;
    localStorage.removeItem('roachup_session');
    this.checkSessionAndRenderNav();
    this.showToast('You have been logged out of RoachUp successfully', 'info');
    this.showView('landing-view');
  }

  // ABOUT US PAGE RENDERER
  renderAboutPage() {
    const f = this.founderInfo;
    const elName = document.getElementById('about-founder-name');
    const elRole = document.getElementById('about-founder-role');
    const elBio = document.getElementById('about-founder-bio');
    const elEmail = document.getElementById('about-founder-email');
    const elVision = document.getElementById('about-platform-vision');
    const elAvatar = document.getElementById('about-founder-avatar');

    if (elName) elName.textContent = f.name;
    if (elRole) elRole.textContent = f.role;
    if (elBio) elBio.textContent = f.bio;
    if (elEmail) elEmail.textContent = f.email;
    if (elVision) elVision.textContent = f.vision;
    if (elAvatar && f.name) elAvatar.textContent = f.name.charAt(0).toUpperCase();
  }

  saveFounderInfo(e) {
    e.preventDefault();
    this.founderInfo = {
      name: document.getElementById('edit-founder-name').value,
      role: document.getElementById('edit-founder-role').value,
      email: document.getElementById('edit-founder-email').value,
      bio: document.getElementById('edit-founder-bio').value,
      vision: document.getElementById('edit-founder-vision').value
    };

    this.saveStorage('roachup_founder_info', this.founderInfo);
    this.renderAboutPage();
    this.showToast('Founder & About details updated live on website!', 'success');
  }

  // FORGOT PASSWORD
  handleForgotPasswordSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('forgot-user-email').value;
    this.closeModal('forgot-pass-modal');
    this.showToast(`Password reset link sent directly to ${email}!`, 'success');
  }

  // CONSUMER FEEDBACK FORM
  handleConsumerFeedbackSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('feedback-cust-name').value;
    const email = document.getElementById('feedback-cust-email').value;
    const rating = document.getElementById('feedback-cust-rating').value;
    const text = document.getElementById('feedback-cust-text').value;

    const newFb = {
      name, email, rating, text, date: new Date().toLocaleDateString('en-GB')
    };

    this.feedbacks.unshift(newFb);
    this.saveStorage('roachup_feedbacks', this.feedbacks);
    this.closeModal('feedback-modal');
    this.showToast(`Thank you ${name}! Your consumer feedback has been submitted.`, 'success');
  }

  // Landing Page Feed Render
  renderLandingGigs() {
    const container = document.getElementById('landing-gigs-container');
    if (!container) return;

    container.innerHTML = this.gigs.map(g => `
      <div class="glass-card gig-card">
        <div>
          <div class="gig-header">
            <span class="gig-category">${g.category}</span>
            <span class="gig-pay">₹${g.pay}</span>
          </div>
          <h3 class="gig-title">${g.title}</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">${g.description}</p>
          
          <div class="gig-meta">
            <span class="badge-location"><i data-lucide="map-pin"></i> ${g.location}</span>
            <span class="meta-item"><i data-lucide="clock"></i> ${g.hours}</span>
            <span class="rating-stars"><i data-lucide="star"></i> ${g.employerRating} (${g.employerName})</span>
          </div>
        </div>

        <button class="btn btn-outline-emerald btn-sm btn-block" style="margin-top: 1rem;" onclick="app.quickApplyGig('${g.id}')">
          Apply as Student <i data-lucide="arrow-right"></i>
        </button>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  renderQuickTasks() {
    const landingContainer = document.getElementById('landing-quick-tasks-container');
    const studentContainer = document.getElementById('student-quick-tasks-feed');
    const quickTasks = this.gigs.filter(g => g.category === 'Quick Task' || g.isQuickTask || g.hours.includes('30 Min') || g.hours.includes('40 Min'));
    const studentId = this.session ? this.session.currentUser.id : null;

    if (quickTasks.length === 0) return;

    const renderCard = (g) => {
      const isApplied = g.applicants.includes(studentId);
      return `
        <div class="glass-card gig-card" style="border-left: 4px solid var(--accent-amber);">
          <div>
            <div class="gig-header">
              <span class="badge-status" style="background: rgba(217, 119, 6, 0.15); color: var(--accent-amber); font-weight: 700;">⚡ 30-40 Mins</span>
              <span class="gig-pay" style="color: var(--primary-emerald); font-weight: 800;">₹${g.pay}</span>
            </div>
            <h3 class="gig-title" style="margin-top: 0.4rem;">${g.title}</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">${g.description}</p>
            
            <div class="gig-meta">
              <span class="badge-location"><i data-lucide="map-pin"></i> ${g.location}</span>
              <span class="meta-item" style="color: var(--accent-amber); font-weight: 700;"><i data-lucide="zap"></i> ${g.hours}</span>
              <span class="rating-stars"><i data-lucide="star"></i> ${g.employerRating} (${g.employerName})</span>
            </div>
          </div>

          <button class="${isApplied ? 'btn btn-secondary btn-sm btn-block' : 'btn btn-primary btn-sm btn-block'}" 
                  style="margin-top: 1rem; background: ${isApplied ? '' : 'linear-gradient(135deg, var(--accent-amber), #b45309)'}; border: none; color: #fff;" 
                  onclick="app.quickApplyGig('${g.id}')" ${isApplied ? 'disabled' : ''}>
            ${isApplied ? '✓ Applied' : '⚡ Accept 30-Min Task & Earn'}
          </button>
        </div>
      `;
    };

    if (landingContainer) {
      landingContainer.innerHTML = quickTasks.map(renderCard).join('');
    }
    if (studentContainer) {
      studentContainer.innerHTML = quickTasks.map(renderCard).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  renderTopStudents() {
    const container = document.getElementById('top-students-container');
    if (!container) return;

    container.innerHTML = this.students.map(s => `
      <div class="glass-card" style="display: flex; align-items: center; gap: 1rem;">
        <img src="${s.idCardUrl}" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-emerald);">
        <div>
          <h4 style="font-size: 1.05rem;">${s.name}</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted);">${s.college}</p>
          <div style="display: flex; gap: 0.6rem; margin-top: 0.3rem;">
            <span class="badge-location" style="font-size: 0.75rem;"><i data-lucide="map-pin"></i> ${s.location}</span>
            <span class="rating-stars" style="font-size: 0.8rem;"><i data-lucide="star"></i> ${s.rating}</span>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  updateGlobalCounters() {
    const verifiedCount = this.students.filter(s => s.idStatus === 'Approved').length + 2447;
    const revTotal = this.revenueLedger.reduce((sum, r) => sum + r.amount, 0) + (2447 * 299);

    const elVerified = document.getElementById('stat-verified-students');
    const elPayouts = document.getElementById('stat-total-payouts');
    const elGigs = document.getElementById('stat-active-gigs');

    if (elVerified) elVerified.textContent = `${verifiedCount.toLocaleString()}+`;
    if (elPayouts) elPayouts.textContent = `₹${(revTotal / 100000).toFixed(1)}L+`;
    if (elGigs) elGigs.textContent = `${this.gigs.length + 180}+`;
  }

  quickApplyGig(gigId) {
    if (this.session && this.session.role === 'student') {
      this.showView('student-dashboard-view');
      this.applyForGig(gigId);
    } else {
      this.showToast('Please register or log in as a student to apply for tasks', 'info');
      this.showView('student-register-view');
    }
  }

  // ================= STUDENT REGISTRATION WORKFLOW (EMAIL OTP) ================= //

  handleStudentRegStep1(e) {
    e.preventDefault();
    const name = document.getElementById('reg-student-name').value;
    const email = document.getElementById('reg-student-email').value;
    const phone = document.getElementById('reg-student-phone').value;
    const college = document.getElementById('reg-student-college').value;
    const location = document.getElementById('reg-student-location').value;
    const pass = document.getElementById('reg-student-pass').value;
    const cpass = document.getElementById('reg-student-cpass').value;

    if (pass !== cpass) {
      this.showToast('Passwords do not match!', 'error');
      return;
    }

    this.registrationDraft = {
      id: 'std-' + Date.now(),
      name, email, phone, college, location, pass,
      rating: 5.0,
      reviewsCount: 0,
      walletBalance: 0,
      feeStatus: 'Unpaid',
      idStatus: 'Pending',
      idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      appliedGigs: []
    };

    // Open Step 2: Email OTP Modal
    const emailTarget = document.getElementById('otp-target-email');
    if (emailTarget) emailTarget.textContent = email;
    this.openModal('otp-modal');
    this.startOtpTimer();
  }

  openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('active');
  }

  closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
  }

  startOtpTimer() {
    let sec = 29;
    const timerEl = document.getElementById('otp-timer');
    if (!timerEl) return;
    const interval = setInterval(() => {
      sec--;
      timerEl.textContent = sec;
      if (sec <= 0) clearInterval(interval);
    }, 1000);
  }

  focusNextOtp(input, index) {
    if (input.value && index < 6) {
      const boxes = document.querySelectorAll('.otp-box');
      if (boxes[index]) boxes[index].focus();
    }
  }

  verifyOtpSubmit() {
    this.closeModal('otp-modal');
    this.showToast('Email OTP verified successfully! ✔', 'success');

    // Update wizard progress indicator
    document.getElementById('step-ind-1').classList.add('completed');
    document.getElementById('step-ind-2').classList.add('active', 'completed');
    document.getElementById('step-ind-3').classList.add('active');

    // Open Step 3: ID Upload Modal
    this.openModal('id-upload-modal');
  }

  handleIdFileSelected(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = document.getElementById('id-preview-img-tag');
        img.src = evt.target.result;
        document.getElementById('id-file-preview-container').style.display = 'block';
        if (this.registrationDraft) {
          this.registrationDraft.idCardUrl = evt.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  proceedToPaymentStep() {
    this.closeModal('id-upload-modal');
    document.getElementById('step-ind-3').classList.add('completed');
    document.getElementById('step-ind-4').classList.add('active');

    // Open Step 4: ₹299 Payment Modal
    this.openModal('payment-modal');
  }

  selectPayMethod(method, btn) {
    this.activeSelectedPayMethod = method;
    document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  process299Payment() {
    const txnId = `TXN-ROACH-${Math.floor(10000 + Math.random() * 90000)}`;
    if (this.registrationDraft) {
      this.registrationDraft.txnId = txnId;
      this.registrationDraft.feeStatus = 'Paid ₹299';
      this.registrationDraft.idStatus = 'Approved'; // Automatically Approved upon ₹299 fee payment!
    }

    // Log revenue transaction
    const newRev = {
      txnId,
      studentName: this.registrationDraft ? this.registrationDraft.name : "New Student",
      contact: this.registrationDraft ? this.registrationDraft.phone : "9876543210",
      amount: 299,
      method: this.activeSelectedPayMethod.toUpperCase(),
      date: new Date().toLocaleString('en-GB')
    };

    this.revenueLedger.unshift(newRev);
    this.saveStorage('roachup_revenue', this.revenueLedger);

    this.closeModal('payment-modal');
    this.showToast('Payment of ₹299 successful! Student ID card automatically approved.', 'success');

    // Populate digital receipt
    document.getElementById('rec-number').textContent = `RCUP-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('rec-date').textContent = new Date().toLocaleString('en-GB');
    document.getElementById('rec-student-name').textContent = this.registrationDraft.name;
    document.getElementById('rec-student-contact').textContent = `${this.registrationDraft.phone} / ${this.registrationDraft.email}`;
    document.getElementById('rec-student-location').textContent = `${this.registrationDraft.college}, ${this.registrationDraft.location}`;
    document.getElementById('rec-txnid').textContent = txnId;

    // Show Receipt Modal
    this.openModal('receipt-modal');
  }

  finishRegistrationAndEnterDashboard() {
    this.closeModal('receipt-modal');

    // Add to students list
    if (this.registrationDraft) {
      this.students.unshift(this.registrationDraft);
      this.saveStorage('roachup_students', this.students);

      // Create session
      this.session = {
        currentUser: this.registrationDraft,
        role: 'student'
      };
      this.saveStorage('roachup_session', this.session);
    }

    this.checkSessionAndRenderNav();
    this.showView('student-dashboard-view');
  }

  // Student Login
  handleStudentLogin(e) {
    e.preventDefault();
    const input = document.getElementById('login-student-email').value;
    const pass = document.getElementById('login-student-pass').value;

    const found = this.students.find(s => s.email === input || s.phone === input);
    if (found) {
      this.session = { currentUser: found, role: 'student' };
      this.saveStorage('roachup_session', this.session);
      this.checkSessionAndRenderNav();
      this.showToast(`Welcome back, ${found.name}!`, 'success');
      this.showView('student-dashboard-view');
    } else {
      this.demoStudentLogin();
    }
  }

  demoStudentLogin() {
    const student = this.students[0];
    this.session = { currentUser: student, role: 'student' };
    this.saveStorage('roachup_session', this.session);
    this.checkSessionAndRenderNav();
    this.showToast(`Logged in as Demo Verified Student (${student.name})`, 'success');
    this.showView('student-dashboard-view');
  }

  // Student Dashboard Rendering
  renderStudentDashboard() {
    if (!this.session || this.session.role !== 'student') return;
    const s = this.session.currentUser;

    document.getElementById('dash-student-name').textContent = s.name;
    document.getElementById('dash-student-avatar').textContent = s.name.charAt(0).toUpperCase();
    document.getElementById('dash-student-location').innerHTML = `<i data-lucide="map-pin"></i> ${s.location}`;
    document.getElementById('dash-student-college').textContent = s.college;
    document.getElementById('dash-student-rating').innerHTML = `<i data-lucide="star"></i> ${s.rating} (${s.reviewsCount} reviews)`;
    document.getElementById('dash-student-wallet').textContent = `₹${s.walletBalance.toLocaleString()}`;

    const badge = document.getElementById('dash-student-status-badge');
    if (s.idStatus === 'Approved') {
      badge.className = 'badge-status verified';
      badge.innerHTML = `<i data-lucide="check-circle"></i> Verified Student`;
    } else {
      badge.className = 'badge-status pending';
      badge.innerHTML = `<i data-lucide="clock"></i> ID Verification Pending`;
    }

    this.renderStudentGigsFeed();
    this.renderStudentAppliedJobs();

    // Fill profile edit form
    document.getElementById('prof-student-name').value = s.name;
    document.getElementById('prof-student-location').value = s.location;
    document.getElementById('prof-student-college').value = s.college;
    document.getElementById('prof-student-phone').value = s.phone;

    if (window.lucide) lucide.createIcons();
  }

  switchStudentTab(tabId, el) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    const target = document.getElementById(`student-tab-${tabId}`);
    if (target) target.style.display = 'block';
  }

  renderStudentGigsFeed(filterText = '', filterCat = 'all') {
    const feed = document.getElementById('student-gigs-feed');
    if (!feed) return;

    const studentId = this.session ? this.session.currentUser.id : null;

    const filtered = this.gigs.filter(g => {
      const matchesText = g.title.toLowerCase().includes(filterText.toLowerCase()) ||
                          g.location.toLowerCase().includes(filterText.toLowerCase()) ||
                          g.description.toLowerCase().includes(filterText.toLowerCase());
      const matchesCat = filterCat === 'all' || g.category === filterCat;
      return matchesText && matchesCat;
    });

    if (filtered.length === 0) {
      feed.innerHTML = `<p class="text-muted" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No tasks found matching your criteria.</p>`;
      return;
    }

    feed.innerHTML = filtered.map(g => {
      const isApplied = g.applicants.includes(studentId);
      return `
        <div class="glass-card gig-card">
          <div>
            <div class="gig-header">
              <span class="gig-category">${g.category}</span>
              <span class="gig-pay">₹${g.pay}</span>
            </div>
            <h3 class="gig-title">${g.title}</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">${g.description}</p>
            
            <div class="gig-meta">
              <span class="badge-location"><i data-lucide="map-pin"></i> ${g.location}</span>
              <span class="meta-item"><i data-lucide="clock"></i> ${g.hours}</span>
              <span class="rating-stars"><i data-lucide="star"></i> ${g.employerRating} (${g.employerName})</span>
            </div>
          </div>

          <button class="${isApplied ? 'btn btn-secondary btn-sm btn-block' : 'btn btn-primary btn-sm btn-block'}" 
                  style="margin-top: 1rem;" 
                  onclick="app.applyForGig('${g.id}')" ${isApplied ? 'disabled' : ''}>
            ${isApplied ? '✓ Applied' : 'Apply for Task'}
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  filterStudentGigs() {
    const text = document.getElementById('gig-search-input').value;
    const cat = document.getElementById('gig-category-filter').value;
    this.renderStudentGigsFeed(text, cat);
  }

  applyForGig(gigId) {
    if (!this.session || this.session.role !== 'student') return;
    const student = this.session.currentUser;

    const gig = this.gigs.find(g => g.id === gigId);
    if (gig) {
      if (!gig.applicants.includes(student.id)) {
        gig.applicants.push(student.id);
        this.saveStorage('roachup_gigs', this.gigs);
      }
      if (!student.appliedGigs.includes(gigId)) {
        student.appliedGigs.push(gigId);
        this.saveStorage('roachup_students', this.students);
      }

      this.showToast(`Applied for "${gig.title}"! Employer notified.`, 'success');
      this.renderStudentGigsFeed();
      this.renderStudentAppliedJobs();
    }
  }

  renderStudentAppliedJobs() {
    const list = document.getElementById('student-applied-jobs-list');
    if (!list || !this.session) return;
    const student = this.session.currentUser;

    const myJobs = this.gigs.filter(g => g.applicants.includes(student.id));

    if (myJobs.length === 0) {
      list.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">You haven't applied for any tasks yet. Browse available tasks above!</td></tr>`;
      return;
    }

    list.innerHTML = myJobs.map(g => `
      <tr>
        <td><strong>${g.title}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${g.category}</span></td>
        <td>${g.employerName}<br><span style="font-size: 0.78rem; color: var(--text-muted);">${g.location}</span></td>
        <td style="color: var(--primary-emerald); font-weight: 700;">₹${g.pay}</td>
        <td>Recently</td>
        <td><span class="badge-status pending">Application Under Review</span></td>
        <td><button class="btn btn-secondary btn-sm" onclick="alert('Application details: Your profile with rating ${student.rating} is visible to ${g.employerName}')">View Status</button></td>
      </tr>
    `).join('');
  }

  reprintStudentReceipt() {
    if (!this.session || !this.session.currentUser) return;
    const s = this.session.currentUser;

    document.getElementById('rec-number').textContent = `RCUP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('rec-date').textContent = s.joinedDate || new Date().toLocaleString('en-GB');
    document.getElementById('rec-student-name').textContent = s.name;
    document.getElementById('rec-student-contact').textContent = `${s.phone} / ${s.email}`;
    document.getElementById('rec-student-location').textContent = `${s.college}, ${s.location}`;
    document.getElementById('rec-txnid').textContent = s.txnId || "TXN-ROACH-89201";

    this.openModal('receipt-modal');
  }

  showWithdrawModal() {
    alert(`Withdrawal Request: Your wallet balance of ${document.getElementById('dash-student-wallet').textContent} will be transferred to your registered UPI ID within 2 hours.`);
  }

  updateStudentProfile(e) {
    e.preventDefault();
    if (!this.session) return;
    const s = this.session.currentUser;
    s.name = document.getElementById('prof-student-name').value;
    s.location = document.getElementById('prof-student-location').value;
    s.college = document.getElementById('prof-student-college').value;

    this.saveStorage('roachup_students', this.students);
    this.saveStorage('roachup_session', this.session);
    this.renderStudentDashboard();
    this.showToast('Profile updated successfully!', 'success');
  }

  // ================= CUSTOMER / CONSUMER MODULE ================= //

  handleCustomerReg(e) {
    e.preventDefault();
    const name = document.getElementById('reg-cust-name').value;
    const company = document.getElementById('reg-cust-company').value || name;
    const email = document.getElementById('reg-cust-email').value;
    const phone = document.getElementById('reg-cust-phone').value;
    const location = document.getElementById('reg-cust-location').value;

    const newCust = {
      id: 'cust-' + Date.now(),
      name, company, email, phone, location, rating: 5.0
    };

    this.customers.unshift(newCust);
    this.saveStorage('roachup_customers', this.customers);

    this.session = { currentUser: newCust, role: 'customer' };
    this.saveStorage('roachup_session', this.session);

    this.checkSessionAndRenderNav();
    this.showToast(`Welcome ${name}! Consumer account created.`, 'success');
    this.showView('customer-dashboard-view');
  }

  handleCustomerLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-cust-email').value.trim();
    const pass = document.getElementById('login-cust-pass').value.trim();

    const found = this.customers.find(c => c.email === email || c.phone === email);
    const userObj = found || {
      id: 'cust-' + Date.now(),
      name: email ? email.split('@')[0] : 'Consumer',
      company: 'Consumer Account',
      email: email || 'consumer@roachup.com',
      phone: '9899001122',
      location: 'Primary Campus Area',
      rating: 5.0
    };

    this.session = { currentUser: userObj, role: 'customer' };
    this.saveStorage('roachup_session', this.session);
    this.checkSessionAndRenderNav();
    this.showToast(`Logged in as Consumer (${userObj.name})`, 'success');
    this.showView('customer-dashboard-view');
  }

  demoCustomerLogin() {
    const cust = this.customers[0];
    this.session = { currentUser: cust, role: 'customer' };
    this.saveStorage('roachup_session', this.session);
    this.checkSessionAndRenderNav();
    this.showToast(`Logged in as Consumer (${cust.name} - ${cust.company})`, 'success');
    this.showView('customer-dashboard-view');
  }

  renderCustomerDashboard() {
    if (!this.session || this.session.role !== 'customer') return;
    const c = this.session.currentUser;

    document.getElementById('dash-cust-name').textContent = `${c.company} (${c.name})`;
    document.getElementById('dash-cust-avatar').textContent = c.company.charAt(0).toUpperCase();
    document.getElementById('dash-cust-location').innerHTML = `<i data-lucide="map-pin"></i> ${c.location}`;
    document.getElementById('dash-cust-rating').innerHTML = `<i data-lucide="star"></i> ${c.rating} Consumer Rating`;

    this.renderCustomerPostedGigs();
    if (window.lucide) lucide.createIcons();
  }

  renderCustomerPostedGigs() {
    const table = document.getElementById('customer-posted-gigs-list');
    if (!table || !this.session) return;
    const custId = this.session.currentUser.id;

    const myGigs = this.gigs.filter(g => g.employerId === custId || custId === 'cust-501');

    if (myGigs.length === 0) {
      table.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">You haven't posted any tasks yet. Click "Post a New Micro-Task"!</td></tr>`;
      return;
    }

    table.innerHTML = myGigs.map(g => `
      <tr>
        <td><strong>${g.title}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${g.category}</span></td>
        <td><span class="badge-location"><i data-lucide="map-pin"></i> ${g.location}</span></td>
        <td style="color: var(--primary-emerald); font-weight: 700;">₹${g.pay}</td>
        <td><strong style="color: var(--accent-indigo);">${g.applicants.length} Students Applied</strong></td>
        <td><span class="badge-status approved">${g.status}</span></td>
        <td>
          <button class="btn btn-indigo btn-sm" onclick="app.viewGigApplicants('${g.id}')">Review Applicants (${g.applicants.length})</button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  openPostGigModal() {
    this.openModal('post-gig-modal');
  }

  openPostQuickTaskModal() {
    this.openModal('post-gig-modal');
    const cat = document.getElementById('post-gig-category');
    const hours = document.getElementById('post-gig-hours');
    const title = document.getElementById('post-gig-title');
    if (cat) cat.value = 'Quick Task';
    if (hours) hours.value = '30 Mins';
    if (title && !title.value) title.placeholder = 'e.g. ⚡ 30-Min Fast Flyer Distribution / Survey';
  }

  submitNewGig(e) {
    e.preventDefault();
    if (!this.session || this.session.role !== 'customer') return;
    const c = this.session.currentUser;

    const newGig = {
      id: 'gig-' + Date.now(),
      title: document.getElementById('post-gig-title').value,
      category: document.getElementById('post-gig-category').value,
      employerId: c.id,
      employerName: c.company || c.name,
      employerRating: c.rating,
      location: document.getElementById('post-gig-location').value,
      pay: parseInt(document.getElementById('post-gig-pay').value),
      hours: document.getElementById('post-gig-hours').value,
      description: document.getElementById('post-gig-desc').value,
      status: 'Active',
      applicants: []
    };

    this.gigs.unshift(newGig);
    this.saveStorage('roachup_gigs', this.gigs);

    this.closeModal('post-gig-modal');
    this.showToast(`Micro-task "${newGig.title}" published live!`, 'success');
    this.renderCustomerDashboard();
  }

  viewGigApplicants(gigId) {
    const gig = this.gigs.find(g => g.id === gigId);
    if (!gig) return;

    const box = document.getElementById('applicant-details-box');
    const container = document.getElementById('applicant-rows-container');
    document.getElementById('applicant-box-title').textContent = `Applicants for "${gig.title}"`;
    box.style.display = 'block';

    const appliedStudents = this.students.filter(s => gig.applicants.includes(s.id));

    if (appliedStudents.length === 0) {
      container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No student applications received for this task yet.</td></tr>`;
      return;
    }

    container.innerHTML = appliedStudents.map(s => `
      <tr>
        <td><strong>${s.name}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${s.phone}</span></td>
        <td>${s.college}</td>
        <td><span class="badge-location"><i data-lucide="map-pin"></i> ${s.location}</span></td>
        <td><span class="rating-stars"><i data-lucide="star"></i> ${s.rating}</span></td>
        <td><span class="badge-status ${s.idStatus === 'Approved' ? 'approved' : 'pending'}">${s.idStatus}</span></td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="app.hireStudent('${s.name}', '${gig.title}')">Hire Student</button>
          <button class="btn btn-secondary btn-sm" onclick="app.openRatingModal('${s.name}')">Rate Student</button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  hireStudent(studentName, gigTitle) {
    this.showToast(`Student ${studentName} hired for "${gigTitle}"! SMS sent.`, 'success');
  }

  // ================= ADMIN CONTROL CENTER MODULE ================= //

  showAdminLogin() {
    const emailInput = document.getElementById('admin-email');
    const passInput = document.getElementById('admin-pass');
    if (emailInput) emailInput.value = '';
    if (passInput) passInput.value = '';
    this.showView('admin-login-view');
  }

  handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('admin-email').value.trim();
    const pass = document.getElementById('admin-pass').value.trim();

    if (email === 'admin012@gmail.com' && pass === 'admin012') {
      this.session = { currentUser: { name: 'Super Admin', email }, role: 'admin' };
      this.saveStorage('roachup_session', this.session);
      this.checkSessionAndRenderNav();
      this.showToast('Access granted to Admin Control Center', 'success');
      this.showView('admin-dashboard-view');
    } else {
      this.showToast('Invalid Admin Email or Password!', 'error');
    }
  }

  renderAdminDashboard() {
    if (!this.session || this.session.role !== 'admin') return;

    // Update Admin Metrics
    const totalRev = this.revenueLedger.reduce((sum, r) => sum + r.amount, 0) + (2447 * 299);
    document.getElementById('admin-revenue-count').textContent = `₹${totalRev.toLocaleString()}`;
    document.getElementById('admin-students-count').textContent = (this.students.length + 2447).toLocaleString();
    document.getElementById('admin-customers-count').textContent = (this.customers.length + 140).toLocaleString();
    
    const pendingCount = this.students.filter(s => s.idStatus === 'Pending').length;
    document.getElementById('admin-pending-id-count').textContent = pendingCount;

    this.renderAdminStudentTable();
    this.renderAdminJobsTable();
    this.renderAdminRevenueTable();

    // Pre-fill Admin Founder Edit Form
    document.getElementById('edit-founder-name').value = this.founderInfo.name;
    document.getElementById('edit-founder-role').value = this.founderInfo.role;
    document.getElementById('edit-founder-email').value = this.founderInfo.email;
    document.getElementById('edit-founder-bio').value = this.founderInfo.bio;
    document.getElementById('edit-founder-vision').value = this.founderInfo.vision;

    if (window.lucide) lucide.createIcons();
  }

  switchAdminTab(tabId) {
    ['students', 'customers', 'revenue', 'founder'].forEach(t => {
      const v = document.getElementById(`admin-view-${t}`);
      const b = document.getElementById(`admin-tab-btn-${t}`);
      if (v) v.style.display = 'none';
      if (b) b.classList.remove('active');
    });

    const targetView = document.getElementById(`admin-view-${tabId}`);
    const targetBtn = document.getElementById(`admin-tab-btn-${tabId}`);
    if (targetView) targetView.style.display = 'block';
    if (targetBtn) targetBtn.classList.add('active');
  }

  renderAdminStudentTable(filterText = '') {
    const body = document.getElementById('admin-students-table-body');
    if (!body) return;

    const filtered = this.students.filter(s => 
      s.name.toLowerCase().includes(filterText.toLowerCase()) ||
      s.college.toLowerCase().includes(filterText.toLowerCase()) ||
      s.location.toLowerCase().includes(filterText.toLowerCase()) ||
      s.phone.includes(filterText)
    );

    body.innerHTML = filtered.map(s => `
      <tr>
        <td><strong>${s.name}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${s.email}</span></td>
        <td>${s.phone}</td>
        <td>${s.college}<br><span class="badge-location" style="font-size: 0.75rem;"><i data-lucide="map-pin"></i> ${s.location}</span></td>
        <td><span class="rating-stars"><i data-lucide="star"></i> ${s.rating}</span></td>
        <td><span class="badge-status approved">PAID ₹299</span></td>
        <td>
          <span class="badge-status ${s.idStatus === 'Approved' ? 'approved' : (s.idStatus === 'Pending' ? 'pending' : 'rejected')}">
            ${s.idStatus}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="app.adminInspectId('${s.id}')">Inspect ID</button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  filterAdminStudents(text) {
    this.renderAdminStudentTable(text);
  }

  adminInspectId(studentId) {
    const s = this.students.find(st => st.id === studentId);
    if (!s) return;
    this.selectedAdminStudentId = studentId;

    document.getElementById('admin-id-modal-student-name').textContent = `Student: ${s.name} (${s.college})`;
    document.getElementById('admin-id-modal-img').src = s.idCardUrl;
    this.openModal('admin-view-id-modal');
  }

  adminApproveId() {
    if (!this.selectedAdminStudentId) return;
    const s = this.students.find(st => st.id === this.selectedAdminStudentId);
    if (s) {
      s.idStatus = 'Approved';
      this.saveStorage('roachup_students', this.students);
      this.showToast(`Student ID for ${s.name} APPROVED!`, 'success');
      this.closeModal('admin-view-id-modal');
      this.renderAdminDashboard();
    }
  }

  adminRejectId() {
    if (!this.selectedAdminStudentId) return;
    const s = this.students.find(st => st.id === this.selectedAdminStudentId);
    if (s) {
      s.idStatus = 'Rejected';
      this.saveStorage('roachup_students', this.students);
      this.showToast(`Student ID for ${s.name} REJECTED!`, 'warning');
      this.closeModal('admin-view-id-modal');
      this.renderAdminDashboard();
    }
  }

  renderAdminJobsTable() {
    const body = document.getElementById('admin-jobs-table-body');
    if (!body) return;

    body.innerHTML = this.gigs.map(g => `
      <tr>
        <td><strong>${g.title}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${g.category}</span></td>
        <td>${g.employerName}</td>
        <td><span class="badge-location"><i data-lucide="map-pin"></i> ${g.location}</span></td>
        <td style="color: var(--primary-emerald); font-weight: 700;">₹${g.pay}</td>
        <td><strong>${g.applicants.length}</strong></td>
        <td><span class="badge-status approved">${g.status}</span></td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="app.adminDeleteGig('${g.id}')">Flag / Remove</button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  adminDeleteGig(gigId) {
    this.gigs = this.gigs.filter(g => g.id !== gigId);
    this.saveStorage('roachup_gigs', this.gigs);
    this.showToast('Task listing removed by admin', 'info');
    this.renderAdminDashboard();
  }

  renderAdminRevenueTable() {
    const body = document.getElementById('admin-revenue-table-body');
    if (!body) return;

    body.innerHTML = this.revenueLedger.map(r => `
      <tr>
        <td style="font-family: monospace; font-weight: 700;">${r.txnId}</td>
        <td><strong>${r.studentName}</strong></td>
        <td>${r.contact}</td>
        <td style="color: var(--primary-emerald); font-weight: 700;">₹${r.amount}.00</td>
        <td><span class="badge-status approved">${r.method}</span></td>
        <td>${r.date}</td>
      </tr>
    `).join('');
  }

  // RATING SYSTEM
  openRatingModal(targetName) {
    this.ratingTarget = targetName;
    document.getElementById('rating-modal-target').textContent = `Rate performance for ${targetName}`;
    this.openModal('rating-modal');
  }

  setRatingStars(count) {
    this.selectedRatingStars = count;
    const container = document.getElementById('rating-star-container');
    const stars = container.children;
    for (let i = 0; i < 5; i++) {
      stars[i].style.color = i < count ? 'var(--accent-amber)' : 'var(--text-dim)';
    }
  }

  submitRating() {
    this.closeModal('rating-modal');
    this.showToast(`Submitted ${this.selectedRatingStars}★ rating for ${this.ratingTarget}!`, 'success');
  }
}

// Global App Instance
window.app = new RoachUpApp();
