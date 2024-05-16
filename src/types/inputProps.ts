import { ChangeEvent } from 'react';

export interface InputProps {
    name: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
}
