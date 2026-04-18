import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {},
    reducers: {
        setProfile: (state, action) => {
            state = action.payload;
            return state;
        },
        removeProfile: (state) => {
            state = {};
            return state;
        }
    }

})

export const { setProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;