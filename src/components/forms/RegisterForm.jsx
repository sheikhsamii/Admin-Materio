import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerationSchema } from '../validations/Yup'
import TextField from '@mui/material/TextField'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from 'src/redux/slice/userSlice'
import { useRouter } from 'next/router'


const RegisterForm = () => {
    
    const dispatch = useDispatch();
    const router = useRouter()
    const [values, setValues] = useState({
        password: '',
        showPassword: false
      })
  return (
    <>
         <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              agreeToTerms: false,
              role: ''
            }}
            validationSchema={registerationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
             console.log(values)
                dispatch(setUser(values))
                 // Save user data in localStorage
                 localStorage.setItem('user', JSON.stringify(values));
              setSubmitting(false)
              resetForm()
              if (values.role === 'teacher') {
                router.push('/account-settings')
            } else if (values.role === 'student') {
                router.push('/')
            }
            }}
          >
            {({ isSubmitting }) => (
              <Form noValidate autoComplete='off'>
                {/* USERNAME  */}
                <Field
                  autoFocus
                  fullWidth
                  id='username'
                  name='username'
                  type='text'
                  label='Username'
                  as={TextField}
                  sx={{ marginBottom: 4 }}
                />
                <ErrorMessage name='username' component='div' />

                {/* EMAIL  */}
                <Field
                  fullWidth
                  id='email'
                  name='email'
                  type='email'
                  label='Email'
                  as={TextField}
                  sx={{ marginBottom: 4 }}
                />
                <ErrorMessage name='email' component='div' />

                {/* PASSWORD  */}
                <Field
                  fullWidth
                  id='password'
                  name='password'
                  type={values.showPassword ? 'text' : 'password'}
                  label='Password'
                  as={TextField}
                  sx={{ marginBottom: 4 }}
                />
                <ErrorMessage name='password' component='div' />


                 {/* Radio button for selecting role */}
            <Field name="role">
              {({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  <FormControlLabel value="student" control={<Radio />} label="Student" />
                </RadioGroup>
              )}
            </Field>
            <ErrorMessage name='role' component='div' />


                {/* AGREE TO TERMS  */}
                <FormControlLabel
                  control={<Field type='checkbox' name='agreeToTerms' as={Checkbox} />}
                  label='I agree to privacy policy & terms'
                />
                <ErrorMessage name='agreeToTerms' component='div' />

                <Button
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  disabled={isSubmitting}
                  sx={{ marginBottom: 7 }}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign up'}
                </Button>
              </Form>
            )}
          </Formik>
    </>
  )
}

export default RegisterForm