const Input = ({ onChange, type = 'text', ...rest }) => {
    const handleChange = (e) => {
        const value =
            e.target.type === 'number'
                ? e.target.valueAsNumber || 0
                : e.target.value;

        onChange(value);
    };
    return <input onChange={handleChange} type={type} {...rest} />;
};

export default Input;
