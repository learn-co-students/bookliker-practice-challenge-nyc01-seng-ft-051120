document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = 'http://localhost:3000'
    const booksURL = 'http://localhost:3000/books'
    // const usersUrl = 'http://localhost:3000/users'
    const listPanel = document.querySelector("#list-panel")
    const showPanel = document.querySelector("#show-panel")


    const fetchBooks = () => {
        fetch(booksURL)
        .then(r => r.json())
        .then(books => {
            books.forEach(book => {
                const bookLi = document.createElement("li")
                bookLi.className = "book"
                bookLi.dataset.id = book.id
                bookLi.innerText = `${book.title}`
                listPanel.append(bookLi)
            })

            document.addEventListener("click", e => {
               if (e.target.className === "book"){ 
                   let specificBook = e.target.dataset.id                 
                    fetchSpecificBook(specificBook)           
                } else if (e.target.textContent === 'Read Book'){
                    console.log(e.target);
                    let bookId = e.target.id
               
                    fetch (booksURL+`/${bookId}`)
                    .then(r => r.json())
                    .then(book => toggleLikeBookUsers(book))
                    
                        
                }   
            })  
        })
    }

const fetchSpecificBook = specificBook => {
    fetch(booksURL+`/${specificBook}`)
    .then(r => r.json())
    .then(book => renderBook(book)) 
}

const toggleLikeBookUsers = book => {
        let myUser = {id:1, username: "pouros"}; 
        let updatedUsers
        // conditional for users array
        if (book.users.find(user => user.id === 1)){
            console.log("true")
            // remove self from users
            updatedUsers = book.users.filter(user => user.id != 1)
        } else { 
            // add me to users
            updatedUsers = [...book.users, myUser];            
        }

        let updatedBook = book;
        updatedBook.users = updatedUsers

        fetch(booksURL+`/${book.id}`,{
            method:'PATCH', 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({users: updatedUsers})
            })
        .then(console.log(updatedBook) || renderBook(updatedBook))
        
                
}

const renderBook= (book) => {
    let users = book.users.map(user => {
        return `<p class='user'>${user.username}</p>`
    })
        showPanel.innerHTML = `
        <h4>${book.title}</h4>
        <img src='${book.img_url}'>
        <p>${book.description}</p>
        ${users.join("")}
        <button id='${book.id}'>Read Book</button>
        `
    }


 
fetchBooks();
});
