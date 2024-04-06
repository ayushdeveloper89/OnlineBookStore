import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Button,
    Checkbox,
    // Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

const LogInForm = () => {
    const cookies = new Cookies();
    // const setIsMR = props.setIsMR;
    // const setIsAdmin = props.setIsAdmin;
    const mobileView = false;

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlelogIn = async (values) => {
        // dispatch(logInStatus({ status: true }));
        try {
            const user = await axios.post('/auth/login', values);
            // setErrorMessage("");
            cookies.set("accessToken", user.data.accessToken, { path: '/', expires: new Date(Date.now() + (86400000 * 3)) });
            cookies.set("refreshToken", user.data.refreshToken, { path: '/', expires: new Date(Date.now() + (86400000 * 3)) });
            console.log(user.data)
            // if (!user.data.isAdmin) {
            //     setIsMR(true);
            //     navigate("/dailyTask")
            // } else {
            //     setIsAdmin(true);
            //     navigate("/dashboard")
            // }
            toast.info(user.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            // setErrorMessage(error.response.data);
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        handlelogIn(values)
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <ToastContainer
                            position="top-center"
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username-login">Email</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    {`Don't have an account? `}
                                    <Link to="/auth/signup" variant="subtitle2" component={RouterLink}>
                                        Signup
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default LogInForm
