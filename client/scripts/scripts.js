const form = document.querySelector('form');
const chatsFeed = document.querySelector('.chats');


// This event listener gets user input from the form in index.html
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get("message")
    const name = formData.get("search") // search targets the gif api

    const chat = {
        message,
        gif
    };

    console.log(chat);
    
});

function sendApiRequest(){
    var userInput = document.getElementById("input").value
    console.log(userInput)
    
    var apiKey = "TENxQhBa7uKAOVCw0FQBLIpzRrl1yeEF"
    var giphyURL = `"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${apiKey}&limit=5"`
    
    fetch(giphyURL).then(function(data){
      return data.JSON()
    })
    .then(function(json){
      console.log(json.data[0].images.fixed_height.url) 
      var imgPath = json.data[0].images.fixed_height.url
      var img = document.createElement("img")
      img.setAttribute("src", imgPath)
      document.body.appendChild(img)
    })
  }