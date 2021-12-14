const form = document.querySelector('form');
const chatsFeed = document.querySelector('.chats');


// This event listener gets user input from the form in index.html
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get("message")
    const name = formData.get("search")

    const chat = {
        message,
        gif
    };

    console.log(chat);
    
});