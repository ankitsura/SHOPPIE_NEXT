// import mongooseConnect from "@/lib/mongoose";
// import Category from '@/models/Category';
// // import { isAdminRequest } from "./auth/[...nextauth]";


// const handle = async (req, res) => {
//     const {method} = req;
//     try {
//         await mongooseConnect();
        
//         // await isAdminRequest(req, res);

//         if(method === 'GET'){
//             const categories = await Category.find().sort({createdAt: -1}).populate('parentCategory');
//             return res.json(categories);
//         }
//         if(method === 'POST'){
//             const {name, parentCategory, properties} = req.body;
//             const nameWithoutSpaces = name.replace(/\s+/g, '');
//             const alreadyExist = await Category.findOne({name: new RegExp(`^${nameWithoutSpaces}$`, 'i')} );
//             if(alreadyExist) return res.json('category already exist');
//             const comaSeparated = properties.map((p)=>({
//                 name: p.name,
//                 values: p.values.split(',')
//             }));
//             const data = {
//                 name,
//                 properties: comaSeparated,
//                 parentCategory: parentCategory || undefined
//             }
//                 const category = await Category.create(data);
//                 return res.json(category);
//         }
//         if(method === 'PUT'){
//             const {name, parentCategory, properties, id} = req.body;
//             console.log(properties);
//             const comaSeparated = properties.map((p)=>{
//                 if(Array.isArray(p.values)){
//                     return ({name: p.name,
//                     values: p.values})
//                 }else{
//                     return ({name: p.name,
//                     values: p.values.split(',')})
//                 }
//             });
//             const data = {
//                 name,
//                 properties: comaSeparated,
//                 parentCategory: parentCategory || undefined
//             }
//             const category = await Category.findByIdAndUpdate(id, data);
//             return res.json(category);
//         }
//         if(method === 'DELETE'){
//             const id = req.query.id;
//             await Category.findByIdAndDelete(id);
//             return res.json('Deleted Successfully');
//         }
//     } catch (error) {
//         console.log(error);
//     }

// }

// export default handle;
