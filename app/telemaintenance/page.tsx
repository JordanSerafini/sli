import React from 'react'
import Image from 'next/image'
import ISLInput from './ISLinput'

function Telemaintenance() {
  return (
    <div className='telemaintenance'>
      <Image className='img_telemaintenance' src="/assets/staff_sav.webp" alt="telemaintenance" width={350} height={350} />
      <ISLInput />
    </div>
  )
}

export default Telemaintenance