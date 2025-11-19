import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../../../Utils/cart.js';
import { logout, setCredentials } from '../auth/authSlice.js';

// const initialState= localStorage.getItem('cart')? 
//  JSON.parse(localStorage.getItem("cart"))
//  :{cartItems:[] ,shippingAddress: {} ,paymentMethod: "PayPal"};

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userId = userInfo?._id || null;

const initialState = localStorage.getItem(userId ? `cart_${userId}` : "cart_guest")
  ? JSON.parse(localStorage.getItem(userId ? `cart_${userId}` : "cart_guest"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

// export const loadUserCart = (userId) => {
//   if (!userId) return { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

//   const savedCart = localStorage.getItem(`cart_${userId}`);
//   return savedCart
//     ? JSON.parse(savedCart)
//     : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
// };
 
const cartSlice =createSlice({
    name:'cart',
    initialState,

    
    reducers:{
        addToCart :(state ,action) =>{
            // first destructure : meaning ,I only want all these items except these
            const {user ,rating, numReviews ,reviews, ...item}= action.payload
            const existItem =state.cartItems.find((x)=> x._id===(item._id));

            if (existItem){
                state.cartItems= state.cartItems.map((x)=>
                    x._id===existItem._id? item :x);
            } 
            else{
                state.cartItems = [...state.cartItems ,item];
            }

            const currentUserId =
         JSON.parse(localStorage.getItem("userInfo"))?._id || null;
         return updateCart(state, currentUserId); // ✅ Save per user
    },

         //   return updateCart(state ,item)

        removeFromCart : (state ,action) =>{
            state.cartItems =state.cartItems.filter((x)=> x._id != action.payload);
            const currentUserId =
            JSON.parse(localStorage.getItem("userInfo"))?._id || null;
            return updateCart(state ,currentUserId);
        },

        //to save shipping address
        saveshippingAddress: (state ,action)=>{
            state.shippingAddress = action.payload
            const currentUserId =
              JSON.parse(localStorage.getItem("userInfo"))?._id || null;
            localStorage.setItem(
                currentUserId?`cart_${currentUserId}`: "cart_guest" ,
                JSON.stringify(state)
            );
        },

        savepaymentMethod: (state ,action)=>{
            state.paymentMethod = action.payload;
            const currentUserId =
               JSON.parse(localStorage.getItem("userInfo"))?._id || null;
            localStorage.setItem(
                currentUserId? `cart_${currentUserId}` :"cart_guest",
                JSON.stringify(state))
        },

        clearCartItems: (state ,action)=>{
            state.cartItems = [];
             const currentUserId =
           JSON.parse(localStorage.getItem("userInfo"))?._id || null;
           localStorage.setItem(
             currentUserId ? `cart_${currentUserId}` : "cart_guest",
        JSON.stringify(state)
      );
        },

        resetCart: () =>({
        cartItems: [], shippingAddress: {},
         paymentMethod: "PayPal" ,
        }),
        },
         
        extraReducers: (builder) => {
    builder
      .addCase(logout, () => ({
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "PayPal",
      }))
      .addCase(setCredentials, (state, action) => {
        const userId = action.payload._id;
        const savedCart = localStorage.getItem(`cart_${userId}`);
        return savedCart
          ? JSON.parse(savedCart)
          : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
      });
    },

});


export const {
    
    addToCart ,
    removeFromCart ,
     saveshippingAddress,
     savepaymentMethod ,
     clearCartItems,
     resetCart ,
     
    }  = cartSlice.actions;

export default cartSlice.reducer;
