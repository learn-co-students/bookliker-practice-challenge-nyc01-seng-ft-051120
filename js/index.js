let foundBook

document.addEventListener("DOMContentLoaded", function() {
fetchBooks()
document.addEventListener('click', event=>{
    if(event.target.tagName==='LI'){
        
        console.log(findBook(event.target.id))
    }
    else if(event.target.innerText==="Read Book"){
        console.log('read')
        fetch(`http://localhost:3000/books/${event.target.dataset.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                users: [
                    {"id": 1, "username": "auer"}
                 ]
            })
        })
        .then(res=>res.json())
        .then(console.log)
        .catch(error=>{console.log(error.message)})
    }
})
});

const fetchBooks=()=>{
   fetch('http://localhost:3000/books')
    .then(res=>res.json())
    .then(books=>{
        console.log(books)
        books.forEach(book => {
            
            renderBooks(book)
        });
    });    
    
}

 async function findBook(id){
 const res = await fetch('http://localhost:3000/books');
     const books = await res.json();
     books.forEach(book => {
         if (book.id == id) {
             return book;
         }
     });
    
}

const renderBooks=book=>{
    const ul=document.querySelector('#list')
    const li=document.createElement('li')
    li.innerText=book.title
    li.id=book.id
    ul.appendChild(li)
}

const showBook=(book)=>{
    const panel=document.getElementById('show-panel')
    panel.innerHTML=`<h3>${book.title}</h3>
            <img src='${book.img_url}'>
            <p>${book.description}</p>`
    
    book.users.forEach(user=>{
        const h4=document.createElement('h4')
        h4.innerText=user.username
        panel.appendChild(h4)
    })
    const readBook=document.createElement('button')
    readBook.innerText='Read Book'
    panel.appendChild(readBook)
    readBook.dataset.id=book.id
}