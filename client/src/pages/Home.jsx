import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Container, Row, Col, Button, Card, CardColumns} from 'react-bootstrap'
import DeleteAddedUserModal from '../components/DeleteAddedUserModal'
import AddUser from '../components/AddUser'
import UpdateAddedUserModal from '../components/UpdateAddedUserModal'
import { getAddedUsers } from '../redux/actions/userAction'
import {useHistory } from 'react-router-dom'


const Home = () => {
    const reduxState = useSelector(store => store)
    const dispatch = useDispatch()
    const history = useHistory()

    const {userRoot, errorRoot} = reduxState

    const [user, setUser] = useState({})
    const[userId, setUserId] = useState("")

    const [addUserModal, setAddUserModal] = useState(false)
    const [showUpdateAddedUserModal, setShowUpdateAddedUserModal] = useState(false)
    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)


    //GET LIST OF ALL USER
    useEffect(() => {
        if (!userRoot.isAuthenticated) {
           history.push('/')
        }
        else {
            dispatch(getAddedUsers())
        }
    }, [])

    
    const deleteAddedUserClickHandler = (userId) => {
        setUserId(userId)
        setDeleteUserModal(true)
    }

    const updateAddedUserHandler = (user) => {
        setUser(user)
        setShowUpdateAddedUserModal(true)
         
    }
  

    return (
        <>
            <AddUser addUserModal={addUserModal} setAddUserModal={setAddUserModal}  />

            <UpdateAddedUserModal showUpdateAddedUserModal={showUpdateAddedUserModal}
                setShowUpdateAddedUserModal={setShowUpdateAddedUserModal}
                user={user} />

            <DeleteAddedUserModal userId={userId} deleteUserModal={deleteUserModal} setDeleteUserModal={setDeleteUserModal} />




        <Container>
            <Row className="mt-5">
                <Col xs={12} md={8}>
                    <h2>List of Users</h2>

                </Col>
                <Col xs={12} md={4}>
                  <Button variant="primary" onClick={()=>setAddUserModal(true)}>Add User</Button>
                    </Col>
                    
                </Row>
                
                <CardColumns className="mt-5">
                    {userRoot.users.length !== 0 ? userRoot.users.map(user =>
                        <Card key={user._id}>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>
                                    <h6><small>Email: </small>{user.email}</h6>
                                    <h6><small>Phone: </small>{user.phone_number}</h6>
                                </Card.Text>
                                <Card.Footer>
                                    <Button variant="primary" onClick={() => updateAddedUserHandler(user)}>
                                        Update
                                    </Button>
                                    <Button variant="danger" className="float-right" onClick={() => deleteAddedUserClickHandler(user._id)}>
                                        Delete
                                    </Button> 
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    ): "No users to show kindly add"}
                    </CardColumns>
            </Container>
            </>
    )
}

export default Home
