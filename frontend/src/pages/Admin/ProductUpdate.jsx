import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate ,useParams} from 'react-router-dom';
import {useUpdateProductMutation,
       useDeleteProductMutation ,
       useGetProductByIdQuery,
       useUploadProductImageMutation
    } from '../../redux/api/productApiSlice';
    import {useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice';
    import {toast} from 'react-toastify';
    import AdminMenu from './AdminMenu';
    
 const ProductUpdate = () => {
    const params = useParams();

    const {data: productData} = useGetProductByIdQuery(params._id)

    const [image ,setImage] = useState(productData?.image || "");
    const [name ,setName] = useState(productData?.name || "");
    const [description ,setDescription] = useState(productData?.description || '');
    const [price ,setPrice] = useState(productData?.price || '');
    const [quantity ,setQuantity] = useState(productData?.quantity || '');
    const [category ,setCategory] = useState(productData?.category || '');
    const [brand ,setBrand] = useState(productData?.brand || "");
    const [stock ,setStock] = useState(productData?.countInStock||"");

    const navigate = useNavigate();

    const {data: categories = []} = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(()=>{
      if(productData && productData._id){
         setName(productData.name)
         setDescription(productData.description)
         setPrice(productData.price);
         setCategory(productData.categories?._id ||productData.category);
         setQuantity(productData.quantity);
         setBrand(productData.brand);
         setImage(productData.image);
         setStock(productData.countInStock || "");
      }
    } , [productData]);

    const uploadFileHandler = async (e) =>{
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image' ,file);
      try{
           const res = await uploadProductImage(formData).unwrap();
           setImage(res.image);
           toast.success('Image uploaded successfully');
      }catch(error){
        console.error(error);
        toast.error("Item added successfully");
      }
    }

    const handleSubmit = async(e)=>{
          e.preventDefault();
    
          try{
              const formData = new FormData();
              formData.append('image' ,image);
              formData.append('name' ,name);
              formData.append('description' ,description);
              formData.append('price' ,price);
              formData.append('category' ,category);
              formData.append('quantity' ,quantity);
              formData.append('brand' ,brand);
              formData.append('countInStock' ,stock);
    
              const product = await updateProduct({productId: params._id ,formData}).unwrap();
               toast.success(`${product.name} successfully updated`);
               navigate('/admin/allproductslist');
              
            }catch(error){
             console.error(error);
             toast.error(error?.data?.message || 'Product update failed.Try Again')
          }
        };

        const handleDelete = async() =>{
          try{
            let answer = window.confirm('Are you sure you want to delete this product?');

            if(!answer) return ;
            const {data} = await deleteProduct(params._id);
            toast.success(`${data.name} is deleted`);
            navigate("/admin/allproductslist");
          }catch(error){
            console.log(error);
            toast.error("Delete failed.Try Again");
          }
        }
  return (
    <div>ProductUpdate
       <div className= "container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
            <AdminMenu/>
            <div className="md:w-3/4 p-3">
               <div className="h-12">Create Product</div>

            {image && (
              <div className="text-center">
                <img src={image} 
                 alt ="product" 
                 className="block mx-auto max-h-[200px] "
                 />
              </div>
            )}

              <div className ="mb-3">
                <label className="border text-white px-4 block w-full text-center rounded-lg curser-pointer font-bold py-11">
                  {typeof image === 'string'? 'Change Image': image?.name || "Upload Image"}

                <input type="file" 
                name="image"
                 accept="image/*" 
                onChange={uploadFileHandler} 
                className={!image ? 'hidden' : "text-white"}
                />
                </label>
              </div>
                 <div className="p-3">
                   <div className="flex flex-wrap">
                       <div className="one">
                        <label htmlFor="name">Name</label> <br/>
                        <input type="text" 
                        className="p-4 mb-3 w-[30rem] rounded-lg bg-[#101011] text-white"
                        value={name}
                        onChange ={(e)=>setName(e.target.value)}
                        />
                       </div>
                    <div className="two">
                      <label htmlFor="name block">Price</label> <br/>
                        <input type="number" 
                        className=" ml-4 p-4 mb-3 w-[30rem] rounded-lg bg-[#101011] text-white"
                        value={price}
                        onChange ={(e)=>setPrice(Number(e.target.value))}
                        />
                    </div>
                   </div>
                
                     <div className="flex flex-wrap">
                       <div className="one">
                        <label htmlFor="name block">Quantity</label> <br/>
                        <input type="number" 
                        className="p-4 mb-3 w-[30rem] rounded-lg bg-[#101011] text-white"
                        value={quantity}
                        onChange ={(e)=>setQuantity(Number(e.target.value))}
                        />
                       </div>
                    <div className="two ">
                      <label htmlFor="name block">Brand</label> <br/>
                        <input type="text" 
                        className=" ml-4 p-4 mb-3 w-[30rem] rounded-lg bg-[#101011] text-white"
                        value={brand}
                        onChange ={(e)=>setBrand(e.target.value)}
                        />
                    </div>
                    </div>

                    <label htmlFor ="" className="my-5">Description</label>
                    <textarea type="text" 
                    className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white" 
                    value={description} 
                    onChange={e=>setDescription(e.target.value)}
                    >
                    </textarea>

                    <div className="flex justify-between">
                      <div>
                        <label htmlFor="name block">Count In Stock</label>  <br/>
                        <input type="number" 
                        className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                         value={stock || ''} 
                         onChange={e =>setStock(Number(e.target.value))}/>
                      </div>

                      <div>
                        <label htmlFor="">Category</label>  <br/>
                        <select placeholder="Choose Category" className="p-4 mb-3 w-[30rem] border rounded-lg 
                        bg-[#101011] text-white"
                        value={category}
                          onChange={e => setCategory(e.target.value)}
                        >
                            {categories?.map((c) =>(
                              <option key= {c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div>
                        <button 
                        onClick={handleSubmit} 
                         className= "py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6">
                           Update
                        </button>
                        <button 
                        onClick={handleDelete} 
                         className= "py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600">
                           Delete
                        </button>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProductUpdate