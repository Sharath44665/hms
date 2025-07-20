import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "./Slices/JwtSlice";
import userReducer from "./Slices/UserSlice";

export default configureStore({
    reducer: {
        jwt: jwtReducer,
        user: userReducer,
    }
});