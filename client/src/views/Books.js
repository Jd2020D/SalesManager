import React,{useState,useEffect} from 'react'
import { BooksList } from '../components/BooksList'
import axios from 'axios';
import { FavBooksList } from '../components/FavBooksList';

const Books = (props) => {
    const {books:userBooks ,userId}=props;
    const   [books, setBooks]  = useState([]);
    const   [favBooks, setFavBooks]  = useState(userBooks);
    useEffect(() => {
        axios.get("http://localhost:8000/api/books",{withCredentials:true})
            .then(response=>{
                //let test = [...books, response.data]
                setBooks(response.data.filter(book=>!favBooks.some(favBook=>book._id==favBook._id)))
            })
            .catch(err=>console.log(err))
        
    }, [])
    const removeAddedBookFromDom=(bookId)=>{
        setBooks(books.filter(book=>book._id!=bookId));
    }
    const resetBook=book=>{
        setBooks([...books,book])
    }
    const removeFavBook=async(book)=>{
        const errorArr = [];
        await axios.post("http://localhost:8000/api/user/"+userId+"/removeFavBook",book,{withCredentials:true})
            .then((response) => {setFavBooks(response.data.books);resetBook(book);})
            .catch(err =>{
                console.log(err.response.data.errors)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
            })
        return {errors:errorArr};

    }
    const addToFavBooks=async(book)=>{
            const errorArr = [];
            await axios.post("http://localhost:8000/api/user/"+userId+"/addFavBook",book,{withCredentials:true})
                .then((response) => {removeAddedBookFromDom(book._id);setFavBooks(response.data.books);})
                .catch(err =>{
                    console.log(err.response.data.errors)
                    const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                    for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                        errorArr.push(errorResponse[key].message)
                    }
                })
            return {errors:errorArr};
        
    
        // setFavBooks([...favBooks,book]);

    }
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <BooksList books={books} addToFavBooks={addToFavBooks}/>
            <FavBooksList remove={removeFavBook} favBooks={favBooks}/>
        </div>
    )
}

export default Books
