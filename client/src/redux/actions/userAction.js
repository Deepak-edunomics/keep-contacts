import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'


// const urlHelper = "http://localhost:5000/api/v1"

const urlHelper = "https://keep-contacts.herokuapp.com/api/v1"

export const userLoginHelper = (data) => {
    return {
        type: "SET_USER",
        payload: data
    }
}

const userLogoutHelper = (data) => {
    return {
        type: "DELETE_USER",
        payload: data
    }
}

const setLoader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

const setModal = (data) => {
    return {
        type: "SET_MODAL",
        payload: data
    }
}

export const userRegister = (userData,history) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Post",
                url: `${urlHelper}/user`,
                data: userData
            })
            const { token } = data
            localStorage.setItem('userJwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded))
            history.push('/home')
        }
        catch (err) {
            dispatch({
                type: "SET_USER_REGISTER_ERRORS",
                payload: err.response.data
            })
            dispatch(setLoader(false))
            console.log("Error in userRegister Action", err.message)
        }

    }
}

export const userLogin = (userData, history) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Post",
                url: `${urlHelper}/session`,
                data: userData
            })
            const { token } = data
            localStorage.setItem('userJwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded))
            history.push('/home')
        }
        catch (err) {
            dispatch({
                type: "SET_USER_LOGIN_ERRORS",
                payload: err.response.data
            })
            dispatch(setLoader(false))
            console.log("Error in userLogin Action", err.message)
        }
    }
}

export const addUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Post",
                url: `${urlHelper}/users`,
                data: userData
            })
            if (data.success) {
                dispatch({
                    type: "ADD_USER",
                    payload: data.result
                })
                dispatch({
                    type: "ADD_USER_FLAG",
                    payload: true
                })
                setTimeout(() => {
                    dispatch({
                        type: "ADD_USER_FLAG",
                        payload: false
                    })
                },300)
            }
            else {
                alert("Error in add user")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch({
                type: "SET_ADD_USER_ERRORS",
                payload: err.response.data
            })
            dispatch(setLoader(false))
            console.log("Error in addUser Action", err.message)
        }
    }
}

export const getAddedUsers = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Get",
                url: `${urlHelper}/users`,
            })
            if (data.success) {
                dispatch({
                    type: "SET_ADDED_USER",
                    payload: data.result
                })
            }
            else {
                alert("Error in getAddedusers")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in getAddedUsers Action", err.message)
        }
    }
}

export const updateAddedUser = (userData, userId) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Put",
                url: `${urlHelper}/users/${userId}`,
                data: userData
            })
            if (data.success) {
                dispatch({
                    type: "UPDATE_ADDED_USER",
                    payload: data.result
                })
                dispatch({
                    type: "UPDATE_USER_FLAG",
                    payload: true
                })
                setTimeout(() => {
                    dispatch({
                        type: "UPDATE_USER_FLAG",
                        payload: false
                    })
                }, 300)
            }
            else {
                alert("Error in update Added user")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch({
                type: "SET_UPDATE_ADDED_USER_ERRORS",
                payload: err.response.data
            })
            dispatch(setLoader(false))
            console.log("Error in updateAddedUser Action", err.message)
        }
    }
}

export const deleteAddedUser = (userId) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Delete",
                url: `${urlHelper}/users/${userId}`
            })
            if (data.success) {
                dispatch({
                    type: "DELETE_ADDED_USER",
                    payload: data.result
                })
                dispatch({
                    type: "DELETE_USER_FLAG",
                    payload: true
                })
                setTimeout(() => {
                    dispatch({
                        type: "DELETE_USER_FLAG",
                        payload: false
                    })
                }, 300)
            }
            else {
                alert("Error in Delete user")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch({
                type: "SET_DELETE_ADDED_USER_ERRORS",
                payload: err.response.data
            })
            dispatch(setLoader(false))
            console.log("Error in deleteAddedUser Action", err.message)
        }
    }
}


export const userLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('userJwtToken');
        setAuthToken(false);
        dispatch(userLogoutHelper({}));
        dispatch(setLoader(false))
    }
}