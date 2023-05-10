import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '@/lib/firebase';



const EditProduct = () => {

  const router = useRouter();
  const id = router?.query?.id?.[0]; 

  const [product, setProduct] = useState({title:'', price:'', category:'', description:'', images: [], properties: {}});
  const [uploadProgress, setUploadProgress] = useState({imgProgress: 0});
  const [categories, setCategories] = useState([]);
  
  console.log('product',product);
  console.log('categories',categories);

  const handleChange = (e) => {
    if(e.target.name === 'category'){
      setProduct({...product, [e.target.name]:e.target.value, properties: {}});
    }else{
      setProduct({...product, [e.target.name]:e.target.value});
    }
  }

  const editProduct = (e) => {
    e.preventDefault();
    axios.patch(`/api/products?id=${id}`, product).then(()=> router.push('/products'));
  }

  const uploadImages = async (e) => {
    const files = e.target.files;
    for(const file of files){
      try{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress({...uploadProgress, imgProgress: progress})
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
            break;
            case 'running':
              console.log('Upload is running');
            break;
            default: break;
          }
        }, 
        (error) => console.log(error), 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at',downloadURL);
            product?.images.push(downloadURL)
            setProduct({...product, images: product?.images});
            console.log('data is set');
          });
        }
        );
      } catch (error) {
        console.log('error....',error);
      }    
    }
  }

  const handleDeleteImage = (img) => {
    try {
        const images =  product.images.filter((image) => img!==image);
        setProduct({...product, images});
        // const storage = getStorage(app);

        // // Create a reference to the file to delete
        // const start = 'appspot.com/o/';
        // const end = '?alt=';
        // const desertRef = img.split(start)[1].split(end)[0];
        // console.log(desertRef);
        // // Delete the file
        // deleteObject(desertRef).then(() => {
        //     // Delete the file from the database
        // }).catch((error) => {
        //     console.log(error);
        // });
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProduct({...res.data, category: res.data.category._id});
    }).then(()=>{
      axios.get('/api/categories').then((res)=>{
        setCategories(res.data)
    })});
  },[]);
  
  var allProperties = [];
    if(categories.length && product.category){
      const selectionProperties = [];
      const selCatInfo = categories.find(({_id}) => _id === product.category)
      selectionProperties.push(selCatInfo?.properties);
      const parentProperties = selCatInfo?.parentCategory?.properties
      selectionProperties.push(parentProperties);
      allProperties = selectionProperties.flat();
    }
  
  console.log('allProperties',allProperties);
 

  return (
    <Layout>
        <h1 className='page-heading'>Edit Product</h1>
        <form className='flex flex-col' onSubmit={editProduct}>
          <label htmlFor="title">Product Name</label>
          <input name='title' type="text" value={product?.title} placeholder='product name' onChange={handleChange} required />
          <label htmlFor="category">Category</label>
          <select name='category' type="text" value={product?.category} placeholder='select category for the product' 
            onChange={handleChange}
          >
            <option value="">Uncategorized</option>
            { categories &&
              categories.map((category) => {
                return <option key={category._id} value={category?._id}>{category?.name}</option>
              })
            }
          </select>
          {allProperties.length > 0 && (
            allProperties.map((p, i) => {
              if(p?.name !== '' && p?.values.length > 0){
                return (
                  <div key={i} className="flex gap-1">
                  <div className='min-w-[60px]'>
                    {p?.name}
                  </div>
                  <select value={product?.properties[p?.name]} onChange={(e)=> setProduct({...product, properties: {...product.properties, [p.name]: e.target.value}})}>
                    <option value="">...Select...</option>
                    {p?.values.map((value, i)=>{
                      return <option key={i} value={value}>{value}</option>
                    })}
                  </select>
                </div>
            )}})
          )}

          <label htmlFor="price">Price(in INR)</label>
          <input name='price' type="number" value={product?.price} placeholder='price' onChange={handleChange} required />
          <label htmlFor="images">Images</label>
          <div className='flex gap-2'>
            {product?.images?.map((image, i)=>(          
              <div className='relative flex items-center justify-center' key={i}>
                <svg className='absolute -right-2 -top-1 w-5 h-5 bg-white text-red-500 cursor-pointer rounded-full' onClick={()=>handleDeleteImage(image)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <img className='w-24 h-24 rounded-md' src={image} alt="img" />
              </div>
              )
            )}
            <label className='w-24 h-24 flex flex-col text-gray-600 items-center justify-center rounded-lg bg-gray-200 cursor-pointer mt-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Upload
              <input type="file" name='image' accept='image/*' className='hidden' onChange={uploadImages} multiple />
            </label>
          </div>
          { !product?.images?.length && (
            <div className='text-red-500'>No Images in this product...!</div>
          )}
          <label htmlFor="description">Description</label>
          <textarea name="description" value={product?.description} id="" rows="5" placeholder='description' onChange={handleChange} />
          { uploadProgress.imgProgress < 100 && uploadProgress.imgProgress > 0 
          ?
          <button type="submit" className= 'bg-gray-300 text-gray-50 hover:bg-gray-300 hover:text-gray-50 hover:cursor-not-allowed border border-black/[.5] w-fit p-1 rounded-md' disabled>Uploading...Please wait!</button>
          :
          <button type="submit" className='btn-primary'>Update</button>
          }
        </form>
    </Layout>
  );
}

export default EditProduct;
