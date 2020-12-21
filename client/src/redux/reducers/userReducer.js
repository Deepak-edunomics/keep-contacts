const initialState = {
    user: {},
    isAuthenticated: false,
    loader: false,
    modal: false,
    users: [],
    addUserFlag: false,
    updateUserFlag: false,
    deleteUserFlag: false

}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loader: false,
            }
        case "ADD_USER":
            return {
                ...state,
                users: [action.payload, ...state.users],
                loader: false
            }
        case "SET_ADDED_USER":
            return {
                ...state,
                users: action.payload,
                loader: false
            }
        case "UPDATE_ADDED_USER":
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload._id ? action.payload : user),
                loader: false
            }
        case "DELETE_ADDED_USER":
            return {
                ...state,
                users: state.users.filter(obj => {
                    return obj._id !== action.payload._id
                }),
                loader: false
            }
        case "SET_MODAL":
            return {
                ...state,
                modal: action.payload
            }
        case "DELETE_USER":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false,
                loader: false
            }
        case "ADD_USER_FLAG": {
            return {
                ...state,
                addUserFlag: action.payload,
                loader: false
            }
        }
        case "UPDATE_USER_FLAG": {
            return {
                ...state,
                updateUserFlag: action.payload,
                loader: false
            }
        }
        case "DELETE_USER_FLAG": {
            return {
                ...state,
                deleteUserFlag: action.payload,
                loader: false
            }
        }
        default:
            return state
    }
}

export default userReducer