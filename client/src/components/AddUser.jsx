import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../redux/actions/userAction'
import Loader from './Loader'
import {Form, Button, Modal} from 'react-bootstrap'

const AddUser = ({ addUserModal, setAddUserModal }) => {
    
    const reduxState = useSelector(store => store)
    const { userRoot, errorRoot } = reduxState

   
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")

    
    const dispatch = useDispatch()

    const formHandler = (e) => {
        e.preventDefault()
            dispatch(addUser({ name, email, password, phone_number: phoneNumber }))
        setTimeout(() => {
        setAddUserModal(false)
        }, 500)
        setName("")
        setEmail("")
        setPhoneNumber("")
        setPassword("")
    }
    return (
        <Modal show={addUserModal} onHide={() => setAddUserModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>ADD USER</Modal.Title>
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

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
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

export default AddUser
