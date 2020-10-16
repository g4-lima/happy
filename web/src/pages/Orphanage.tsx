import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo, FiXCircle } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import api from '../services/api';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcons';

import '../styles/pages/orphanage.css';

interface OrphanageParams {
  id: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
}

const Orphanage: React.FC = () => {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api
      .get(`/orphanages/${params.id}`)
      .then(response => setOrphanage(response.data));
  }, [params.id]);

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
            alt="Lar das meninas"
          />

          <div className="images">
            <button className="active" type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              <Map
                center={[-27.2092052, -49.6401092]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[-27.2092052, -49.6401092]}
                />
              </Map>

              <footer>
                <Link to="/app">Ver rotas no Google Maps</Link>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage?.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage?.opening_hours}
              </div>
              <div
                className={
                  orphanage?.open_on_weekends
                    ? 'open-on-weekends'
                    : 'not-open-on-weekends'
                }
              >
                {orphanage?.open_on_weekends ? (
                  <>
                    <FiInfo size={32} color="#39CC83" />
                    <p>
                      Atendemos <br />
                      fim de semana
                    </p>
                  </>
                ) : (
                  <>
                    <FiXCircle size={32} color="#c73737" />
                    <p>
                      Não atendemos <br />
                      fim de semana
                    </p>
                  </>
                )}
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orphanage;
