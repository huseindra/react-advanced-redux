import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./ui-slice";

const initialCartState = {
    items: [],
    totalQuantity : 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState:  initialCartState,
    reducers: {
        replaceItemToCart: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
        addItemToCart:  (state, action) => {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
            if(!existingItem){
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1, 
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            }else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price
            }

        },
        removeItemToCart: (state, action) => {
            
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id)
            }else {
                existingItem.quantity-- 
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }   
    }

})


export const sendDataCart = (cart) => {
    return async (dispatch)=>{
        dispatch(showNotification({
          status: 'pending',
          title: 'Pending!',
          message: 'Sending data is on going...'
        }))
  
       const sendRequest = async() => {
        const response =  await fetch('https://react-mini-tasks-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
            method: 'PUT',
            body: JSON.stringify(cart)
          })
    
          if(!response.ok){
           throw new Error('Sending data is failed')
          }
       }
       try {
           await sendRequest()
           dispatch(showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sending data is successfuly...'
          }))
       } catch (error) {
            dispatch(showNotification({
                status: 'error',
                title: 'Failed!',
                message: 'Sending data is error...'
            }))
       }
        
      }
}

export const {replaceItemToCart, addItemToCart, removeItemToCart} = cartSlice.actions
export default cartSlice.reducer