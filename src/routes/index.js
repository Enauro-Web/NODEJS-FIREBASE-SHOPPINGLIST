const { Router } = require('express');
import {getAllItems, addNewItem, getAllItemsByList, deleteItem} from './apiFunctions'

const router = Router();

//GET
router.get('/', getAllItems);
router.post('/shoppingList', getAllItemsByList);

//ADD
router.post('/new-item', addNewItem);


//EDIT CONTACT
router.get('/edit-contact/:id', async (req, res) => {
    //const doc = await db.collection('contacts').doc(req.params.id).get();
    //console.log(doc.data());
    //res.render('index',{contact: {id:req.params.id, ...doc.data()}});
});

//DELETE
router.get('/delete-item/:id', deleteItem);

//UPDATE
router.post('/update-item/:id', async (req, res) => {
    //await db.collection('contacts').doc(req.params.id).update(req.body);
    //res.redirect('/');
});

module.exports = router

