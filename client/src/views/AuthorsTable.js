import React, {useState, useEffect} from "react"
import axios from "axios"
import { Link, navigate } from "@reach/router"

const AuthorsTable = props => {
    const [authors, setAuthors] = useState([])

    useEffect( () => {
        axios.get("http://localhost:8000/api/getAllAuthors")
            .then(response => setAuthors((response.data)))
            .catch(error => console.log("There was an issue: ", error))
    },[])
    const removeFromDom = authorId => {
        setAuthors(authors.filter(author => author._id != authorId));
    }

    const deleteProduct = (authorId) => {
        axios.delete('http://localhost:8000/api/authors/delete/' + authorId)
            .then(res => {
                removeFromDom(authorId)
            })
            .catch(err=>console.log(err))
    }
    return(
        <div className="container">
            <table>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Avaliable Actions</th>
                </tr>
            </thead>
            <tbody>
            {authors.sort((a,b) => (a.name > b.name) ? 1 :-1)
            .map((item,index)=>{
                return <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                            <button onClick={(e)=>{navigate("/edit/"+item._id)}}>Edit</button>    
                            <button onClick={(e)=>{deleteProduct(item._id)}}>Delete</button>
                            </td>
                        </tr>
            })}
            </tbody>
            </table>
            <input type="button" value="Please Press here to Add new author" onClick={e=>navigate('/new')}/>

        </div>
    )

}

export default AuthorsTable
