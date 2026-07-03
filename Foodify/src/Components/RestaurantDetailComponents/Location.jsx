import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import deliveryIcon from '../../assets/Tracking.png';
import contactIcon from '../../assets/ID Verified.png';
import clockIcon from '../../assets/Clock.png';
import pinMarker from '../../assets/Previous Location.png';

// Hardcoded for now — will be replaced by API-driven data later.
// Shape mirrors what the future restaurant object will look like.
const restaurant = {
  name: "McDonald's East London",
  hours: {
    delivery: [
      { day: 'Monday', time: '12:00 AM–3:00 AM, 8:00 AM–3:00 AM' },
      { day: 'Tuesday', time: '8:00 AM–3:00 AM' },
      { day: 'Wednesday', time: '8:00 AM–3:00 AM' },
      { day: 'Thursday', time: '8:00 AM–3:00 AM' },
      { day: 'Friday', time: '8:00 AM–3:00 AM' },
      { day: 'Saturday', time: '8:00 AM–3:00 AM' },
      { day: 'Sunday', time: '8:00 AM–12:00 AM' },
    ],
    operational: [
      { day: 'Monday', time: '8:00 AM–3:00 AM' },
      { day: 'Tuesday', time: '8:00 AM–3:00 AM' },
      { day: 'Wednesday', time: '8:00 AM–3:00 AM' },
      { day: 'Thursday', time: '8:00 AM–3:00 AM' },
      { day: 'Friday', time: '8:00 AM–3:00 AM' },
      { day: 'Saturday', time: '8:00 AM–3:00 AM' },
      { day: 'Sunday', time: '8:00 AM–3:00 AM' },
    ],
  },
  estimatedDeliveryMins: 20,
  allergyNote:
    'If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.',
  phone: '+934443-43',
  website: 'http://mcdonalds.uk/',
  // Real coordinates — Tooley St, London Bridge, SE1 2TF
  location: { lat: 51.5045, lng: -0.0865 },
  mapCard: {
    name: "McDonald's",
    branch: 'South London',
    address: 'Tooley St, London Bridge, London SE1 2TF, United Kingdom',
    phone: '+934443-43',
    website: 'http://mcdonalds.uk/',
    // Real coordinates for the nearby branch shown as a pin on the map
    location: { lat: 51.4980, lng: -0.0910 },
  },
};

// Custom pin icon for the nearby-branch marker (matches Figma's pin graphic)
const nearbyPinIcon = new L.Icon({
  iconUrl: pinMarker,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const Location = () => {
  return (
    <div className="w-full flex flex-col gap-6 lg:gap-8 px-4 lg:px-0">

      {/* ── Info row: Delivery / Contact / Operational Times ── */}
      <div className="w-full max-w-[1528px] mx-auto rounded-[12px] shadow-[5px_5px_14px_0px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col lg:flex-row bg-[#fbfbfb]">

        {/* Delivery information */}
        <div className="flex-1 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-black/10">
          <div className="flex items-center gap-3 mb-4">
            <img src={deliveryIcon} alt="" className="w-[32px] h-[32px] lg:w-[45px] lg:h-[45px] object-contain" />
            <h3 className="text-[18px] lg:text-[22px] font-bold text-[#03081F]">Delivery information</h3>
          </div>
          <ul className="flex flex-col gap-2 text-[13px] lg:text-[15px] text-[#03081F]">
            {restaurant.hours.delivery.map((row) => (
              <li key={row.day}>
                <span className="font-bold">{row.day}:</span> {row.time}
              </li>
            ))}
            <li className="mt-2">
              <span className="font-bold">Estimated time until delivery:</span> {restaurant.estimatedDeliveryMins} min
            </li>
          </ul>
        </div>

        {/* Contact information */}
        <div className="flex-1 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-black/10">
          <div className="flex items-center gap-3 mb-4">
            <img src={contactIcon} alt="" className="w-[32px] h-[32px] lg:w-[45px] lg:h-[45px] object-contain" />
            <h3 className="text-[18px] lg:text-[22px] font-bold text-[#03081F]">Contact information</h3>
          </div>
          <p className="text-[13px] lg:text-[15px] text-[#03081F] mb-4 leading-relaxed">
            {restaurant.allergyNote}
          </p>
          <p className="text-[13px] lg:text-[15px] text-[#03081F]">
            <span className="font-bold">Phone number</span>
            <br />
            {restaurant.phone}
          </p>
          <p className="text-[13px] lg:text-[15px] text-[#03081F] mt-3">
            <span className="font-bold">Website</span>
            <br />
            <a href={restaurant.website} className="hover:underline">{restaurant.website}</a>
          </p>
        </div>

        {/* Operational Times — dark panel */}
        <div className="lg:w-[496px] bg-[#03081F] text-white p-6 lg:p-10 m-4 rounded-[12px] lg:m-0 lg:rounded-none lg:rounded-r-[12px]">
          <div className="flex items-center gap-3 mb-4">
            <img src={clockIcon} alt="" className="w-[32px] h-[32px] lg:w-[45px] lg:h-[45px] object-contain" />
            <h3 className="text-[18px] lg:text-[22px] font-bold">Operational Times</h3>
          </div>
          <ul className="flex flex-col gap-2 text-[13px] lg:text-[15px]">
            {restaurant.hours.operational.map((row) => (
              <li key={row.day}>
                <span className="font-bold">{row.day}:</span> {row.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Map section — real live map, centered on this restaurant's actual coordinates ── */}
      <div className="relative w-full max-w-[1528px] mx-auto h-[400px] lg:h-[659px] rounded-[12px] overflow-hidden shadow-[5px_5px_14px_0px_rgba(0,0,0,0.25)]">
        <MapContainer
          center={[restaurant.location.lat, restaurant.location.lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%', opacity: 0.9 }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Nearby branch marker — real position on the actual map, not a fixed pixel mockup */}
          <Marker
            position={[restaurant.mapCard.location.lat, restaurant.mapCard.location.lng]}
            icon={nearbyPinIcon}
          >
            <Popup>{restaurant.mapCard.name} {restaurant.mapCard.branch}</Popup>
          </Marker>
        </MapContainer>

        {/* Floating info card */}
        <div
          className="absolute z-[1000] rounded-[12px] p-6 lg:p-8 flex flex-col justify-center text-white"
          style={{
            backgroundColor: 'rgba(3,8,31,0.97)',
            left: '16px',
            top: '16px',
            width: 'calc(100% - 32px)',
            maxWidth: '361px',
          }}
        >
          <h3 className="text-[20px] lg:text-[24px] font-bold">
            {restaurant.mapCard.name}
            <br />
            <span className="text-[#fc8a06]">{restaurant.mapCard.branch}</span>
          </h3>
          <p className="text-[13px] lg:text-[15px] mt-3 leading-relaxed">
            {restaurant.mapCard.address}
          </p>
          <p className="text-[13px] lg:text-[15px] mt-3">
            <span className="font-bold">Phone number</span>
            <br />
            <span className="text-[#fc8a06]">{restaurant.mapCard.phone}</span>
          </p>
          <p className="text-[13px] lg:text-[15px] mt-3">
            <span className="font-bold">Website</span>
            <br />
            <span className="text-[#fc8a06]">{restaurant.mapCard.website}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Location;