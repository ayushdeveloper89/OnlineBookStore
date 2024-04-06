import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddNewBook from './AddNewBook';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomEditableCards from '../../components/CustomEditableCards/CustomEditableCards';
import FilterSearchComponent from '../../components/FilterSearchComponent/FilterSearchComponent';

const ShowAllBooks = () => {
  const [open, setOpen] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [searchBook, setSearchBook] = useState([]);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  useEffect(() => {
    getAllBooks()
  }, [])
  
  const getAllBooks = async()=> {
    try {
      const fetchAllBooks = await axios.post('/userBooks/getBooks');
      setAllBooks(fetchAllBooks.data.allBooks)
      setSearchBook(fetchAllBooks.data.allBooks)
      console.log(fetchAllBooks.data.allBooks)

  } catch (error) {
      console.log(error)
  }
  }

  const childProps = {
    open, handleClose, getAllBooks
  }

  const childPropsFilteredSeach = { allBooks,  setAllBooks, searchBook, setSearchBook }
  return (
    <Grid item xs={12} justifyContent={"center"}>
    <FilterSearchComponent childProps={childPropsFilteredSeach}/>
      <Grid container item xs={11} mt={'20px'} sx={{ justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleClickOpen}>Add New Book</Button>
      </Grid>
      <Grid item xs={10} mt={'20px'} sx={{ display: "flex", flexWrap: "wrap" }}>
      {searchBook.map((val, index) => {
        return <Grid item container xs={4} sx={{  margin: "20px 0" }} justifyContent={"center"} key={index}><CustomEditableCards bookData={val} getAllBooks={getAllBooks}/></Grid>
      })}
      </Grid>
      <AddNewBook childProps={childProps}/>
    </Grid>
  )
}

export default ShowAllBooks
