document.addEventListener("DOMContentLoaded", function() {
// DECLARE VARIABLES HERE
let ul = document.getElementById("list")
let showPanel = document.getElementById('show-panel')
const allBooks =()=>{fetch('http://localhost:3000/books')
.then (resp => resp.json())
.then (json => json.forEach(books => renderBooks(books)))}

const renderBooks = (books) =>{
 let li = document.createElement('li')
li.dataset.id = books.id 
li.innerText = books.title
ul.append(li)
}

document.addEventListener('click',function(e) {
  if (e.target.localName== "li" ){
  console.log(e.target.dataset.id)
  const specificBook=()=>{fetch(`http://localhost:3000/books/${e.target.dataset.id}`)
  .then (resp => resp.json())
  .then (json => oneUser(json))}
 specificBook() }
  function oneUser(json){
    showPanel.dataset.bookId = json.id
    showPanel.innerHTML=`<h3>${json.title}</h3>
    <img src = ${json.img_url}/>
    <p>${json.description}</p>
    <button>like</button> 
    `
    json.users.forEach(user =>{
      let div = document.createElement('div')
      div.innerText = user.username
      div.dataset.id = user.id
      showPanel.append(div)
    })
  }

  if(e.target.innerText== "like"){
    let userMe = {id:1,username:"pouros"}
    fetch(`http://localhost:3000/books/${e.target.parentNode.dataset.bookId}`, {
method: 'PATCH',
body: JSON.stringify({
users: userMe
}),
headers: {
"Content-type": "application/json"
}
})
.then(response => response.json())
.then(json => console.log(json))
      console.log(e.target.parentNode.dataset.bookId)
    }
})

//CALL FUNCTIONS HERE

allBooks()

});
