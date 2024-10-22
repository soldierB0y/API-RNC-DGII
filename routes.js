import express, { json } from 'express'
import cargarPagina from './controller.js';



const router= express.Router();

router.get('/load/:id',async (req,res)=>{
    const {id}=req.params
    console.log(id);
    const valor= await cargarPagina(id);
    res.json(valor);
}
);
export default router;

