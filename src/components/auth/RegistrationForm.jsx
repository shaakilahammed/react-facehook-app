import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Field from '../common/Field';
import Input from '../common/Input';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setError,
    } = useForm({ mode: 'onTouched' });
    const submitHandler = async (formData) => {
        try {
            const response = await api.post(`/auth/register`, formData);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            setError('root.invalid', {
                type: 'invalid',
                message:
                    error?.response?.data?.error ?? 'Something went wrong!',
            });
        }
    };

    const password = watch('password');
    // console.log(password);
    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
            onSubmit={handleSubmit(submitHandler)}
        >
            {/* <!-- name --> */}
            <Field label="First Name" error={errors.firstName}>
                <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    // eslint-disable-next-line no-unused-vars
                    render={({ field: { ref, ...field } }) => (
                        <Input
                            id="firstName"
                            type="text"
                            className={`auth-input ${
                                errors.email
                                    ? 'border-red-400'
                                    : 'border-[#CCCCCC]/[14%]'
                            }`}
                            placeholder="Enter your first name"
                            {...field}
                        />
                    )}
                    rules={{
                        required: 'First Name is required',
                    }}
                />
            </Field>
            <Field label="Last Name" error={errors.lastName}>
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    // eslint-disable-next-line no-unused-vars
                    render={({ field: { ref, ...field } }) => (
                        <Input
                            id="lastName"
                            type="text"
                            className={`auth-input ${
                                errors.email
                                    ? 'border-red-400'
                                    : 'border-[#CCCCCC]/[14%]'
                            }`}
                            placeholder="Enter your last name"
                            {...field}
                        />
                    )}
                    rules={{
                        required: 'Last Name is required',
                    }}
                />
            </Field>
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
            <Field label="Retype Password" error={errors.confirmPassword}>
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    // eslint-disable-next-line no-unused-vars
                    render={({ field: { ref, ...field } }) => (
                        <Input
                            type="password"
                            className={`auth-input ${
                                errors.confirmPassword
                                    ? 'border-red-400'
                                    : 'border-[#CCCCCC]/[14%]'
                            }`}
                            id="confirmPassword"
                            placeholder="Retype your password"
                            {...field}
                        />
                    )}
                    rules={{
                        required: 'Please retype your password',
                        validate: (value) =>
                            value === password || 'The passwords do not match',
                    }}
                />
            </Field>
            <p className="text-red-600 font-light my-2">
                {errors?.root?.invalid?.message}
            </p>
            {/* <!-- Submit --> */}
            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;
