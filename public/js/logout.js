// function for fetching logout
const logout = async () => {

    sessionStorage.setItem("user_id", 0);
    sessionStorage.setItem("username", "Guest");
    sessionStorage.setItem("logged_in", false);

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);
