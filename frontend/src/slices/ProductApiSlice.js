import { PRODUCT_URL, UPLOAD_URL } from "../Constants";
import { apiSlice } from "./ApiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: PRODUCT_URL,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Products"],
		}),
		getSingleProduct: builder.query({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCT_URL,
				method: "POST",
			}),
			invalidatesTags: ["Product"],
		}),
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCT_URL}/${data._id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Products"],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: UPLOAD_URL,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetSingleProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} = apiSlice;
