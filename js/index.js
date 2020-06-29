document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = 'http://localhost:3000'
    const booksURL = 'http://localhost:3000/books'
    const usersUrl = 'http://localhost:3000/users'
    const listPanel = document.querySelector("#list-panel")
    const showPanel = document.querySelector("#show-panel")
    const bookLi = document.querySelector(".li")

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
                fetch(booksURL+`/${e.target.dataset.id}`)
                .then(r => r.json())
                .then(book => {
                    let users = book.users.map(user => {
                        return `${user.username}`
                    })
                        showPanel.innerHTML = `
                        <h4>${book.title}</h4>
                        <img src='${book.img_url}'>
                        <p>${book.description}</p>
                        <p>Users: ${users}</p>
                        <button id=${book.id}>Read Book</button>
                        `
                    })               
                } else if (e.target.textContent === 'Read Book'){
                    console.log(e.target);
                    let bookId = e.target.id
                
                    fetch (booksURL+`/${bookId}`)
                    .then(r => r.json())
                    .then(book => {
                        book.users.map(user => {
                            let users = {id: user.id,
                                 username: user.username}
                         
                            
                         })
                         
                    
                        
                        
                    }
                    // fetch(booksURL+`/${bookId}`,{
                    //     method: 'PATCH', 
                    //     headers: {
                    //         "content-type": "application/json"
                    //     },
                    //     body: JSON.stringify(
                    //         {
                    //             "users": [
                    //             //   {"id":2, "username":"auer"},
                    //             //   {"id":8, "username":"goodwin"},
                    //               {"id":1, "username":"pouros"},
                                
                    //             ]
                    //           }
                    //     )
                    // })
                    // .then(r => r.json())
                    // .then()
                    
                   
                    
                        )}
                    
            })  
        })
    }

 
 
fetchBooks();
});
