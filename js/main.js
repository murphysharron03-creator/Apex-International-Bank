// Apex International Bank - Main Scripts

document.addEventListener('DOMContentLoaded', function () {
  // Track Transfer form (homepage)
  const trackForm = document.getElementById('trackForm');
  if (trackForm) {
    trackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const ref = (document.getElementById('refNumber').value || '').trim().replace(/\s+/g, '');
      const lastName = (document.getElementById('lastName').value || '').trim().toLowerCase();

      // Only accept the official tracking number
      const validRefs = [
        '809765439',
        'AIB-809765439',
        'AIB-INT-809765439'
      ];

      const isValid = validRefs.some(r => ref === r || ref.toUpperCase() === r.toUpperCase());
      const nameOk = !lastName || lastName.includes('crampton') || lastName.includes('eugene') || lastName.includes('edward');

      if (isValid && nameOk) {
        window.location.href = 'status.html';
      } else if (ref.length > 0) {
        alert('No transfer found for reference "' + ref + '".\n\nPlease check the number and try again.\n\nValid reference: 809765439');
      } else {
        alert('Please enter a transfer reference number.');
      }
    });
  }

  // Login form — restricted credentials only
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const user = (document.getElementById('username').value || '').trim().toLowerCase();
      const pass = (document.getElementById('password').value || '').trim();

      // Only these credentials are accepted
      const validUser = 'crampton.eugene';
      const validPass = 'ApexSecure2026';

      if (user === validUser && pass === validPass) {
        sessionStorage.setItem('apexLoggedIn', 'true');
        sessionStorage.setItem('apexUser', user);
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid Client ID or Password.\n\nAccess denied. Please check your credentials and try again.');
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
      }
    });
  }

  // Session guard for dashboard — redirect if not logged in
  if (window.location.pathname.endsWith('dashboard.html')) {
    if (sessionStorage.getItem('apexLoggedIn') !== 'true') {
      window.location.href = 'login.html';
    }
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      sessionStorage.removeItem('apexLoggedIn');
      sessionStorage.removeItem('apexUser');
      window.location.href = 'login.html';
    });
  }
});
