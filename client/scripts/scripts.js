const form = document.querySelector('form');
const chatsFeed = document.querySelector('.chats');


// This event listener gets user input from the form in index.html
form.addEventListener('submit',  (e) => {
    e.preventDefault();
    const postEntry = document.getElementById("message").value
    const name = document.getElementById("name").value
    // const body = { 
    //     message: postEntry,
    //     author: name
    // }
    console.log(postEntry)
    console.log(name)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            author: name,
            message: postEntry  
        })
    }
    fetch("http://localhost:3000/journal", options)
});

