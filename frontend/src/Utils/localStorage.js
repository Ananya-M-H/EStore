//Add a product to a localStorage
// export const addFavouriteToLocalStorage = (product)=>{
//     const favourites = getFavouritesFromLocalStorage()
//     if(!favourites.some((p)=> p._id=== product._id)){
//         favourites.push(product);
//         localStorage.setItem('favourites' ,JSON.stringify(favourites));

//     }
// };

export const addFavouriteToLocalStorage = (product, userId = null) => {
  const key = userId ? `favourites_${userId}` : "favourites_guest";

  const favourites = getFavouritesFromLocalStorage(userId);

  if (!favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
    localStorage.setItem(key, JSON.stringify(favourites));
  }
};


//Remove product from localStorage
// export const removeFavouriteFromLocalStorage= (productId)=>{
//       const favourites = getFavouritesFromLocalStorage()
//       const updatedFavourites =favourites.filter(
//         (product) =>product._id !==productId
//       );
//         localStorage.setItem('favourites' ,JSON.stringify(updatedFavourites));

// }
export const removeFavouriteFromLocalStorage = (productId, userId = null) => {
  const key = userId ? `favourites_${userId}` : "favourites_guest";

  const favourites = getFavouritesFromLocalStorage(userId);
  const updatedFavourites = favourites.filter((p) => p._id !== productId);

  localStorage.setItem(key, JSON.stringify(updatedFavourites));
};
//Retrieve favourites from a localStorage

// export const getFavouritesFromLocalStorage =()=>{
//     const favouritesJSON =localStorage.getItem('favourites');
//     return favouritesJSON? JSON.parse(favouritesJSON) :[];
// };

export const getFavouritesFromLocalStorage = (userId = null) => {
  const key = userId ? `favourites_${userId}` : "favourites_guest";
  const favouritesJSON = localStorage.getItem(key);
  return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};
