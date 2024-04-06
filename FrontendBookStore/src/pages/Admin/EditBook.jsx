import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddEditBookForm from './AddEditBookForm';
// import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditBook = (props) => {
    const { open, handleClose, bookData, getAllBooks } = props.childProps;

    const childProps = {
        bookData: bookData,
        isEdit: true,
        getAllBooks,
        handleClose
    }
  return (
    <>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button> */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>

                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" textAlign={"center"}>
                            Add New Book To Store
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                    <Grid item container xs={8}>
                        <AddEditBookForm childProps={childProps}/>
                    </Grid>
                </Grid>
            </Dialog>
        </>
  )
}

export default EditBook
