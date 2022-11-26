import React from 'react'
import Notes from './Notes';

const Home = (props) => {

  const {showAlert, userDetail } = props;

  return (
    <>
    <div className="container">
      <Notes showAlert={showAlert} userDetail={userDetail} />
      </div>
    </>
  )
}

export default Home