import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import useAuth from '../../hooks/useAuth';
import Field from '../common/Field';
import Input from '../common/Input';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm({ mode: 'onTouched' });
    const submitHandler = async (formData) => {
        try {
            const response = await api.post(`/auth/login`, formData);
            if (response.status === 200) {
                const { token, user } = response.data;
                if (token) {
                    setAuth({ user, token });
                    navigate('/');
                }
            }
        } catch (error) {
            setError('root.invalid', {
                type: 'invalid',
                message: 'Invalid email or password',
            });
        }
    };
    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
            onSubmit={handleSubmit(submitHandler)}
        >
            {/* <!-- email --> */}

            <Field label="Email" error={errors.email}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    // eslint-disable-next-line no-unused-vars
                    render={({ field: { ref, ...field } }) => (
                        <Input
                            type="email"
                            className={`auth-input ${
                                errors.email
                                    ? 'border-red-400'
                                    : 'border-[#CCCCCC]/[14%]'
                            }`}
                            id="email"
                            placeholder="Enter your email"
                            {...field}
                        />
                    )}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                />
            </Field>
            <Field label="Password" error={errors.password}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    // eslint-disable-next-line no-unused-vars
                    render={({ field: { ref, ...field } }) => (
                        <Input
                            type="password"
                            className={`auth-input ${
                                errors.password
                                    ? 'border-red-400'
                                    : 'border-[#CCCCCC]/[14%]'
                            }`}
                            id="password"
                            placeholder="Enter your password"
                            {...field}
                        />
                    )}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message:
                                'Password must be at least 8 characters long',
                        },
                    }}
                />
            </Field>
            <p className="text-red-600 font-light">
                {errors?.root?.invalid?.message}
            </p>

            {/* <!-- Submit --> */}
            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
