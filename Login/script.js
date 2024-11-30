// Simulasi data login (username dan password)
const validUsername = "karyawan";
const validPassword = "kacamata123";

// Ambil elemen dari DOM
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Tambahkan event listener untuk form submit
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah reload halaman

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validasi username dan password
    if (username === validUsername && password === validPassword) {
        alert("Login Berhasil! Selamat datang di sistem Toko Kacamata.");
        window.location.href = "dashboard.html"; // Redirect ke halaman dashboard
    } else {
        errorMessage.textContent = "Username atau Password salah!";
    }
});