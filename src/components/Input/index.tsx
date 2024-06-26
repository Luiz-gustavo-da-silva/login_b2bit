import React from 'react';
import { InputProps } from '../../types/inputProps';
import styles from "./styles.module.css";

const Input: React.FC<InputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    type, 
    readOnly
}) =>{
    return (
        <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className={styles.input} readOnly={readOnly}/>
    );
};

export default Input;
