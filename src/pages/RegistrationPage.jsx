import { Link } from 'react-router-dom';
import Illustration from '../assets/icons/registration.svg';
import RegistrationForm from '../components/auth/RegistrationForm';
const RegistrationPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
            <div className="max-w-[1368px] flex-1">
                <div className="container grid items-center gap-8 lg:grid-cols-2">
                    {/* <!-- illustration and title --> */}
                    <div>
                        {/* <!-- src="./assets/images/auth_illustration.png" --> */}
                        <img
                            className="mb-12 h-60"
                            src={Illustration}
                            alt="auth_illustration"
                        />
                        <div>
                            <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                                Facehook
                            </h1>
                            <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                                Create a social media app with features like,
                                showing the post, post details, reactions,
                                comments and profile.
                            </p>
                        </div>
                    </div>
                    {/* <!-- illustration and title ends --> */}
                    <div className="card">
                        {/* <!-- registration form --> */}
                        <RegistrationForm />
                        {/* <!-- registration form ends --> */}
                        <div className="py-4 lg:py-4">
                            <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                                Already have an account?{' '}
                                <Link
                                    className="hover:text-lwsGreen text-white transition-all hover:underline"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegistrationPage;
