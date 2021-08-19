import React from 'react';

const content = [
  {
    h5: 'ABOUT',
    p: [
      'How Airbnb works',
      'Newsroom',
      'Airbnb 2021',
      'Investors',
      'Airbnb Plus',
      'Airbnb Luxe',
      'HotelTonight',
      'Airbnb for Work',
      'Made possible by Hosts',
      'Careers',
      "Founders' Letter"
    ]
  },
  {
    h5: 'COMMUNITY',
    p: [
      'Diversity & Belonging',
      'Against Discrimination',
      'Accessibility',
      'Airbnb Associates',
      'Frontline Stays',
      'Guest Referrals',
      'Gift cards',
      'Airbnb.org'
    ]
  },
  {
    h5: 'HOST',
    p: [
      'Host your home',
      'Host an Online Experience',
      'Host an Experience',
      'Responsible hosting',
      'Resource Center',
      'Community Center'
    ]
  },
  {
    h5: 'SUPPORT',
    p: [
      'Help Center',
      'Cancellation options',
      'Neighborhood Support',
      'Trust & Safety'
    ]
  }
];

export default function Footer() {
  return (
    <div
      className='grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 
    py-14 bg-gray-100 text-gray-600'
    >
      {content.map(({ h5, p }) => (
        <div className='space-y-4 text-xs text-gray-800' key={h5}>
          <h5 className='font-bold'>{h5}</h5>
          {p.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
