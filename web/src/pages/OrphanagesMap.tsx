import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanage-map.css'

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Logo"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Pará</strong>
          <span>Ananindeua</span>
        </footer>
      </aside>

      <div></div>

      <MapContainer
        center={[
          -1.3564448,
          -48.4221228,
        ]}
        zoom={15}
        style={{
          width: '100%', height: '100%'
        }}
      >
        <TileLayer 
          // url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}
        />
      </MapContainer>

      <Link to='' className='create-orphanage'>
        <FiPlus size={32} color='#fff'/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;