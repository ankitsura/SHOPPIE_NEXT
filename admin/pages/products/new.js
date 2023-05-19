import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from '@/lib/firebase';
import { getCategories } from '@/helpers/APIs/category';
import { addProduct } from '@/helpers/APIs/product';


const NewProduct = () => {

  const router = useRouter();
  const [product, setProduct] = useState({title:'',category:'000000000000000000000000', price:'', description:'', images: []})
  const [productProperties, setProductProperties] = useState({});
  const [uploadProgress, setUploadProgress] = useState({imgProgress: 0});
  const [categories, setCategories] = useState([]);
  console.log(product);
  console.log(categories);
  useEffect(()=>{
    console.log('Image Uploaded');
  },[product.images]);

  useEffect(()=>{
    getCategories().then((res)=>{
      setCategories(res.data)
    })
  },[]);
  
  const handleChange = (e) => {
      setProduct({...product, [e.target.name]: e.target.value});
  }
  const createProduct = async (e) => {
      e.preventDefault();
      await addProduct({...product, properties: productProperties}).then(()=>{
        router.push('/products');
      }) 
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
              product.images.push(downloadURL)
              setProduct({...product, images: product.images});
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

  var allProperties = [];
  if(categories.length && product.category){
    const selectionProperties = [];
    const selCatInfo = categories.find(({_id})=> _id === product.category)
    selectionProperties?.push(selCatInfo?.properties);
    const parentProperties = selCatInfo?.parentCategory?.properties
    selectionProperties.push(parentProperties);
    allProperties = selectionProperties.flat();
  }

  const setProductProp = (propName, value) => {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    })
  }

  return (
    <Layout>
      <h1 className='page-heading'>New Product</h1>
      <form className='flex flex-col' onSubmit={createProduct}>
        <label htmlFor="title">Product Name</label>
        <input name='title' type="text" value={product.title} placeholder='product name' onChange={handleChange} required />
        <label htmlFor="category">Category</label>
        <select name='category' type="text" value={product.category} placeholder='select category for the product' onChange={handleChange}>
          <option value='000000000000000000000000'>Uncategorized</option>
          { categories &&
            categories.map((category, i) => {
              return <option key={i} value={category?._id}>{category?.name}</option>
            })
          }
        </select>
        {allProperties.length > 0 && (
          allProperties.map((p, i) => {
            if(p?.name !== '' && p?.values.length > 0){
              return (
              <div className="flex gap-1">
                <div className='min-w-[60px]'>
                  {p?.name}
                </div>
                <select value={productProperties[p.name]} onChange={(e)=> setProductProp(p.name, e.target.value) }>
                  <option value="">Select the property</option>
                  {p?.values.map((value, i)=>{
                    return <option key={i} value={value}>{value}</option>
                  })}
                </select>
              </div>
          )}})
        )}
        <label htmlFor="price">Price(in INR)</label>
        <input name='price' type="number" value={product.price} placeholder='price' onChange={handleChange} required />
        <div className='flex gap-2'>
          {product?.images?.map((image, i)=>(
            <div className='relative flex items-center justify-center' key={i}>
              <svg className='absolute -right-2 -top-1 w-5 h-5 bg-white text-red-500 cursor-pointer rounded-full' onClick={()=>handleDeleteImage(image)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <img className='w-24 h-24 rounded-md' src={image} alt="img" />
            </div>
          ))}
          <label className='w-24 h-24 flex flex-col text-gray-600 items-center justify-center rounded-lg bg-gray-200 cursor-pointer my-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload
            <input type="file" name='image' accept='image/*' className='hidden' onChange={uploadImages} multiple />
          </label>
        </div>
        { !product?.images?.length && (
            <div className='text-red-500'>No Image Selected!</div>
        )}
        <label htmlFor="description">Description</label>
        <textarea name="description" value={product.description} id="" rows="5" placeholder='description' onChange={handleChange} />
        { 
            uploadProgress.imgProgress < 100 && uploadProgress.imgProgress > 0 
            ?
            <button type="submit" className= 'bg-gray-300 text-gray-50 hover:bg-gray-300 hover:text-gray-50 hover:cursor-not-allowed border border-black/[.5] w-fit p-1 rounded-md' disabled>Uploading...Please wait!</button>
            :
            <button type="submit" className='btn-primary'>Save</button>
        }
      </form>
    </Layout>
  );
}

export default NewProduct;
