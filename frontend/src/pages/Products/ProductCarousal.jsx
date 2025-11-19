import {useGetTopProductsQuery} from '../../redux/api/productApiSlice';
import Message from "../../components/Message";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css' 
import 'slick-carousel/slick/slick-theme.css' 
import moment from 'moment'
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from 'react-icons/fa';

const ProductCarousal = () => {
    const {data: products ,isLoading, error } =useGetTopProductsQuery();
     const settings = {
        dots :false,
        infinite :true,
        speed:500,
        slidesToShow :1,
        slidesToScroll:1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:3000,
     }
  return (
    <div className="mb-4 xl:block lg:block md:block">
        {isLoading ? null: error? (
            <Message variant='danger'>
                {error?.data?.message ||error.message}
            </Message>
        ) : (
            <Slider 
            {...settings}
            className="w-full max-w-[40rem] mx-auto">
                {
                    products.map(({
                        image ,_id ,name ,price ,description ,brand ,createdAt ,numReviews,
                        rating ,quantity,countInStock
                    })=>(
                     <div key={_id}>
                         <img 
                         src={image}
                         alt={name} 
                         className="w-full rounded-lg object-cover h-[30rem]"
                         />
                     <div className="flex gap-8 mt-4">
    {/* Left: Description */}
    <div className="w-1/2">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-lg text-green-600 font-semibold">${price}</p>
        <p className="mt-2">{description.substring(0, 170)}...</p>
    </div>

    {/* Right: Product Meta Info */}
    <div className="w-1/2 space-y-2">
        <h1 className="flex items-center">
         <FaStore className="mr-2 text-white" /> Brand: {brand}
        </h1>
        <h1 className="flex items-center">
         <FaClock className="mr-2 text-white" /> Added: {moment(createdAt).fromNow()}
        </h1>
        <h1 className="flex items-center">
         <FaStar className="mr-2 text-white" /> Reviews: {numReviews}
        </h1>
        <h1 className="flex items-center">
         <FaStar className="mr-2 text-white" /> Rating: {Math.round(rating)}
        </h1>
        <h1 className="flex items-center">
         <FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity}
        </h1>
        <h1 className="flex items-center">
         <FaBox className="mr-2 text-white" /> In Stock: {countInStock}
        </h1>
      </div>
    </div>
</div>
             
                ))}               
            
          </Slider> 

          )}
    </div>
  );
};

export default ProductCarousal