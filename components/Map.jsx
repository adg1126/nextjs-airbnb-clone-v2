import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

export default function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map(({ lat, long }) => ({
    latitude: lat,
    longitude: long
  }));

  const handleViewportChange = newViewport => {
    setViewport(newViewport);
  };

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/adg1126/cksfmf0bbmxth17pli3isqhaf'
      mapboxApiAccessToken={process.env.mapbox_access_token}
      {...viewport}
      onViewportChange={handleViewportChange}
    >
      {searchResults.map((location, i) => (
        <div key={i}>
          <Marker
            longitude={location.long}
            latitude={location.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div
              onClick={() =>
                location.lat === selectedLocation?.lat
                  ? setSelectedLocation({})
                  : setSelectedLocation(location)
              }
              className='cursor-pointer bg-white py-2 px-4 rounded-full'
            >
              <p className='text-lg font-bold'>{location.price}</p>
            </div>
          </Marker>

          {location.lat === selectedLocation.lat ? (
            <Popup latitude={location.lat} longitude={location.long}>
              <div className='flex flex-col w-80'>
                <div className='relative h-60'>
                  <Image
                    src={location.img}
                    layout='fill'
                    className='mapImage'
                  />
                </div>
                <div className='flex flex-col mx-6 my-5 space-y-2'>
                  <div className='flex items-center'>
                    <StarIcon className='h-5 text-red-400' />
                    <p className='text-bold lg:text-md'>{location.star}</p>
                  </div>
                  <h4 className='text-xl text-bold'>{location.title}</h4>
                  <h4 className='text-md break-words'>
                    {location.description}
                  </h4>
                  <p className='text-lg font-semibold pb-2 lg:text-2xl'>
                    {location.price}
                  </p>
                </div>
              </div>
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
  );
}
