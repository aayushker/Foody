import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div>
      <Image src={'/images/hero.jpg'} alt='hero' width={1920} height={1080} />
    </div>
  )
}

export default Hero
