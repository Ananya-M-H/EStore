
export const addDecimals = (num) => {
  return (Math.round(Number(num) * 100) / 100).toFixed(2);
};

// Updates cart totals and saves to localStorage
export const updateCart = (state ,userId=null) => {

  // Ensure we always have numbers for price and qty
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.qty || 0),
    0
  );


  // Calculate totals
  state.itemsPrice = addDecimals(itemsPrice);
  state.shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 50);
  state.taxPrice = addDecimals(0.15 * itemsPrice);
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  );
//   console.log("Calculated itemsPrice:", state.itemsPrice);
//  console.log("Calculated shippingprice:", state.shippingPrice);
//  console.log("Calculated taxPrice:", state.taxPrice);
//  console.log("Calculated totalprice:", state.totalPrice);
  // Save updated cart to localStorage
  const key =userId? `cart_${userId}` : "cart_guest";
  localStorage.setItem(key, JSON.stringify(state));
  

  return state;
};
