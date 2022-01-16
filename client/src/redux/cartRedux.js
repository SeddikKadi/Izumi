import { createSlice } from "@reduxjs/toolkit";
const inCart=(cart,_id)=>{
  let trouve=false;
  cart.map(element=>{
    
    if(element._id ===_id){
      console.log("test")
          trouve=true
        }
  }
    
  )
  return trouve;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      if(inCart(state.products,action.payload._id)){
        let index=state.products.map(function(e) { return e._id; }).indexOf(action.payload._id);
        state.products[index].quantity+=1
        console.log("product exists")
        state.total+=action.payload.price;

      }else{
        state.quantity +=1;
        action.payload.quantity=1;
        state.products.push(action.payload);
        console.log("product do not exist")
        state.total+=action.payload.price;
      }
      //state.quantity +=1;
     // state.products.push(action.payload);

      // state.total += action.payload.price * action.payload.quantity;

     /* if(state.products.includes(action.payload)){
        let index=state.products.map(function(e) { return e.title; }).indexOf(action.payload.title)
        //console.log(state.products[index].quantity++)
      }else{
        console.log("not exists")
      } */
      
    },

    deleteProduct: (state, action) => {
      let index=state.products.map(function(e) { return e.title; }).indexOf(action.payload.title)
      console.log("index reducer",index)
      state.products.splice(index, 1);
      state.total-= (action.payload.price*action.payload.quantity)
      state.quantity-=1;
    },
  },
});

export const { addProduct,deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
