const themeSelect = document.getElementById('theme-select');
const themeMenu = document.getElementById('theme-menu');

// Fungsi apply tema
function applyTheme(theme) {
  // Tambahkan efek transisi
  document.body.classList.add('theme-transition');

  // Setelah sedikit delay, ganti tema
  setTimeout(() => {
    document.body.classList.remove('theme-default', 'theme-lonecipher', 'theme-haxorai', 'theme-skull');

    if (theme === 'lonecipher') {
      document.body.classList.add('theme-lonecipher');
    } else if (theme === 'haxorai') {
      document.body.classList.add('theme-haxorai');
    } else if (theme === 'skull') {
      document.body.classList.add('theme-skull');
    } else {
      document.body.classList.add('theme-default');
    }

    // Setelah tema sudah terpasang, hilangkan efek transisi
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 600); // sama dengan durasi CSS transition
  }, 100);

  localStorage.setItem('selectedTheme', theme);
}

// Saat login sukses, tampilkan menu tema
auth.onAuthStateChanged(user => {
  if (user) {
    themeMenu.style.display = 'block';
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
  } else {
    themeMenu.style.display = 'none';
  }
});

// Saat menu diubah
themeSelect.addEventListener('change', () => {
  applyTheme(themeSelect.value);
});