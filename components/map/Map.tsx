/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import GoogleMapReact from 'google-map-react'
import { SiGooglemaps } from 'react-icons/si'

const handleMarkerClick = (e: React.MouseEvent<SVGElement>) => {
  console.log(e)
}

const handleMouseEnter = (e: React.MouseEvent<SVGElement>) => {
  e.currentTarget.setAttribute('fill', '#FF2400')
}

const handleMouseOut = (e: React.MouseEvent<SVGElement>) => {
  e.currentTarget.setAttribute('fill', '#472b77')
}

const LocationPin = ({ text }: { text: string }) => (
  <div className="pin">
    <SiGooglemaps
      style={{ fontSize: '34px', color: '#472b77' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      onClick={handleMarkerClick}
    />
    <p className="pin-text" style={{ color: 'black' }}>
      {text}
    </p>
  </div>
)

//@ts-ignore
const Map = ({ location, zoomLevel, name }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_TOKEN ?? 'no-token',
        }}
        defaultCenter={location}
        center={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          // lat={location.lat}
          // lng={location.lng}
          text={name ?? 'Marker Text'}
        />
      </GoogleMapReact>
    </div>
  </div>
)

export default Map
