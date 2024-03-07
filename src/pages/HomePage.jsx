import useAuth from '../hooks/useAuth';

const HomePage = () => {
    console.log(useAuth().auth);
    return <></>;
};

export default HomePage;
