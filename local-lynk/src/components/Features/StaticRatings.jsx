import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function Ratings() {
    const [value, setValue] = useState(4);

    return (
        <Box sx={{ '& > legend': { mt: 1 } }}>
            <Typography component="legend">
            <Rating
                name="simple-controlled"
                value={value}
                readOnly
            />
            </Typography>
        </Box>
    );
}

// Developed by Megan Armas