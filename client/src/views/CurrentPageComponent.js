import React from 'react'
import MapPanel from './MapPanel';
import CustomerTable from "./CustomerTable";
export const CurrentPageComponent = ({
    currentPageNumber,
    user
}) => {
    return currentPageNumber===0?<MapPanel user={user}/>
    :currentPageNumber===1?<div>this is dealers component</div>
    :currentPageNumber===2?<div><CustomerTable/></div>
    :''
}

