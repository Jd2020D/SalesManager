import React from 'react'
export const NavBar = ({
    isAdmin,
    changePage
}) => {
    return (
        <ul>
        <li><a onClick={(e)=>changePage(0)}>Logo</a></li>
        <li><a onClick={(e)=>changePage(0)}>Map</a></li>
        {isAdmin&&<li><a onClick={(e)=>changePage(1)}>Dealers</a></li> }
        {!isAdmin&&<li><a onClick={(e)=>changePage(2)}>Customers</a></li> }
        </ul>

    )
}
