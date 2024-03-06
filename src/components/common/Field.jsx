import React from 'react';
const getChildId = (children) => {
    const child = React.Children.only(children);
    if ('id' in child.props) {
        return child.props.id;
    }
};

const Field = ({ label, children, htmlFor, error }) => {
    const id = htmlFor || getChildId(children);
    return (
        <div className="form-control">
            <label className="auth-label" htmlFor={id}>
                {label}
            </label>
            {children}
            {!!error && (
                <span className="text-sm font-light text-red-600">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export default Field;
