import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditBook from '../../pages/Admin/EditBook';
import DeleteBook from '../../pages/Admin/DeleteBook';

const CustomCards = (props) => {
  const bookData = props.bookData;
  const getAllBooks = props.getAllBooks;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const childProps = {
    open, handleClose, bookData, getAllBooks
  }

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleClickOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const deleteChildProps = {
    openDeleteModal, handleCloseDeleteModal, bookData, getAllBooks
  }
  return (
    <Card sx={{ maxWidth: 300, boxShadow: 2 }}>
      <CardMedia
        sx={{ height: 350, width: 300 }}
        image={`http://localhost:5000/bookImages/${bookData.image}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          {bookData.title}
        </Typography>
        <Typography variant="h6" component="div" textAlign={"center"}>
          {`Author: ${bookData.author}`}
        </Typography>
        <Typography variant="h6" component="div" textAlign={"center"}>
          {`Category: ${bookData.category}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleClickOpen}>Edit</Button>
        <Button variant="contained" color='error' onClick={handleClickOpenDeleteModal}>Delete</Button>
      </CardActions>
      <EditBook childProps={childProps}/>
      <DeleteBook childProps={deleteChildProps}/>
    </Card>
  )
}

export default CustomCards
