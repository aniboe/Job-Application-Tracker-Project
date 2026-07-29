import { configureStore } from "@reduxjs/toolkit"
import applicationReducer from "../slices/aplicationData.slice.js"

export const store = configureStore(
    {
        reducer:{
            applications: applicationReducer,
        }
    }
)