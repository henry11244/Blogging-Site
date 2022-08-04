
const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('.blog-content').value.trim();
    const user_id = session.user_id

    if (title && description) {
        console.log(title)
        console.log(description)
        console.log(user_id)
        console.log(JSON.stringify({ title, description, user_id }))
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ title, description, user_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.submit-blog').addEventListener('submit', newBlogHandler);

