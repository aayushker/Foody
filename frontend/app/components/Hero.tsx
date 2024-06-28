import React from 'react'
import Image from 'next/image'
import HeroImage from './uiEle/HeroImage'

const Hero = () => {
  return (
    <div className='flex'>
      <HeroImage />
      <p>Share and learn new recipes</p>
    </div>
  )
}

export default Hero
