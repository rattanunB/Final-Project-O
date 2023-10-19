import React from 'react'
import HomeBottom from '../../components/HomeBottom/HomeBottom'
import HomeTop from '../../components/HomeTop/HomeTop'

const HomePage = ({auth}) => {
  return (
    <div>
        <HomeTop auth={auth}/>
        <HomeBottom/>
    </div>
  )
}

export default HomePage