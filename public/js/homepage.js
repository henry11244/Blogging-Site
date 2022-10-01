// delete blog function
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

// edit blog function
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

// event handlers for delete function
const deletebutton = document.querySelectorAll('.delete')
deletebutton.forEach(button => { button.addEventListener('click', delButtonHandler) });

// eventhandler for edit function
const editbutton = document.querySelectorAll('.edit')
editbutton.forEach(button => { button.addEventListener('click', editButtonHandler) });



// function for new comments
const newCommentHandler = async (event) => {
    event.preventDefault();

    const blog_id = await event.target.getAttribute('data-id');
    const comment = await document.querySelector(`#Comment${blog_id}`).value.trim();
    const commentLoginMessage = document.querySelector(`#commentLoginMessage${blog_id}`)
    const user_id = sessionStorage.getItem('user_id');
    const commenter = sessionStorage.getItem('username')

    if (comment) {
        console.log(JSON.stringify({ comment }))
        const response = await fetch('/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, user_id, blog_id, commenter }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            // alert("🔓 Please Login to Add Comments");
            commentLoginMessage.setAttribute('style', 'display: block;')
        }
    }
};

// eventlistener to add comment button
const commentbutton = document.querySelectorAll('.newComment')
commentbutton.forEach(button => { button.addEventListener('submit', newCommentHandler) });