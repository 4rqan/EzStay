import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../services/auth.service';

const LoginPage =() => {
    const [model, setModel] = useState({
        username:'',
        password:''
    })
  return (
    <Form onSubmit={(e)=> {
        e.preventDefault()
        login(model,()=>{})}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control value={model.username} onChange={(e)=>{
            setModel({username: e.target.value, password:model.password})
        }} type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={model.password} onChange={(e)=>{
            setModel({username: model.username, password: e.target.value})
        }} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginPage;