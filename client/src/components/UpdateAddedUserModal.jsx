import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateAddedUser } from '../redux/actions/userAction'
import Loader from './Loader'
import { Form, Button, Modal } from 'react-bootstrap'

const UpdateAddedUserModal = ({user, showUpdateAddedUserModal, setShowUpdateAddedUserModal }) => {

    const reduxState = useSelector(store => store)
    const { userRoot, errorRoot } = reduxState

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setName(user.name)
            setEmail(user.email)
            setPhoneNumber(user.phone_number)
        }
    }, [user])
    

    const dispatch = useDispatch()

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(updateAddedUser({ name, email, phone_number: phoneNumber }, user._id))
        setTimeout(() => {
        setShowUpdateAddedUserModal(false)
        }, 500)
    }
    return (
        <Modal show={showUpdateAddedUserModal} onHide={() => setShowUpdateAddedUserModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>UPDATE USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formHandler}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="number" placeholder="Enter your phone number" />
                    </Form.Group>
                    {userRoot.loader ? <Loader /> : <Button variant="primary" type="submit">
                        Submit
                </Button>}
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default React.memo(UpdateAddedUserModal)
