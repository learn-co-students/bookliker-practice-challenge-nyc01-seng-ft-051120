let booksArray = []

let users;
document.addEventListener("DOMContentLoaded", function() {

   
  fetch("http://localhost:3000/books")
  .then(response => response.json())
  .then(books => {
      books.forEach(book => {
          booksArray.push(book)
          let users = book.users.map(user => user.username).join(" ")
          makeBooks(book)
      })
    }) 
 

   function makeBooks(book){
    const listPanel = document.querySelector('.list-panel')
    const ul = document.getElementById('list')
    let li = document.createElement('li')
    li.innerHTML = `
      <li class="${book.id}">${book.title}</li>
    `
     ul.append(li)
    }


    document.addEventListener('click', function(e){
        if (e.target ='li'){
          booksArray.forEach(book =>{
              if (book.title === e.target.innerText){
                  let showPanel = document.getElementById('show-panel')
                  showPanel.innerHTML = `
                    <h2>${book.title}</h2>
                    <img src="${book.img_url}">
                    <p>${book.description}</p>
                    <h3>
                    ${book.users.map( user => user.username).join(" --   ")}
                    </h3>
                    <button id="${book.id}" type="button">Read Book</button>
                  `
              }
          })
        }
        if (e.target.innerText === "Read Book"){
        
    
               let book = document.getElementsByClassName(`${e.target.id}`)
                let currentUser = {id: 1, username: "pouros"}
                 let formObj = `${book.users}`
                 console.log(formObj)
                
                // fetch(`http://localhost:3000/books/${e.target.id}`, {
                //     method: "PATCH",
                //     headers: {
                //         "content-type": "application/json",
                //         "accept": "application/json"
                //     },
                //     body: JSON.stringify({formObj})
                // })
                // .then(response => response.json())
                // .then(console.log)
             
             }
        
    })

    // document.addEventListener('click', function(e){
    //     if (e.target.innerText === "Read Book"){
        
    
        //    console.log(document.getElementsByClassName(`${e.target.id}`).users)
        //     let currentUser = {id: 1, username: "pouros"}
        //      let formObj = bookUsers(book, currentUser)
            
        //     fetch(`http://localhost:3000/books/${e.target.id}`, {
        //         method: "PATCH",
        //         headers: {
        //             "content-type": "application/json",
        //             "accept": "application/json"
        //         },
        //         body: JSON.stringify({formObj})
        //     })
        //     .then(response => response.json())
        //     .then(console.log)
         
         //}
    //})


function bookUsers(book, object){
    book.users.push(object)

    return book
}

});

