import React from 'react';
import SilidingBar from './SilidingBar';
import Cards from './Cards';

export default function Home() {
  return (
    <div className='select-none'>
      <SilidingBar/>
      <Cards />
    </div>
  )
}
