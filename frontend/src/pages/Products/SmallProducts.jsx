import {Link} from 'react-router-dom';
import HeartIcon from "./HeartIcon";
const SmallProducts = ({product}) => {
    return (
        <div className="w-[20rem] ml-[2rem] p-3">
            <div className="relative">
                <img 
                src={product.image} 
                alt= {product.name} 
                className="w-full h-auto rounded"
                />
                 <HeartIcon product ={product} /> 
                 </div>
            <div className="w-full px-4 pt-2">
                <Link to= {`/product/${product._id}`}>
                
                <div className="flex justify-between items-center">
                 <div className="text-base font-semibold">{product.name}</div>
                        <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5
                         rounded-full dark:bg-pink-900 dark:text-pink-300">
                         ${product.price}
                        </span>
                    </div>
                </Link>
            </div>
            </div>
 
    )
}

export default SmallProducts;
