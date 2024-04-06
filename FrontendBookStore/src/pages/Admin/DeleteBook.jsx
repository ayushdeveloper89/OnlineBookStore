import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const DeleteBook = (props) => {
    const { openDeleteModal, handleCloseDeleteModal, bookData, getAllBooks } = props.childProps;

    const handleDelete = async()=> {
        try {
            const deleteBooks = await axios.post(`/adminBooks/deleteBook/${bookData._id}`)
            getAllBooks()
            handleCloseDeleteModal()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete these book? This process cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleDelete} color='error' >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteBook
