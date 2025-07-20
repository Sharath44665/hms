import {createSlice} from "@reduxjs/toolkit";

const jwtSlice = createSlice({
    name: "jwt",
    initialState: localStorage.getItem("token") || "",
    reducers:{
        setJwt: (state, action)=>{
            localStorage.setItem("token", action.payload);
            state = action.payload;
            return state;
        },
        removeJwt: (state) => {
            localStorage.removeItem("token");
            state = "";
            return state;
        }
    }

})

export const {setJwt, removeJwt} = jwtSlice.actions;
export default jwtSlice.reducer;