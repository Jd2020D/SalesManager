import React,{useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet'
import '../styles/mapSettings.css';
import L from 'leaflet';
import markerP from '../img/Map_marker.svg';
const iconPerson = new L.Icon({
    iconUrl: markerP,
    iconSize: new L.Point(65, 50),
});

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  
const MyMap = (props) => {
    // const [initialPosition, setInitialPosition] = useState([0,0]);
    const {marker} =props;
    const {initialView} =props
    
    return (
        <>
        <MapContainer zoomControl={false} center={initialView?initialView:[31.991480164920812,35.24500163655797]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}

    </MapContainer>
    
    </>
    )
}

export default MyMap
