const emojiOptions = ["😀", "😃", "😀"];
const form = document.querySelector('form');
const chatsFeed = document.querySelector('.chats');
const apiKey = "74d7MBRbZL0YmhJiyOtbVF20N7j0XfUx"
let fig = document.createElement("figure");
let img = document.createElement("img");



// event listener gets user input from the form in index.html
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

// function to retrieve Gify API
document.addEventListener("DOMContentLoaded", sendApiRequest);
function sendApiRequest(){
   
    document.getElementById("btnSearch").addEventListener("click", e => {
        e.preventDefault();
        
        
        let userInput = document.getElementById("search").value.trim();
        console.log(userInput)
        let giphyURL = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=`
        giphyURL = giphyURL.concat(userInput)
        // console.log(giphyURL);

        fetch(giphyURL)
            .then(response => response.json())
            .then(content => {
                // data, pagination, meta (shows array of properties from Gify API)
                // console.log(content.data); 
                // console.log("META", content.meta);
                img.src = content.data[Math.floor(Math.random() * 5)].images.downsized.url;
                img.alt = content.data[0].title;
                fig.appendChild(img);
                let feedbox = document.querySelector("#feedbox");
                feedbox.insertAdjacentElement("afterbegin", fig);
                document.querySelector("#search").value = "";
                       
            })
            .catch(err =>{
                console.log(err)
            })
        
                
            })
  };


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
   
    console.log(img.src)
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
            gif: img.src,
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
        const gif = document.createElement("img");
        const time = document.createElement("span")

        author.textContent = "Posted by: " + entriesData[i].author
        time.textContent= " • " + entriesData[i].date
        message.textContent = entriesData[i].message
        gif.src= entriesData[i].gif

        entry.classList.add("entrybox")
        time.classList.add("timePosted")

        entry.appendChild(body)
        author.appendChild(time)
        body.appendChild(author)
        body.appendChild(message)
        body.appendChild(gif)
        entriesFeed.appendChild(entry)   
  
    }   
}

// text remaining function
const myTextArea = document.getElementById("message");
const remainingCharsText = document.getElementById("my-textarea-remaining-chars");
const MAX_CHARS = 150;

myTextArea.addEventListener("input", ()  =>{
                
const remaining = MAX_CHARS - myTextArea.value.length;
// console.log(remaining);
                
const color = remaining < MAX_CHARS * 0.1 ? 'red' : null;
remainingCharsText.textContent = `${remaining} characters remaining`;
remainingCharsText.style.color = color;
});
