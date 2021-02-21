import React from 'react'
import MapPanel from './MapPanel';
export const CurrentPageComponent = ({
    currentPageNumber,
    user
}) => {
    return currentPageNumber===0?<MapPanel user={user}/>
    :currentPageNumber===1?<div>this is dealers component</div>
    :currentPageNumber===2?<div>this is customers component</div>
    :''
}

