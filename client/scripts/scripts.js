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
        // console.log(userInput)
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
   
    // console.log(img.src)
    // console.log(postEntry)
    // console.log(name)
  
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

function addComment(postId, input) {
    const commentEntry = document.getElementById("commentsInput").value

    if (input == "") {
        return alert("Please enter a message") 
    }
   
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            author: "Annonymous" + randomNumGenerator(),
            message: input
        })
    }
    fetch(`http://localhost:3000/journal/${postId}/comments`, options)
    window.location.reload()
}

// async function getEmojiCount(postId) {
//     const result = fetch(`http://localhost:3000/journal/${postId}`)
//     console.log(result)
// }


async function makeFeed() {
    const entries = await fetch("http://localhost:3000/journal")
    let entriesData = await entries.json();
    // console.log(entriesData)
    const entriesFeed = document.getElementById("feedbox")
    entriesFeed.textContent = "";
    for(let i= entriesData.length -1; i>=0; i--) {

        const entry = document.createElement("div")
        const author = document.createElement("h3")
        const body = document.createElement("div")
        const message = document.createElement("p")
        const gif = document.createElement("img");
        const time = document.createElement("span")

        //emoji
        const emojiDiv =document.createElement("div")
        const emoji1Button = document.createElement("button")
        const emoji2Button = document.createElement("button")
        const emoji3Button = document.createElement("button")
        const emoji1count = document.createElement("p")
        const emoji2count = document.createElement("p")
        const emoji3count = document.createElement("p")

        emoji1Button.textContent = emojiOptions[0]
        emoji2Button.textContent = emojiOptions[1]
        emoji3Button.textContent = emojiOptions[2]

        
        // comments
        const commentsDiv = document.createElement("div")
        const commentsInput = document.createElement("input")
        const commentsBtn = document.createElement("button")
        const unhideComments = document.createElement("button")
        unhideComments.textContent = "🗨"

        // unhideComments.setAttribute("id",`unhideComments${postId}`)
      
        commentsInput.setAttribute("id", "commentsInput")
        commentsBtn.setAttribute("id","commentsSubmit")
        commentsInput.type = "text"
        commentsBtn.textContent = "Add Comment"
        const commentsEntryDiv = document.createElement("div")


        author.textContent = "Posted by: " + entriesData[i].author
        time.textContent= " • " + entriesData[i].date
        message.textContent = entriesData[i].message
        gif.src= entriesData[i].gif

        const postId = entriesData[i].id
        entry.setAttribute("id",`${postId}`)
        entry.classList.add("entrybox")
        time.classList.add("timePosted")
        commentsInput.classList.add("commentsInput")
        commentsDiv.classList.add("commentsDiv")
        
        entry.appendChild(body)
        author.appendChild(time)
        body.appendChild(author)
        body.appendChild(message)
        body.appendChild(gif)
        entriesFeed.appendChild(entry)   

        //emoji 
        emojiDiv.appendChild(unhideComments)
        emojiDiv.appendChild(emoji1Button)
        emojiDiv.appendChild(emoji1count)
        emojiDiv.appendChild(emoji2Button)
        emojiDiv.appendChild(emoji2count)
        emojiDiv.appendChild(emoji3Button)
        emojiDiv.appendChild(emoji3count)

        // comments
        entry.appendChild(emojiDiv)
        entry.appendChild(commentsDiv)
        commentsDiv.appendChild(commentsInput)
        commentsDiv.appendChild(commentsBtn)
        commentsDiv.appendChild(commentsEntryDiv)

        commentsDiv.setAttribute("id", `commentsDiv${postId}`)
        commentsDiv.classList.add("hidden")

        unhideComments.addEventListener("click", (e) => {
            e.preventDefault()
            const targetCommentsDiv = document.getElementById(`commentsDiv${postId}`)
            commentsDiv.classList.toggle("hidden")
        })

        commentsBtn.addEventListener("click",(e) => {
            e.preventDefault()
            // console.log(e)
            const input = e.target.previousSibling.value
            addComment(postId, input)
        })
        const result = await fetch(`http://localhost:3000/journal/${postId}`)   
        const data = await result.json()
        console.log(data)
        emoji1count.textContent = data.emoji[0].counter
        emoji2count.textContent = data.emoji[1].counter
        emoji3count.textContent = data.emoji[2].counter

        emoji1Button.addEventListener("click", async (e) => {
            e.preventDefault()
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    id: postId, 
                    emojiId: 1,
                    count: data.emoji[0].counter
                    
                })
            }
            fetch(`http://localhost:3000/journal/${postId}/emoji/1`, options)
            emoji1count.textContent = data.emoji[0].counter + 1
        })   
        emoji2Button.addEventListener("click", async (e) => {
            e.preventDefault()
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    id: postId, 
                    emojiId: 2,
                    count: data.emoji[1].counter
                    
                })
            }
            fetch(`http://localhost:3000/journal/${postId}/emoji/2`, options)
            emoji2count.textContent = data.emoji[1].counter + 1
        })  
        emoji3Button.addEventListener("click", async (e) => {
            e.preventDefault()
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    id: postId, 
                    emojiId: 3,
                    count: data.emoji[2].counter
                    
                })
            }
            fetch(`http://localhost:3000/journal/${postId}/emoji/3`, options)
            emoji3count.textContent = data.emoji[2].counter + 1
        })  

        for(let j = 0; j<entriesData[i].comment.length; j++) {
            const commentsMessage = document.createElement("p")
            const commentsMessageDiv = document.createElement("div")
            const commentsMessageAuthor = document.createElement("p")

            // console.log(entriesData[i].comment)
            
            commentsEntryDiv.appendChild(commentsMessageDiv)
            commentsMessageDiv.appendChild(commentsMessageAuthor)
            commentsMessageDiv.appendChild(commentsMessage)
            commentsMessageDiv.classList.add("commentsMsgDiv")

            commentsMessageAuthor.textContent = entriesData[i].comment[j].author
            commentsMessage.textContent = entriesData[i].comment[j].message
            
        }

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
