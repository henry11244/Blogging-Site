

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const blogId = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${blogId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog');
        }
    }
};

const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const blogId = event.target.getAttribute('data-id');
        const title = prompt('What is the updated title?')
        const description = prompt('What is the updated body?')
        console.log(JSON.stringify({ title, description }))
        const response = await fetch(`/api/blogs/${blogId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit blog');
        }
    }
};

const deletebutton = document.querySelectorAll('.delete')
deletebutton.forEach(button => { button.addEventListener('click', delButtonHandler) });

const editbutton = document.querySelectorAll('.edit')
editbutton.forEach(button => { button.addEventListener('click', editButtonHandler) });

const newCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#Comment').value.trim();
    const user_id = sessionStorage.getItem('user_id');
    const blog_id = event.target.getAttribute('data-id');
    console.log(user_id)
    console.log(blog_id)
    if (comment) {
        console.log(JSON.stringify({ comment }))
        const response = await fetch('/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, user_id, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};


const commentbutton = document.querySelectorAll('.newComment')
commentbutton.forEach(button => { button.addEventListener('submit', newCommentHandler) });