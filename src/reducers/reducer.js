import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';


const url="https://graph-backend-kix8.vercel.app/"

export const loginUser=createAsyncThunk('user/login',async({email,password})=>{
    const res=await axios.post(`${url}api/auth/login`,{email,password});
    return res.data
}) 
export const signupUser=createAsyncThunk('user/signup',async({firstName,lastName,email,password})=>{
    const res=await axios.post(`${url}api/auth/signup`,{firstName,lastName,email,password});
    return res.data
}) 
export const fetchData=createAsyncThunk('user/fetchData',async()=>{
    const res=await axios.get(`${url}api/data/fetchData`,{headers:{authorization:localStorage.getItem('auth-token')}});
    return res.data
}) 

const initialState={
        isLoading:false,
        error:null,
        isAuthenticated:localStorage.getItem("auth-token")?true:false,
        user:null,
        data:null,
        filters:{startDate:new Date(2022,9,4),endDate:new Date(2022,9,30),isMale:true,isFeMale:true,isUnderAge:true,isAboveAge:true}
    }


const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
            localStorage.setItem('auth-token',action.payload.token)
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message
        })
        builder.addCase(signupUser.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(signupUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user=action.payload.user;
            state.isAuthenticated=true;
            localStorage.setItem('auth-token',action.payload.token)
        })
        builder.addCase(signupUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message
        })
        builder.addCase(fetchData.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload
        })
        builder.addCase(fetchData.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message
        })
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
        },
        setLogout:(state)=>{
            state.isAuthenticated=false;
            state.user=null
            localStorage.removeItem("auth-token")
        },
        setGenderFilter:(state,action)=>{
            if(action.payload==='male'){
                state.filters.isMale=!state.filters.isMale;
            }else{
                state.filters.isFeMale=!state.filters.isFeMale
            }
        },
        setAgeFilter:(state,action)=>{
            if(action.payload==='aboveAge'){
                state.filters.isAboveAge=!state.filters.isAboveAge
            }else{
                state.filters.isUnderAge=!state.filters.isUnderAge;
            }
        },
        setDateRangeFilter:(state,action)=>{
            state.filters.startDate=action.payload.startDate
            state.filters.endDate=action.payload.endDate
        },
        setAllFilters:(state,action)=>{
            console.log(action.payload)
            state.filters={...action.payload}
        }
    }
});


export const {setUser,setLogout,setGenderFilter,setAgeFilter,setDateRangeFilter,setAllFilters} =authSlice.actions
export default authSlice.reducer