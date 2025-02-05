import { db } from "../data/db"
import {useEffect, useState,useMemo} from "react"

export const useCart=()=>{

    const initialCart = () =>{
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart):[]
      }
    
      const MAX_ITEMS=5
      const [data,setData]=useState(db)
      const [cart,setCart]=useState(initialCart)
    
      useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
      },[cart])
    
      function addToCard(item){
        const itemExist=cart.findIndex(guitar => guitar.id===item.id)
        if(itemExist>=0){
          if(cart[itemExist].quantity>=MAX_ITEMS)return
          const updateCart=[...cart]
          updateCart[itemExist].quantity++
          setCart(updateCart)
        }else{
          item.quantity =1
          setCart([...cart,item])
        }
        
      }
      function deleteProduc(id){
        setCart((prevCart)=>(prevCart.filter((guitar)=>guitar.id!==id)))
      }
    
      function incrementProdutc(id){
        const updateCart=cart.map(item=>{
          if(item.id===id){
            return {
              ...item,
              quantity:item.quantity+1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      function decrementProdutc(id){
        const updateCart=cart.map(item=>{
          if(item.id===id && item.quantity>1){
            return {
              ...item,
              quantity:item.quantity-1
            }
          }
          return item
        })
        setCart(updateCart)
      }
      function clearCart(){
        setCart([]);
      }

      const isEmpy = useMemo( () => cart.length === 0, [cart])
      const cartTotal=useMemo(()=>cart.reduce((total,item) => total +(item.quantity*item.price),0),[cart])

    return{
        addToCard,deleteProduc,incrementProdutc,decrementProdutc,clearCart,data,cart,isEmpy,cartTotal

    }
}