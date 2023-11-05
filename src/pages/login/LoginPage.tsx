import { Button, TextField, Link, Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { object, string } from 'yup';
import { sessionModel } from '~entities/session';
import { useLoginUser } from '~features/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import { ErrorHandler } from '~shared/ui/error-handler';

export function LoginPage() {
    const { mutate, isError, error } = useLoginUser();

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Link
                    component={RouterLink}
                    to={PATH_PAGE.register}
                    variant="body2">
                    Need an account?
                </Link>

                {isError && <ErrorHandler error={error!} />}

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={object().shape({
                        email: string()
                            .email('Invalid email address')
                            .required('Email is required'),
                        password: string()
                            .min(
                                5,
                                'Password must be at least 5 characters long',
                            )
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                autoComplete="current-password"
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
                                Sign In
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}
