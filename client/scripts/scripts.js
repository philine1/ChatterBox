
const form = document.querySelector('form');
const chatsFeed = document.querySelector('.chats')
const API_URL = 'http://localhost:3000/chat';


// This event listener gets user input from the form in index.html
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name")
    const message = formData.get("message")

    const chat = {
        name,
        message
    };

    console.log(chat);
    
}