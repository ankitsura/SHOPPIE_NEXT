import Layout from '@/components/Layout';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Categories = () => {
    
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [editing, setEditing] = useState('');
    const [properties, setProperties] = useState([{name: '', values: ''}]);
    
    const saveCategory = async (e) => {
        e.preventDefault();
        const data = {name, parentCategory, properties};
        if(editing){
            await axios.put('/api/categories', {...data, id: editing._id});
            setName('');
            setParentCategory('');
            setEditing('');
            setProperties([{name: '', values: ''}]);
            fetchCategories();
        }else{
            await axios.post('/api/categories', data);
            setName('');
            setParentCategory('');
            setEditing('');
            setProperties([{name: '', values: ''}]);
            fetchCategories();
        }
    }

    const fetchCategories = async (e) => {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
    }

    const addProperty = () => {
        setProperties([...properties, {name: '', values: ''}])
    }
    const removeProperty = async (i) => {
        setProperties((prev)=>{
            const properties = [...prev];
            properties.splice(i,1);
            return properties;
        })
    }
    
    const handlePropertyNameChange = async (i, prop, propName) => {
        setProperties((prev)=>{
            const properties = [...prev];
            properties[i].name = propName;
            return properties;
        })
    }
    const handlePropertyValueChange = async (i, prop, propValue) => {
        setProperties((prev)=>{
            const properties = [...prev];
            properties[i].values = propValue;
            return properties;
        })
    }

    const handleEdit = async (category) => {
        setEditing(category);
        setName(category.name);
        console.log(category.properties);
        setProperties(category.properties);
        if(!category.parentCategory){
            setParentCategory('');
        }else{
            setParentCategory(category.parentCategory._id);
        }
    }
    

    const submit = (id, name) => {
            confirmAlert({
                title: `Do you really want to delete '${name}'?`,
                buttons: [
                  {
                    label: 'Delete',
                    onClick: async () => {
                        const res = await axios.delete(`api/categories?id=${id}`);
                        fetchCategories();
                    }
                  },
                  {
                    label: 'Cancel',
                    onClick: () => {return;}
                  }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
        }

    useEffect(() => {
        fetchCategories();
    },[]);

  return (
    <Layout>
        <h1 className='page-heading'>Categories</h1>
        <form onSubmit={saveCategory}>
            <div className='flex flex-col md:flex-row grow justify-between gap-2 mb-2'>
                <div className='flex flex-col my-auto w-full'>
                    <label htmlFor="">{editing ? `Edit Category ${editing.name}` : 'New Category Name'}</label>
                    <input className='my-auto' onChange={e=>setName(e.target.value)} value={name} type="text" placeholder="Enter Category Name" required={true} />
                </div>
                <div className='flex flex-col my-auto w-full'>
                    <label htmlFor="parentCategory">{editing ? `Change Parent ${editing.parentCategory}` : 'Select Parent Category'}</label>
                    <select className='my-auto' name="parentCategory" value={parentCategory} onChange={(e)=>setParentCategory(e.target.value)} >
                        <option value="">No parent category</option>
                        {categories.length && categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='w-full mb-3'>
                <label htmlFor="">Properties</label>
                {
                    properties?.length > 0 && properties?.map((property, i) => (
                        <div key={i} className='flex gap-2 mb-2 items-center'>
                            <input
                                className='m-0'
                                type="text" 
                                onChange={(e)=>handlePropertyNameChange(i, property, e.target.value)}
                                value={property?.name} 
                                placeholder='property name(example: color)'
                                required={true} 
                            />
                            <input 
                                className='m-0'
                                type="text" 
                                onChange={(e)=>handlePropertyValueChange(i, property, e.target.value)}
                                value={property?.values} 
                                placeholder='values "," coma separated' 
                                required={true} 
                            />
                            <button 
                            type='button'
                            onClick={()=>removeProperty(i)}
                            className='text-red-600 p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))
                }
                <button 
                onClick={addProperty}
                type='button' 
                className='border border-black p-1 block rounded-md bg-blue-200 hover:bg-black/[.7] hover:text-white w-fit my-1 text-xs' 
                >
                Add Property
                </button>
            </div>
            <div className='flex gap-2'>
                {editing && <button type='button' 
                    onClick={()=>{
                        setEditing('');
                        setName('');
                        setParentCategory('');
                        setProperties([{name: '', values: ''}])
                        }} 
                    className='btn-primary bg-blue-200'
                >
                    Cancel
                </button>}
                <button className='btn-primary bg-green-700 text-white' type='submit'>
                    {editing ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
        {!editing && <table className='basic mt-3 rounded-t-lg overflow-hidden'>
            <thead className='rounded-t-lg w-auto'>
                <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {categories.length && categories.map((category) => (
                    <tr key={category._id}>
                        <td>{category?.name}</td>
                        <td>{category?.parentCategory?.name}</td>
                        <td className='flex gap-2 justify-center'>
                            <button onClick={()=>handleEdit(category)} className='text-blue-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <button className='text-red-600' onClick={()=>submit(category._id, category.name)}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>}
    </Layout>
  );
}

export default Categories;
