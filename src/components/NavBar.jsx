
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { useState } from 'react'

const NavBar = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () =>{ 
        const token = localStorage.getItem("token")

        if(token){
            setShow(true)
        }else{
            navigate("/Login")
        }
      
    }

    
    return (
        <>
       
        <Navbar bg="primary" variant="dark">
          <h3 className='t-e'>Shop</h3>
            <Container>
                <Navbar.Brand as={ Link } to="/" >Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/login">Login</Nav.Link>
                    <Nav.Link as={ Link } to="/purchases">Purchases</Nav.Link>
                    <Nav.Link onClick={ handleShow }>Cart 🛒</Nav.Link>
                    </Nav>
            </Container>
            </Navbar>
        <SideBar
        show={show}
        handleClose={handleClose}
        />
    </>
    )
}



export default NavBar;




