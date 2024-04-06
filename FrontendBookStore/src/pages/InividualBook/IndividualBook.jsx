import React from 'react'
import { useLocation } from 'react-router-dom';
import { Grid, Typography } from "@mui/material";

const IndividualBook = () => {
    const location = useLocation()
    const bookData = location.state.bookData;
    console.log(location)
    return (
        <Grid item xs={12} justifyContent={"center"}>
            <Grid item xs={10} mt={'20px'} >
                <Typography variant='h1' textAlign={"center"}>
                    {bookData.title}
                </Typography>
                <Grid item xs={4} mt={'20px'} ml={'20px'} display={'flex'}>
                    <Grid item xs={4} mt={'20px'} ml={'20px'}>
                        <img src={`http://localhost:5000/bookImages/${bookData.image}`} alt="" width={500} height={400} />
                    </Grid>
                    <Grid item xs={4} mt={'20px'} ml={'30px'} >
                        <Typography variant="h6" component="div" >
                            {`Author: ${bookData.author}`}
                        </Typography>
                        <Typography variant="h6" component="div" >
                            {`Category: ${bookData.category}`}
                        </Typography>
                        <Typography variant="h6" component="div" >
                            {`Price: ${bookData.price}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default IndividualBook
