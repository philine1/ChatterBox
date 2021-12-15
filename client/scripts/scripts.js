const emojiOptions = ["😀", "😃", "😀"];
const form = document.querySelector('form');
const chatsFeed = document.querySelector('.chats');


// This event listener gets user input from the form in index.html
form.addEventListener('submit',  (e) =>addEntry(e))


load();

function load() {
    makeFeed();
}

async function allEntries() {
    const postEntry = await fetch("http://localhost:3000/journal")
    const data = await postEntry.json();
    return data
}

function randomNumGenerator() {
    return Math.floor(Math.random()*100) + Math.floor(Math.random()*100)
}

function addEntry(e) {
    e.preventDefault();
    
    const postEntry = document.getElementById("message").value
    let name = document.getElementById("name").value
    if (name == "") {
        name = "Anonymous-user" + "-" + randomNumGenerator()
    }
    if (postEntry == "") {
        return alert("Please enter a message") 
    }
   
    console.log(postEntry)
    console.log(name)
  
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            author: name,
            message: postEntry,
            comment: []  
        })
    }
    fetch("http://localhost:3000/journal", options)
    window.location.reload()
   
}


async function makeFeed() {
    const entries = await fetch("http://localhost:3000/journal")
    let entriesData = await entries.json();
    console.log(entriesData)
    const entriesFeed = document.getElementById("feedbox")
    entriesFeed.textContent = "";
    for(let i= entriesData.length -1; i>=0; i--) {

        const entry = document.createElement("div")
        const author = document.createElement("h3")
        const body = document.createElement("div")
        const message = document.createElement("p")

        author.textContent = entriesData[i].author
        message.textContent = entriesData[i].message
        entry.classList.add("entrybox")

        entry.appendChild(body)
        body.appendChild(author)
        body.appendChild(message)  
        entriesFeed.appendChild(entry)   
  
    }   
}

