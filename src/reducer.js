const initialState = {
    inventory: [], 
    sales:[],
    loading:false,
    error:null
}

export const inventoryReducer = (state = initialState, action) => {
    switch(action.type){
        case "FETCH_DATA_LOADING":
            return{
                ...state,
                loading: true,
            }
        case "FETCH_INVENTORY_SUCCESS": 
            return{
                ...state,
                inventory: action.payload,
                loading: false,
                error: null
            }
        case "FETCH_INVENTORY_FAILURE":
            return{
                ...state,
                loading:false,
                error: 'Error fetching inventory data'
            }
        case "ADD_TO_INVENTORY":
            return{
            ...state,
            inventory: [...state.inventory, action.payload],
            loading: false,
            error: null
           }
        case "REMOVE_FROM_INVENTORY":
            return{
            ...state,
            inventory: state.inventory.filter((item) => item._id !== action.payload),
            loading: false,
            error: null
           }
        case "UPDATE_INVENTORY":
        const findItem = state.inventory.find((item) => item._id === action.payload._id)
        
            return {
            ...state,
            inventory: [...state.inventory, Object.assign(findItem,action.payload)],
            loading: false,
            error: null
           }
        case "FETCH_SALES_SUCCESS": 
           return{
               ...state,
               sales: action.payload,
               loading: false,
               error: null
           }
       case "FETCH_SALES_FAILURE":
           return{
               ...state,
               loading: false,
               error: 'Error fetching sales data'
           }
       case "ADD_TO_SALES":
           return{
           ...state,
           sales: [...state.sales, action.payload],
           loading: false,
           error: null
          }
        case "ADD_ENTRY_FAILURE": 
         return{
           ...state,
           loading:false,
           error: "Error fetching data or performing operation"
         }
        default:
            return state;
    }
}