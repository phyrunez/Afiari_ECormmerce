import * as StoreTypes from './storeTypes';
import { PAGE_SCENERIOS } from '../../../constants/constants'
const initialState = {
  isLoading: false,
  countries: [],
  // product: [],
  // productCategory: [],
  categories: [],
  singleProduct: [],
  meta_data: {},
  initial_meta_data: {},
  cart_message: '',
  selectedCategory: '',
  testimonies: [],
  saved_testimony_message: '',
  comment: '',
  selectedProfileMenu: '',
  searched: [],
  hasSearched: false,
  shouldReview: false,
  currentPaginationType: PAGE_SCENERIOS.GENERAL,
  currentCategory: null,
  toggleModalState: false,
  stores: [],
  storeProducts: [],
  storeProductCategory: [],
  suggestions: [{ label: 'Current location', coords: null }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case StoreTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case StoreTypes.GET_SERVICEABLE_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };
    case StoreTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action?.payload?.products,
        meta_data: action?.payload?.data,
        initial_meta_data: action?.payload?.data,
        currentPaginationType: PAGE_SCENERIOS.GENERAL,
      };
    // case StoreTypes.GET_PRODUCTS_BY_CATEGORY:
    //   return {
    //     ...state,
    //     productCategory: action?.payload?.productCategory,
    //     meta_data: action?.payload?.data,
    //     currentPaginationType: PAGE_SCENERIOS.CATEGORY,
    //     currentCategory: action?.payload?.categoryId,
    //   };
    case StoreTypes.GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action?.payload?.product,
      };
    case StoreTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case StoreTypes.GET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case StoreTypes.SEARCH_PRODUCT:
      return {
        ...state,
        searched: action.payload.product,
        meta_data: action.payload.data,
        hasSearched: true,
        currentPaginationType: PAGE_SCENERIOS.SEARCH,
      };
    case StoreTypes.GET_SELECTED_PROFILE_MENU:
      return {
        ...state,
        selectedProfileMenu: action.payload,
      };
    case StoreTypes.SAVE__TESTIMONY:
      return {
        ...state,
        saved_testimony_message: action.payload,
      };
    case StoreTypes.GET_TESTIMONY:
      return {
        ...state,
        testimonies: action.payload,
      };

    case StoreTypes.USER_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case StoreTypes.SEARCHED:
      return {
        ...state,
        hasSearched: action.payload,
      };
    case StoreTypes.SET_INITIAL_METADATA:
      return {
        ...state,
        meta_data: state.initial_meta_data,
      };
    case StoreTypes.SET_SHOULD_REVIEW:
      return {
        ...state,
        shouldReview: action.payload,
      };
    case StoreTypes.SET_PAGINATION_TYPE:
      return {
        ...state,
        currentPaginationType: action.payload,
      };

    case StoreTypes.TOGGLE_MODAL: 
      return {
        ...state,
        toggleModalState: !state.toggleModalState,
      };
    
    case StoreTypes.GET_STORES: 
      // console.log(action.payload)
      return {
        ...state,
        stores: [...action.payload],
      };
    
    case StoreTypes.STORE_SUGGESTIONS: 
      // console.log(action.payload)
      return {
        ...state,
        suggestions: [
          { label: 'Current location', coords: null },
          ...action.payload,
        ],
      };

    case StoreTypes.GET_STORE_PRODUCTS_BY_ID :
      return {
        ...state,
        storeProducts: action?.payload?.products,
        meta_data: action?.payload?.data,
        initial_meta_data: action?.payload?.data,
        currentPaginationType: PAGE_SCENERIOS.GENERAL,
      };

    case StoreTypes.GET_STORE_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        storeProductCategory: action?.payload?.productCategory,
        meta_data: action?.payload?.data,
        currentPaginationType: PAGE_SCENERIOS.CATEGORY,
        currentCategory: action?.payload?.categoryId,
      };
    default:
      return state;
  }
};

export default reducer;


// import { 
//   TOGGLE_MODAL, 
//   GET_STORES, 
//   STORE_SUGGESTIONS, 
//   GET_STORE_PRODUCTS_BY_ID, 
//   GET_STORE_PRODUCTS_BY_CATEGORY,
//   SEARCHED,
//   SET_INITIAL_METADATA,
//   SEARCH_PRODUCT,
//   GET_ALL_CATEGORIES,
//   GET_SELECTED_CATEGORY
// } from './storeTypes';

// const initialState = {
//   toggleModalState: false,
//   stores: [],
//   storeProducts: [],
//   storeProductCategory: [],
//   meta_data: {},
//   categories: [],
//   initial_meta_data: {},
//   selectedCategory: '',
//   searched: [],
//   hasSearched: false,
//   suggestions: [{ label: 'Current location', coords: null }],
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case TOGGLE_MODAL: 
//       return {
//         ...state,
//         toggleModalState: !state.toggleModalState,
//       };
    
//     case GET_STORES: 
//       // console.log(action.payload)
//       return {
//         ...state,
//         stores: [...action.payload],
//       };
    
//     case STORE_SUGGESTIONS: 
//       // console.log(action.payload)
//       return {
//         ...state,
//         suggestions: [
//           { label: 'Current location', coords: null },
//           ...action.payload,
//         ],
//       };

//     case GET_ALL_CATEGORIES:
//       return {
//         ...state,
//         categories: action.payload,
//       };

//     case SEARCHED:
//       return {
//         ...state,
//         hasSearched: action.payload,
//       };

//     case GET_SELECTED_CATEGORY:
//       return {
//         ...state,
//         selectedCategory: action.payload,
//       };

//     case SEARCH_PRODUCT:
//       return {
//         ...state,
//         searched: action.payload.product,
//         meta_data: action.payload.data,
//         hasSearched: true,
//       };

//     case SET_INITIAL_METADATA:
//       return {
//         ...state,
//         meta_data: state.initial_meta_data,
//       };
    
//     case GET_STORE_PRODUCTS_BY_ID: 
//       return {
//         ...state,
//         storeProducts: action?.payload?.storeProducts,
//         meta_data: action?.payload?.data,
//         initial_meta_data: action?.payload?.data
//       };
    
//     case GET_STORE_PRODUCTS_BY_CATEGORY: 
//       return {
//         ...state,
//         storeProductCategory: action?.payload?.storeProductCategory,
//         meta_data: action?.payload?.data,
//         currentCategory: action?.payload?.categoryId,
//       }
//     default:
//       return state;
//   }
// };

// export default reducer;
