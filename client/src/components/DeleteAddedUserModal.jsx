import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteAddedUser} from '../redux/actions/userAction'
import {useSelector, useDispatch} from 'react-redux'


const DeleteAddedUserModal = ({userId, deleteUserModal, setDeleteUserModal}) => {
    const reduxState = useSelector(store => store)
    const { userRoot, errorRoot } = reduxState
    const dispatch = useDispatch()

    const clickHandler = () => {
    
            dispatch(deleteAddedUser(userId))
            setTimeout(() => {
                setDeleteUserModal(false)
            }, 300)
       
    }
    return (
        <Modal show={deleteUserModal} onHide={() => setDeleteUserModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>DELETE USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <h3>Are you sure want to Delete ?</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={clickHandler}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={()=>setDeleteUserModal(false)}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default DeleteAddedUserModal
