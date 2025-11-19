//this has redux 
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {apiSlice} from './api/ApiSlice';
import authReducer from './features/auth/authSlice'; 
import favouritesReducer from "./features/auth/favourites/favouriteSlice.js" 
import {getFavouritesFromLocalStorage} from '../Utils/localStorage';
import shopReducer from '../redux/features/shop/shopSlice.js'
import cartSliceReducer from '../redux/features/cart/cartSlice';

//const initialFavourites = getFavouritesFromLocalStorage() || []

const store = configureStore({
    reducer :{
        [apiSlice.reducerPath]:apiSlice.reducer ,
        auth :authReducer,
        favourites : favouritesReducer,
        cart:cartSliceReducer,
        shop :shopReducer,
    },
    // preloadedState :{ 
    //     favourites : initialFavourites 
    // },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

setupListeners(store.dispatch);
export default store;