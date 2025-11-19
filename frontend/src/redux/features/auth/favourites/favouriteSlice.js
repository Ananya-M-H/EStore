import {createSlice} from '@reduxjs/toolkit';
import { logout, setCredentials } from "../authSlice";

const favouriteSlice =createSlice({
    name:'favourites',
    initialState:[],
    reducers:{
        addToFavourites: (state,action)=>{
            const { product, userId } = action.payload;
             
            //Check if the product is not already favourites
            if (!state.some((p) =>p._id===product._id)){
                 state.push(product)
            }
             const key = userId ? `favourites_${userId}` : "favourites_guest";
             localStorage.setItem(key, JSON.stringify(state));
          },
    
        removeFromFavourites :(state ,action) =>{
            //Remove the product with matching ID
              const { productId, userId } = action.payload;

             const newState = state.filter((p) => p._id !== productId);

             const key = userId ? `favourites_${userId}` : "favourites_guest";
             localStorage.setItem(key, JSON.stringify(newState));

             return newState;
           // return state.filter((product)=>product._id !== action.payload._id)
        },

        setFavourites: (state ,action)=>{
            return action.payload
        },
      },

      extraReducers: (builder) => {
    builder
      .addCase(logout, () => {
        // only clear guest favourites
        localStorage.removeItem("favourites_guest");
        return [];
      })
      .addCase(setCredentials, (state, action) => {
        const userId = action.payload._id;
        const savedFavourites = localStorage.getItem(`favourites_${userId}`);
        return savedFavourites ? JSON.parse(savedFavourites) : [];
      });
  },
});

export const {addToFavourites ,removeFromFavourites,setFavourites} =favouriteSlice.actions;
export const selectFavouriteProduct = (state) =>state.favourites;
export default favouriteSlice.reducer;

