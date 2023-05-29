export interface Field {
    name: string;
    type: string;
    options?: string[];
    validations?: Validation[];
}

export interface Validation {
    type: string;
    value?: any;
    message: string;
}

export type Form = Field[];