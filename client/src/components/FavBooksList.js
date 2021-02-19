import React from 'react'

export const FavBooksList = (props) => {
    const {favBooks,remove}=props;
    return (
        <div>
            <h1>My Favorite Books</h1>
            {  favBooks.length>0&&favBooks.map((item,index)=>{
                return <div key={index}>{item.name} <button onClick={e=>remove(item)}>remove</button></div>;   
            })}
        </div>
    )
}
