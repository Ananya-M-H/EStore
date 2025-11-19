import React from 'react'
import {useSelector} from 'react-redux';

const FavouritesCount = () => {
    const favourites = useSelector(state =>state.favourites);
    const favouriteCount = favourites.length;
    
  return (
    <>
        {favouriteCount > 0 && (
            <span className="absolute top-[2.2rem] left-6 px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                {favouriteCount}
        </span>
        )}
    </>
  )
}

export default FavouritesCount