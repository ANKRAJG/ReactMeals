export interface InputAtrr {
    id: string;
    type: string;
    min: string;
    max: string;
    step: string;
    defaultValue: string;
}

export interface InputProps {
    label: string;
    input: InputAtrr;
}