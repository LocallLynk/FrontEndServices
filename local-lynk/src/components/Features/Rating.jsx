// this is the rating file for people to rate their neighbors! The other one is static

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function Ratings() {
    const [value, setValue] = useState(2);

    return (
        <Box sx={{ '& > legend': { mt: 1 } }}>
            <Typography component="legend">Rating</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue); // Update state with new value
                    console.log(newValue); // Log the new value
                }}
            />
        </Box>
    );
}

// Developed by Megan Armas