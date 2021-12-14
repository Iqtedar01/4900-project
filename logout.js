
document.addEventListener("DOMContentLoaded", function () {
    const hasUserName = localStorage.getItem('username');
    if (hasUserName) {
        document.getElementById('login-link').remove();
        document.getElementById('logout-link').style.display = 'inline';
    } else {
        window.location.href = 'login.html'
    }
});

function logout(event) {
    event.preventDefault();
    localStorage.removeItem('username')
    window.location.href = 'login.html'
}
