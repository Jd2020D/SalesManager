import React from 'react'

export const BooksList = (props) => {
    const {books,addToFavBooks}=props;
    return (
        <div>
            <h1>All Books</h1>
            {   books.length>0&&books.map((item,index)=>{
                return <div key={index}>{item.name} <button onClick={()=>addToFavBooks(item)}>Add to Favorite</button></div>;   
            })}
        </div>
    )
}
