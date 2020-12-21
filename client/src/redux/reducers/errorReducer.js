const initialState = {
    userRegisterErrors: {},
    userLoginErrors: {},
    addUserErrors: {},
    updateAddedUserErrors: {},
    deleteAddedUserErrors:{}
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_REGISTER_ERRORS":
            return {
                ...state,
                userRegisterErrors: action.payload
            }
        case "SET_USER_LOGIN_ERRORS":
            return {
                ...state,
                userLoginErrors: action.payload
            }
        case "SET_ADD_USER_ERRORS":
            return {
                ...state,
                addUserErrors: action.payload
            }
        case "SET_UPDATE_ADDED_USER_ERRORS":
            return {
                ...state,
                updateAddedUserErrors: action.payload
            }
        case "SET_DELETE_ADDED_USER_ERRORS":
            return {
                ...state,
                deleteAddedUserErrors: action.payload
            }
        default:
            return state;
    }
}


export default errorReducer