import {useEffect} from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch ,useSelector} from 'react-redux';
import Message from '../../components/Message';
import ProgressSteps from '../../components/ProgressSteps';
import Loader from '../../components/Loader';
import {useCreateOrderMutation} from "../../redux/api/orderApiSlice";
import {clearCartItems} from '../../redux/features/cart/cartSlice';


const PlaceOrder = () => {

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    const [createOrder ,{isLoading ,error}] = useCreateOrderMutation()
    
    useEffect(()=>{
         if(!cart.shippingAddress.address){
            navigate('/shipping');
         }
    },[cart.paymentMethod ,cart.shippingAddress.address ,navigate]);

    const dispatch = useDispatch()
    const placeOrderHandler = async () =>{
      try{
       const res = await createOrder({
        orderItems : cart.cartItems ,
        shippingAddress : cart.shippingAddress,
        paymentMethod : cart.paymentMethod,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice : cart.totalPrice
       }).unwrap()
       dispatch(clearCartItems());
       navigate(`/order/${res._id}`);
      }catch(error){
        toast.error(error);
      }
    }
  return (
  <>
    <ProgressSteps step1 step2 step3/>

    <div className="container mx-auto mt-8 px-4">
      {cart.cartItems.length === 0 ? (
        <Message>Your cart is empty</Message>
      ) : (
        <div className="overflow-x-auto"> 
         <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr>
              <th className="px-1 py-2 pl-24 text-left">Image</th>
               <th className="px-1 py-2 text-left">Product</th>
                <th className="px-1 py-2 text-left">Quantity</th>
                <th className="px-1 py-2 text-left">Price</th>
                <th className="px-1 py-2 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.cartItems.map((item ,index)=>(
              <tr key={index} className="border-t">
                <td className="p-2">
                  <img 
                     src={item.image}
                     alt={item.name}
                     className="w-16 h-16 ml-20 md:w-16 md:h-16 object-cover"
                  />
                  </td>

                   <td className="p-2">
                    <Link to= {`/product/${item.product}`}>{item.name}</Link>
                   </td>

                   <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                     <td className="p-2">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
              </tr>
            ))}   
            </tbody>
           </table>
           </div>

          )}
        <div className="mt-8 ml-20">
              
              <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#181818] rounded-lg">
                <ul className="flex flex-col  text-sm md:text-lg">
                  <li>
                    <span className="font-semibold ">Items </span>$
                    {Number(cart.itemsPrice).toFixed(2)}
                  </li>

                  <li>
                    <span className="font-semibold ">Shipping </span>$
                    {Number(cart.shippingPrice).toFixed(2)}
                  </li>

                  <li>
                    <span className="font-semibold">Tax</span>$
                    {Number(cart.taxPrice).toFixed(2)}
                  </li>

                  <li>
                    <span className="font-semibold">Total:</span>$
                    {Number(cart.totalPrice).toFixed(2)}
                  </li>
                </ul>
                
                 <div className="flex-1 space-y-4">
                 {error &&
                  (<Message variant="danger">{error.data.message}</Message>)}
              
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Shipping</h2>
                <p  className="text-sm md:text-base">Shipping
        
                  <strong>Address:</strong>
                  {cart.shippingAddress.address} , {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode}, {" "}
                  {cart.shippingAddress.country} ,{" "}
                 </p>
                </div>

                  <div>
                       <h2 className="text-lg md:text-xl font-semibold">Payment Method</h2>
                        <p className="text-sm md:text-base">
                       <strong>Method: </strong>
                       {cart.paymentMethod}
                       </p>
                  </div>
            </div>
            </div>
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full text-xl w-full
             md:w-auto md:px-10 mt-6 shadow-lg transform transition duration-200 hover:scale-105"
            disabled={cart.cartItems.length===0} 
            onClick={placeOrderHandler}
            >
              Place Order
            </button>

            {isLoading && <Loader/>}
          </div>
    </div>
  
  </>
    )
}

export default PlaceOrder
