import {configureStore} from "@reduxjs/toolkit"
import authReduser from "./slices/authSlice"
import fileReduser from "./slices/fileSlice"

const store = configureStore({
  reducer: {
    auth: authReduser,
    files : fileReduser
  },
});

export default store