import { MouseEventHandler } from 'react';

export interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
}