import React from 'react';
import {useEffect} from 'react';

import {FaHeart ,FaRegHeart} from 'react-icons/fa';
import {useSelector ,useDispatch} from 'react-redux';
import {
    addToFavourites,
    removeFromFavourites,
    setFavourites,
}from '../../redux/features/auth/favourites/favouriteSlice';

import {
    addFavouriteToLocalStorage ,
    removeFavouriteFromLocalStorage,
    getFavouritesFromLocalStorage,

} from  "../../Utils/localStorage"

const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favourites = useSelector(state =>state.favourites) || [];
    const userInfo = useSelector((state) => state.auth.userInfo);
    const userId = userInfo ?._id ||null;

    const isFavourite= favourites.some((p) =>p._id === product._id)

    useEffect (()=>{
        const favouritesFromLocalStorage = getFavouritesFromLocalStorage(userId)
        dispatch(setFavourites(favouritesFromLocalStorage));

    },[dispatch ,userId]);

    const toggleFavourites = ()=>{
      if (isFavourite){
           dispatch(removeFromFavourites({productId: product._id ,userId}));
           //Remove the product from the local storage
           removeFavouriteFromLocalStorage(product._id ,userId);
      }
      else{
        dispatch(addToFavourites({product ,userId}));
        //add the product to localStorage
        addFavouriteToLocalStorage(product ,userId);
      }
    };

  return (
    <div  
    onClick={toggleFavourites}  
    className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavourite ?(
        <FaHeart className="text-pink-500"/>
      ) :(
        <FaRegHeart className="text-white"/>
      )}
    </div>
  );
};

export default HeartIcon

