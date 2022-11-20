import React from 'react'
import Notes from './Notes';

const Home = (props) => {

  const {showAlert, userDetail } = props;

  return (
    <>
      <Notes showAlert={showAlert} userDetail={userDetail} />
    </>
  )
}

export default Home