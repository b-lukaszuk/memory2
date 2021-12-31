import React from 'react';

import "./Button.css";

interface Props {
    className: string;
    btnText: string;
    onClick: Function;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button className={props.className}
            onClick={() => props.onClick()}>
            {props.btnText}
        </button>
    );
}

export default Button;
