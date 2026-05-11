import { configureStore} from "@reduxjs/toolkit";
import commentSlice from "./features/comment/commentSlice";
import authSlice from "./features/auth/authSlice";
import postSlice from "./features/post/postSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
  },
});
