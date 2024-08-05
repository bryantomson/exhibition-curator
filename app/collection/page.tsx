import React from 'react'
import CollectionSummary from '../ui/CollectionSummary'
import NavBar from '../ui/NavBar'
import StartExhibitionButton from '../ui/StartExhibitionButton'

const page = () => {
  return (
    <div>
      <NavBar />
      <a href="/search" className='fixed top-5 right-5'><button className='btn btn-primary'>Add to collection</button></a>

      <CollectionSummary />
      <StartExhibitionButton />
    </div>
  );
}

export default page