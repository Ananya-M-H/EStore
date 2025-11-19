import React from 'react'
import {useGetTopProductsQuery} from '../redux/api/productApiSlice';
import Loader from './Loader';
import SmallProducts from '../pages/Products/SmallProducts';
import ProductCarousal from '../pages/Products/ProductCarousal';

const Header = () => {

    const {data ,isLoading ,error} = useGetTopProductsQuery();
    console.log(data);

    if(isLoading){
        return <Loader />
    }
    if(error){
        return <h1 className="text-red-500">Error loading products</h1>
    }

  return (
    <>
     <div className="block xl:hidden mt-6 px-4">
        <ProductCarousal product={data} />
      </div>

    <div className="hidden xl:grid grid-cols-2 gap-6 px-6 mt-6">
        
            <div className="grid grid-cols-2 gap-4">
                {data &&
                data.map((product)=>(
                    <div key={product._id}>
                        <SmallProducts product ={product}/>
                    </div>
                ))}
            </div>
       
           <div className="flex justify-center items-center ">
            <ProductCarousal product={data}/>
           </div>
        </div>
    </>
  );
};

export default Header;