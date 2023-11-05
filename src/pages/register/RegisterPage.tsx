import { Button, TextField, Link, Box, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { object, string } from 'yup';
import { sessionModel } from '~entities/session';
import { useCreateUser } from '~features/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import { ErrorHandler } from '~shared/ui/error-handler';

export function RegisterPage() {
    const { mutate, isError, error } = useCreateUser();

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Link component={RouterLink} to={PATH_PAGE.login} variant="body2">
                Have an account?
            </Link>

            {isError && <ErrorHandler error={error}/>}

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                validationSchema={object().shape({
                    username: string().min(5).required('Username is required'),
                    email: string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: string()
                        .min(5, 'Password must be at least 5 characters long')
                        .required('Password is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    mutate(values, {
                        onSuccess: response => {
                            sessionModel.addUser(response.data.user);
                        },
                        onSettled: () => {
                            setSubmitting(false);
                        },
                    });
                }}>
                {({ isSubmitting, touched, errors }) => (
                    <Form>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                helperText={
                                    touched.username ? errors.username : ''
                                }
                                error={
                                    touched.username && Boolean(errors.username)
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                helperText={touched.email ? errors.email : ''}
                                error={touched.email && Boolean(errors.email)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                helperText={
                                    touched.password ? errors.password : ''
                                }
                                error={
                                    touched.password && Boolean(errors.password)
                                }
                            />
                            <Button
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isSubmitting}>
                                Sign Up
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
