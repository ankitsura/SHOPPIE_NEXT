import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'

import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '@/helpers/use-apis/auth';
import Header from '@/components/Header';
import Input from '@/helpers/customInput';




const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const dispatch =  useDispatch();
    const router = useRouter();


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isSignup){
           dispatch(register(formData).then(()=> router.push('/')));
        }else{
            dispatch(login(formData)).then(()=> router.push('/'));
        }
        
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Switch from Login to Sign Up page or vice-versa
    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    const googleSuccess = (res) =>{
        const token = res?.credential;
        const result = jwtDecode(token);
        console.log(result);
        // try {
        //     dispatch({type: 'AUTH', data: {result, token}});
        //     router.push('/');
        // } catch (error) {
        //     console.log('error',error);
        // }
    }

    // const googleFailure = () =>{
    //     alert('Google Sign In failure. Try again later');
    // }

  return (
    <>
    <Header />
        <Container className='pt-[12%] h-screen w-screen' maxWidth="xs">
        <Paper className='!flex flex-col items-center p-2' elevation={10}>
                <Avatar className='m-1 bg-slate-400' >
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className='w-full my-3' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='name' label='Name' handleChange={handleChange} autoFocus />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {
                            isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />
                        }
                    </Grid>
                    <div className='my-2'>
                        <Button type='submit' fullWidth variant='contained' color='primary' >
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </div>
                    {/* <GoogleLogin
                    className='my-3'
                        render={(renderProps) => (
                        <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        </Button>
                        )}
                        text='Google Sign In'
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </Paper>
        </Container>
    </>
  );
                }

export default Auth;
