const {db} = require('../firebase');
export const getAllItems = async (req, res) => {

    const querySnapshot = await db.collection('shopping-list').get();
    
    const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    //console.log(items);
    
    res.render('index', {items});
    
}

export const getAllItemsByList = async (req, res) => {
  
    const {shoppingList} = req.body
    console.log(shoppingList);

    const querySnapshot = await db.collection('shopping-list').get();
    
    const items = querySnapshot.docs
    .filter(doc => {
        return doc.data().shoppingListId == shoppingList
    })    
    .map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    //console.log(items);
    
    res.render('index', {items});
    
}

export const addNewItem = async (req, res) => {
    const {item, section, quantity, uom, price, shoppingListId} = req.body;
    console.log(req.body);

    const total = quantity * price;

    await db.collection('shopping-list').add({
        item, section, quantity, uom, total, shoppingListId
    });

    const querySnapshot = await db.collection('shopping-list').get();    
    const items = querySnapshot.docs
    .filter(doc => {
        return doc.data().shoppingListId == shoppingListId
    })    
    .map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.render('index', {items});    
}

export const deleteItem = async (req, res) => {

    const doc = await db.collection('shopping-list').doc(req.params.id).get();
    const shoppingListId = doc.data().shoppingListId

    await db.collection('shopping-list').doc(req.params.id).delete();

    const querySnapshot = await db.collection('shopping-list').get();    
    const items = querySnapshot.docs
    .filter(doc => {
        return doc.data().shoppingListId == shoppingListId
    })    
    .map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    
    res.render('index', {items});    
}