import { showNotification } from "./ui-slice"
import { replaceItemToCart } from "./cart-slice"
export const fetchDataCart = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response =  await fetch('https://react-mini-tasks-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')
        
            if(!response.ok){
                throw new Error('Could not error data fetch...')
            }

            const data = await response.json()
            return data
        }

        try {
            const cartData = await fetchData()
            dispatch(
                replaceItemToCart({
                    items: cartData.items || [],
                    totalQuantity:  cartData.totalQuantity
                })
            )
        } catch (error) {
            dispatch(showNotification({
                status: 'error',
                title: 'Failed!',
                message: 'Fetch data is error...'
            }))
        }
    }
}

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
            body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity
            })
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