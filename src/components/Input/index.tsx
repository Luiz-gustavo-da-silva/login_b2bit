import React from 'react';
import { InputProps } from '../../types/inputProps';
import styles from "./styles.module.css";

const Input: React.FC<InputProps> = ({
    name,
    placeholder,
    onChange,
    type
}) =>{
    return (
        <input type={type} name={name} placeholder={placeholder} onChange={onChange} className={styles.input}/>
    );
};

export default Input;
