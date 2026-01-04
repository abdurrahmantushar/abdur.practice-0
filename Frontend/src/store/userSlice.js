import { createSlice } from "@reduxjs/toolkit";


const initialValue ={
    _id : null,
    name : '',
    email : '',
    avatar : '',
    mobile : '',
    verify_email:'',
    last_login_date: '',
    status : '',
    address_details :[],
    shopping_cart:[],
    orderHistory: [],
    role:'',
    


}

const UserSlice = createSlice({
    name : 'user',
    initialState:initialValue,
    reducers:{
        setUserDetails : (state,action)=>{
  const payload = action.payload || {};
  state._id = payload._id ?? state._id;
  state.name = payload.name ?? state.name;
  state.email = payload.email ?? state.email;
  state.avatar = payload.avatar ?? state.avatar;
  state.mobile = payload.mobile ?? state.mobile;
  state.verify_email = payload.verify_email ?? state.verify_email;
  state.last_login_date = payload.last_login_date ?? state.last_login_date;
  state.status = payload.status ?? state.status;
  state.address_details = payload.address_details ?? state.address_details;
  state.shopping_cart = payload.shopping_cart ?? state.shopping_cart;
  state.orderHistory = payload.orderHistory ?? state.orderHistory;
  state.role = payload.role ?? state.role;},
        logout:(state,action)=>{
            state._id = ""
            state.name = ""
            state.email = ""
            state.avatar = ""
            state.mobile = ""
            state.verify_email = ""
            state.last_login_date = ""
            state.status = ""
            state.address_details = []
            state.shopping_cart = []
            state.orderHistory = []
            state.role = ""
        },
        updataAvatar :(state,action)=>{
            state.avatar = action.payload
        }
    }
})
export const {setUserDetails,logout,updataAvatar}= UserSlice.actions
export default UserSlice.reducer