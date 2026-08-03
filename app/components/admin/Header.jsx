import {Typography, Box, useTheme} from "@mui/material"
import React from "react"

const Header=({title, subtitle})=>{
    const theme=useTheme()
    return(
        <Box>
            <Typography>
                {title}
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary[500]}>
                {subtitle}
            </Typography>
        </Box>

    )
}

export default Header
