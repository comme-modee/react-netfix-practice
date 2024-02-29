import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//Outlet: 라우터 안에 있는 자손들을 가져오게 도와주는 컴포넌트
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
    const [ keyword, setKeyword ] = useState('')
    const navigate = useNavigate()

    const searchByKeyword = (e) => {
        e.preventDefault()
        console.log(keyword)
        navigate(`/movies?q=${keyword}`)
        setKeyword("")
    }

  return (
    <div>
        <Navbar data-bs-theme="dark" expand="lg" className="navbar-custom bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/"><img width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt=''/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/movies">Movie</Nav.Link>

                </Nav>
                <Form className="d-flex" onSubmit={(e) => searchByKeyword(e)}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button type='submit' variant="outline-danger">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet/>
    </div>
    
  )
}

export default AppLayout