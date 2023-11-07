import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/ApiSlice";
import cartSliceReducer from "./slices/CartSlice";
import AuthSliceReducer from "./slices/AuthSlice";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: cartSliceReducer,
		auth: AuthSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
