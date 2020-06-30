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
                    .then(book => patchBookUsers(book))
                    // location.reload()
                        
                }   
            })  
        })
    }

const fetchSpecificBook = specificBook => {
    fetch(booksURL+`/${specificBook}`)
    .then(r => r.json())
    .then(book => getUsers(book)) 
}

const patchBookUsers = book => {
        let myUser = {id:1, username: "pouros"}  
            fetch(booksURL+`/${book.id}`,{
                method:'PATCH', 
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {users: [...book.users, myUser]}
                )
                })
}

const getUsers = (book) => {
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
