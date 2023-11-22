"use client"
import React from "react";
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
  email: Yup.string().
  email('Invalid email').
  required('email is required'),
  username: Yup.string()
  .required('Username is required'),
  phone: Yup.number(),
  password: Yup.string()
  .min(6, 'Too short')
  .required('password is required'),
  address:Yup.string()
    .min(10, 'Too short')
    .max(50, 'Too long')
})

const Register = () => {
    const router = useRouter();
    
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password:'',
            phone: '',
            address: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:4000/users', values)
                alert('User registered successfully!');
                router.push("/login")
            } catch (error) {
                alert('Failed to register');
                console.error('An error occurred:', error);
            }
        }
    })
    return (
        <Container sx={{marginTop: "5"}} >
            <Stack spacing={2}>
                <Typography variant="h4" component="h1">
                   Register
                </Typography>
                <form onSubmit={formik.handleSubmit} action="">
                    <TextField 
                        fullWidth
                        id="username"
                        name="username"
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
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password &&
                            Boolean(formik.errors.password)}
                        helperText={formik.touched.password &&
                            formik.errors.password}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address &&
                        Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="tel"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone &&
                            Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone 
                            && formik.errors.phone}
                        onBlur={formik.handleBlur}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Register
                    </Button>
                </form>
            </Stack>
        </Container>
    )
};

export default Register;