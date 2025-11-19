import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    useCreateProductMutation,
    useUploadProductImageMutation,

}from '../../redux/api/productApiSlice';

import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'; 
import {toast} from 'react-toastify';
import AdminMenu from '../Admin/AdminMenu';

const ProductList = () => {
    const [image ,setImage] = useState('');
    const [name ,setName] = useState('');
    const [description ,setDescription] = useState('');
    const [price ,setPrice] =  useState('');
    const [category ,setCategory] = useState('');
    const [quantity ,setQuantity] = useState('');
    const [brand ,setBrand] = useState(''); 
    const [stock ,setStock] = useState('');
    const [imageUrl ,setImageUrl] = useState(null);
    const navigate = useNavigate();
    
    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const {data : categories} = useFetchCategoriesQuery();

    const handleSubmit = async(e)=>{
      e.preventDefault();

      try{
          const productData = new FormData();
          productData.append('image' ,image);
          productData.append('name' ,name);
          productData.append('description' ,description);
          productData.append('price' ,price);
          productData.append('category' ,category);
          productData.append('quantity' ,quantity);
          productData.append('brand' ,brand);
          productData.append('countInStock' ,stock);

          const product = await createProduct(productData).unwrap();
           toast.success(`${product.name} is created`);
           navigate('/');
          
        }catch(error){
         console.error(error);
         toast.error(error?.data?.message || 'Product create failed.Try Again')
      }
    };

    const uploadFileHandler = async (e) =>{
       const formData = new FormData();
       formData.append('image' ,e.target.files[0])

       try{
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);

       }catch(error){
        toast.error(error?.data?.message || error.error)
       }
    }
    

  return (
    <div className= "container xl:mx-[9rem] sm:mx-[0] px-4">
        <div className="flex flex-col md:flex-row">
            <AdminMenu/>
            <div className="md:w-3/4 p-3 md:pl-20">
               <div className="text-xl font-semibold mb-4 ml-24 md:ml-10">
                Create Product
            </div>

            {imageUrl && (
              <div className="text-center mb-4">
                <img src={imageUrl} 
                 alt ="product" 
                 className="block mx-auto max-h-[200px] rounded-md"
                 />
              </div>
            )}

              <div className ="mb-3">
                <label className="border text-white px-4 block w-full text-center rounded-lg curser-pointer font-bold py-4">
                  {image ?image.name : "Upload Image"}

                <input type="file" 
                 name="image"
                 accept="image/*" 
                 onChange={uploadFileHandler} 
                 className= "hidden"
                />
                </label>
              </div>
                 <div className="p-3 space-y-4">
                   <div className="flex flex-col md:flex-row gap-4">
                       <div className="flex-1">
                        <label htmlFor="name">Name</label> <br/>
                        <input
                        type="text" 
                        className="p-3 mb-3 w-full rounded-lg bg-[#101011] text-white"
                        value={name}
                        onChange ={(e)=>setName(e.target.value)}
                        />
                       </div>
                    <div className="flex-1">
                      <label>Price</label> <br/>
                        <input 
                        type="number" 
                        className="  p-3 w-full rounded-lg bg-[#101011] text-white"
                        value={price}
                        onChange ={(e)=>setPrice(Number(e.target.value))}
                        />
                    </div>
                   </div>

                     <div className="flex flex-col md:flex-row gap-4">
                       <div className="flex-1">
                        <label htmlFor="name block">Quantity</label> <br/>
                        <input type="number" 
                        className="p-3 w-[30rem] rounded-lg bg-[#101011] text-white"
                        value={quantity}
                        onChange ={(e)=>setQuantity(Number(e.target.value))}
                        />
                       </div>
                    <div className="flex-1">
                      <label htmlFor="name block">Brand</label> <br/>
                        <input type="text" 
                        className=" p-3 mb-3 w-full rounded-lg bg-[#101011] text-white"
                        value={brand}
                        onChange ={(e)=>setBrand(e.target.value)}
                        />
                    </div>
                    </div>
                   
                   <div>
                    <label>Description</label>
                    <textarea type="text" 
                    className="p-2 w-full bg-[#101011] border rounded-lg  text-white" 
                    rows={4}
                    value={description} 
                    onChange={e=>setDescription(e.target.value)}
                    >
                    </textarea>
                   </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label>Count In Stock</label>  
                      
                        <input type="number" 
                        className="p-3 w-full border rounded-lg bg-[#101011] text-white"
                         value={stock} 
                         onChange={e =>setStock(Number(e.target.value))}/>
                      </div>

                      <div className="flex-1">
                        <label>Category</label>
                        <select
                          placeholder="Choose Category" className="p-3 w-full border rounded-lg bg-[#101011] text-white"        
                          onChange={e => setCategory(e.target.value)}
                        >
                          <option value="">Choose Category</option>
                            {categories?.map((c) =>(
                              <option key= {c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <button 
                        onClick={handleSubmit} 
                        className= "w-full py-3 md:w-auto px-8 mt-5 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition">
                          Create Product
                        </button>
                  </div>
              </div>
            </div>
        </div>
  )
}

export default ProductList;