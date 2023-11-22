"use client"
import React, { useEffect, useState} from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').
  required('email is required'),
  username: Yup.string().required('Username is required'),
  phone: Yup.number(),
  password: Yup.string()
    .min(6, 'Too short')
    .required('password is required'),
})

const Login = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users/");
        if (!res) {
          throw new Error('Failed to fetch users');
        }
        setUsers(res.data)
      }
      catch (error) {
        alert(`Failed to register: ${error.message}`);
        console.error('An error occurred:', error);
      }
    }
    getUsers();
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const usernameExists = users.some((user)=>user.username===values.username)
        if(usernameExists) {
          await axios.get('http://localhost:4000/users', values)
          alert('User logined successfully!');
          router.push("/")
        }
        else {
          setError("Username does not exist");
        }
        
      } catch (error) {
        alert('Failed to register');
        console.error('An error occurred:', error);
      }
    }
  })
  return (
    <Container sx={{ "marginTop": 5 }}>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        <form 
        onSubmit={formik.handleSubmit} action="">
          <TextField
            fullWidth
            id="username"
            name="username"
            margin="normal"
            label="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username &&
              Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email &&
              Boolean(formik.errors.email)}
            helperText={formik.touched.email &&
              formik.errors.email}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="password"
            margin="normal"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password &&
              Boolean(formik.errors.password)}
            helperText={formik.touched.password &&
              formik.errors.password}
            onBlur={formik.handleBlur}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
        {error}
      </Stack>
    </Container>
  )
};

export default Login;
