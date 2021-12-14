

const form = document.querySelector('form');
const chatsFeed = document.querySelector('.chats');


// This event listener gets user input from the form in index.html
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get("message")
    const gif = formData.get("search") // search targets the gif api

    const chat = {
        message,
        gif
    };

    console.log(chat);
    
});

// function to retrieve an API
document.addEventListener("DOMContentLoaded", sendApiRequest);
function sendApiRequest(){
   
    
    document.getElementById("btnSearch").addEventListener("click", e => {
        e.preventDefault();
        
        var apiKey = "74d7MBRbZL0YmhJiyOtbVF20N7j0XfUx"
        var userInput = document.getElementById("search").value.trim();
        console.log(userInput)
        var giphyURL = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=`
        giphyURL = giphyURL.concat(userInput)
        console.log(giphyURL);

        fetch(giphyURL)
            .then(response => response.json())
            .then(content => {
                // DataTransfer, pagination, meta
                console.log(content.data);
                console.log("META", content.meta);
                let fig = document.createElement("figure");
                let img = document.createElement("img");
                // let fc = document.createElement("figcaption");
                img.src = content.data[Math.floor(Math.random() * 5)].images.downsized.url;
                img.alt = content.data[0].title;
                // fc.textContent = content.data[0].title;
                fig.appendChild(img);
                // fig.appendChild(fc);
                let out = document.querySelector("#out");
                out.insertAdjacentElement("afterbegin", fig);
                document.querySelector("#search").value = "";



                       
            })
            .catch(err =>{
                console.log(err)
            })
        
        // fetch(giphyURL).then(function(data){
        //       return data.JSON()
        //     })
        //     .then(function(json){
        //           console.log(json.data[0].images.fixed_height.url) 
        //           var imgPath = json.data[0].images.fixed_height.url
        //           var img = document.createElement("img")
        //           img.setAttribute("src", imgPath)
        //           document.body.appendChild(img)
                
            })
  };