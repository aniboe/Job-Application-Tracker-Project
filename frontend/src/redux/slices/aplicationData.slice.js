import { createSlice } from "@reduxjs/toolkit"

export const applicationData = createSlice(
    {
        name: "applications",
        initialState:{
            value: []
        },
        reducers:{
            addApplicationData: (state, action) => {
                state.value = action.payload
            }
        }
    }
)

export const allAplications = (state) => state.applications.value

export const { addApplicationData } = applicationData.actions
export default applicationData.reducer