import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { ReactNode, useState } from 'react'

interface Props {
    label: string;
    id: string;
    values: string[];
    value: string;
    onChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
}

export const GlobalSelector = ({ values, label, id, value, onChange }: Props) => {

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id={`${id}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    label={label}
                    id={id}
                    value={value}
                    onChange={onChange}
                >
                    <MenuItem value="">-- Ninguno --</MenuItem>
                    {
                        Object.entries(values).map(([key, value]) => (
                            <MenuItem key={key} value={value}>{value}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </>
    );
};
