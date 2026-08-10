import { configureStore } from "@reduxjs/toolkit"
import applicationReducer from "../slices/aplicationData.slice.js"
import userReducer from "../slices/userData.slice.js"

export const store = configureStore(
    {
        reducer:{
            applications: applicationReducer,
            user: userReducer,
        }
    }
)