import React from 'react'
import {useState} from 'react';
import {AiOutlineHome ,AiOutlineShopping ,AiOutlineLogin ,AiOutlineUserAdd ,AiOutlineShoppingCart} from 'react-icons/ai';
import {FaHeart} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './Navigation.css';
import {useSelector ,useDispatch} from 'react-redux';
import {useLogoutMutation} from '../../redux/api/usersApiSlice';
import {logout} from '../../redux/features/auth/authSlice';
import FavouritesCount from '../Products/FavouritesCount';

const Navigation = () => {
   const {userInfo} =useSelector((state)=>state.auth);
   const {cartItems} = useSelector((state)=> state.cart);

    const [dropdownOpen , setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () =>{
        setDropdownOpen(!dropdownOpen);
    }

    const toggleSidebar = () =>{
        setShowSidebar(!showSidebar);
    }
    
    const closeSidebar = () =>{
        setShowSidebar(false);
    }

    const dispatch =useDispatch();
    const navigate =useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler =async()=>{
      try{
           await logoutApiCall().unwrap();
           dispatch(logout());
           navigate("/login");
      }
      catch(error){
           console.log(error);
      }
    }

  return (
    <div>
       <button
        className="lg:hidden fixed top-4 left-4 z-[1000] text-white bg-[#899499] p-2 rounded"
        onClick={toggleSidebar}
      >
        ☰
      </button>
   
    <div style={{zIndex :999}} className={`${showSidebar ?"flex" :"hidden"} lg:flex
    flex-col justify-between p-4 text-white
     justify-between p-4 bg-black w-[60%] sm:w-[40%] md:w-[30%] lg:w-[4%] lg:hover:w-[15%] h-[100vh] fixed transition-all duration-300`}
    id='navigation-container'
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link 
        to='/'
        className="flex items-center transition-transform 
        hover:translate-x-2"
        >
           <AiOutlineHome className ="mr-2 mt-[3rem]" size={26}/>
           <span className="hidden nav-item-name mt-[3rem]">HOME</span>{""}
        </Link>

        <Link 
        to='/shop'
        className="flex items-center transition-transform 
        hover:translate-x-2"
        >
           <AiOutlineShopping className ="mr-2 mt-[3rem]" size={26}/>
           <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{""}
        </Link>

        <Link 
        to='/cart'
        className="flex items-center relative transition-transform
        hover:translate-x-2"
        >
           <AiOutlineShoppingCart className ="mr-2 mt-[3rem]" size={26}/>
           <span className="hidden nav-item-name mt-[3rem]">CART</span>
          
               {cartItems.length >0 && (
                     <span className=" absolute top-[2.2rem] left-6 px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                        {cartItems.reduce((a ,c)=> a + c.qty ,0)}
                     </span>
                  )}
        </Link>

        <Link 
          to='/favourite'
          className="flex items-center relative transition-transform hover:translate-x-2"
        >
           <FaHeart className ="mr-2 mt-[3rem]" size={26}/>
           <span className="hidden nav-item-name mt-[3rem]">Favourite</span>

         <FavouritesCount/>
        </Link>
      </div>
         <div className="relative">
            <button type="button"
            onClick={toggleDropdown} className="flex items-center text-gray-8000 focus:outline-none">
             {userInfo ?(
               <span className ="text-white">{userInfo.username}</span>
             ): (
             <></>
             )}
               {userInfo && (
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${
                      dropdownOpen ? " rotate-180" :"rotate-0"
                  }`}
                fill ="none"
                viewBox ="0 0 24 24"
                stroke ="white"
                >

               <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d={dropdownOpen ?"M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
               />
               </svg>
               )}
            </button>

               {dropdownOpen && userInfo && (
                  // absolute right-0 bottom-full mb-2
                  //                 w-40 max-w-[80vw] sm:w-48 md:w-56   
                  //                 space-y-2 bg-[#899499] text-white rounded shadow-lg z-50
                                 <ul className= {` absolute bottom-full mt-2 left-1/2 -translate-x-1/2
      w-40 max-w-[90vw] sm:w-48 md:w-56
      space-y-2 bg-[#899499] text-white rounded shadow-lg z-50  text-center
                                  
                  `}
                  >
                   {userInfo.isAdmin && (
                     <>
                     <li>
                        <Link to='/admin/dashboard' className="block px-4 py-2 text-sm hover:bg-gray-700">
                          Dashboard
                        </Link>
                     </li>

                     <li>
                        <Link to='/admin/productlist' className="block px-4 py-2 text-sm hover:bg-gray-700">
                          Products
                        </Link>
                     </li>

                     <li>
                        <Link to='/admin/categorylist' className="block px-4 py-2 text-sm hover:bg-gray-700">
                          Category
                        </Link>
                     </li>

                     <li>
                        <Link to='/admin/orderlist' className="block px-4 py-2 text-sm hover:bg-gray-700">
                          Orders
                        </Link>
                     </li>

                     <li>
                        <Link to='/admin/userlist' className="block px-4 py-2 text-sm hover:bg-gray-700">
                          Users
                        </Link>
                     </li>
                     </>
                   )}

     {/* This is if user is not an admin */}
                     <li>
                        <Link to='/profile' className="block px-4 py-2 text-sm hover:bg-gray-700">
                          Profile
                        </Link>
                     </li>

                     <li>
                        <button onClick={logoutHandler} className="block px-4 py-2 text-sm bg-[#848884] hover:bg-gray-700 text-center">
                          Logout
                        </button>
                     </li>
                  </ul>
               )}
         </div>

         {!userInfo && (
              <ul>
              <li>
              <Link 
              to='/login'
              className="flex items-center transition-transform 
              hover:translate-x-2"
              >
                 <AiOutlineLogin className ="mr-2 mt-[3rem]" size={26}/>
                 <span className="hidden nav-item-name mt-[3rem]">Login</span>{""}
      
              </Link>
              </li>
      
      
              <li>
              <Link 
              to='/register'
              className="flex items-center transition-transform 
              hover:translate-x-2"
              >
                 <AiOutlineUserAdd  className ="mr-2 mt-[3rem]" size={26}/>
                 <span className="hidden nav-item-name mt-[3rem]">Register</span>{""}
      
              </Link>
              </li>

            </ul>
         )}
    </div>
     </div>
  )
}

export default Navigation