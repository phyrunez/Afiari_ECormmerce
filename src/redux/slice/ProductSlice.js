import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../service/ProductService';

let metaData;
let productID;
if (typeof window !== 'undefined') {
  //get users from local storage
  metaData = JSON.parse(localStorage.getItem('meta_data'));
  productID = JSON.parse(localStorage.getItem('product'));
}

const initialState = {
  countries: [],
  categories: [],
  generalMarket: [],
  product: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  metaData: metaData ? metaData : null,
  productID: productID ? productID : null,
};

/////////////////////// GETTING ALL THE SERVICEABLE COUNTRY FROM THE SERVICE ///////////////////////////////////////////////
export const getServiceableCountry = createAsyncThunk(
  'country/getAllCountries',
  async (_, thunkAPI) => {
    try {
      return await productService.getServiceableCountries();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

/////////////////////// END OF GETTING ALL THE SERVICEABLE COUNTRY FROM THE SERVICE ///////////////////////////////////////////////

/////////////////////// GETTING ALL GENERAL PRODUCT FROM THE SERVICE ///////////////////////////////////////////////
export const getGeneralMarket = createAsyncThunk(
  'country/getAllGeneralMarket',
  async (pageNumber, thunkAPI) => {
    try {
      return await productService.getProducts(pageNumber);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'country/getAllProducts',
  async (pageNumber, thunkAPI) => {
    try {
      return await productService.getProducts(pageNumber);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

/////////////////////// END OF GETTING ALL GENERAL PRODUCT FROM THE SERVICE ///////////////////////////////////////////////

/////////////////////// GETTING SINGLE PRODUCT FROM THE SERVICE ///////////////////////////////////////////////
export const getSingleProduct = createAsyncThunk(
  'country/getSingleProduct',
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

/////////////////////// END OF GETTING SINGLE PRODUCT FROM THE SERVICE ///////////////////////////////////////////////

/////////////////////// GETTING ALL THE PRODUCT CATEGORIES FROM THE SERVICE ///////////////////////////////////////////////
export const getProductCategory = createAsyncThunk(
  'country/getAllCategory',
  async (_, thunkAPI) => {
    try {
      return await productService.getProductCategories();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

/////////////////////// END OF GETTING ALL PRODUCT CATEGORY FROM THE SERVICE ///////////////////////////////////////////////

export const productSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getServiceableCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServiceableCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.countries = action.payload;
      })
      .addCase(getServiceableCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGeneralMarket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeneralMarket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.generalMarket = action.payload;
      })
      .addCase(getGeneralMarket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, update_page } = productSlice.actions;
export default productSlice.reducer;
