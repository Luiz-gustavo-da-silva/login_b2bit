import { ChangeEvent } from 'react';

export interface InputProps {
    name: string;
    value?: string;
    placeholder: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    readOnly?: boolean; 
}
