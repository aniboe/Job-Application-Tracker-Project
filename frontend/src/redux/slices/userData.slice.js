import { createSlice } from "@reduxjs/toolkit"

export const userData = createSlice(
    {
        name: "user",
        initialState:{
            value: []
        },
        reducers:{
            addUserData: (state, action) => {
                state.value = action.payload
            }
        }
    }
)

export const userValue  = (state) => state.user.value

export const { addUserData } = userData.actions
export default userData.reducer