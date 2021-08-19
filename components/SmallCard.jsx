import React from 'react';
import Image from 'next/image';

export default function SmallCard({ img, name, distance }) {
  return (
    <div
      className='flex items-center m-2 mt-5 space-x-4 
    rounded-xl cursor-pointer hover:bg-gray-100
    hover:scale-105 transition transform duration-200 ease-out'
    >
      <div className='relative w-16 h-16'>
        <Image src={img} layout='fill' className='rounded-lg' />
      </div>

      <div className=''>
        <h2>{name}</h2>
        <h3 className='text-gray-500'>{distance}</h3>
      </div>
    </div>
  );
}
