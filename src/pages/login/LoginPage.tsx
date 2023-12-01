import { Button, TextField, Link, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { string } from 'yup';
import { sessionModel } from '~entities/session';
import { useLoginUser } from '~features/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import { ErrorHandler } from '~shared/ui/error-handler';

const validationSchema = Yup.object().shape({
    email: string()
        .email('Invalid email address')
        .required('Email is required'),
    password: string()
        .min(5, 'Password must be at least 5 characters long')
        .required('Password is required'),
});

export function LoginPage() {
    const { mutate, isError, error } = useLoginUser();

    const {
        values: { email, password },
        handleChange,
        handleSubmit,
        touched,
        errors,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            mutate(values, {
                onSuccess: response => {
                    console.log(response);
                    // @ts-ignore
                    sessionModel.addUser(response);
                },
                onSettled: () => {
                    setSubmitting(false);
                },
            });
        },
    });

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

                {isError && <ErrorHandler error={error!}/>}

                <form onSubmit={handleSubmit}>
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
                        onChange={handleChange}
                        value={email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="password"
                        name="password"
                        autoComplete="password"
                        helperText={touched.password ? errors.password : ''}
                        error={touched.password && Boolean(errors.password)}
                        onChange={handleChange}
                        value={password}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        size="large">
                        Sign In
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
