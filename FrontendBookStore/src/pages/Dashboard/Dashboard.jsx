import React from 'react';
import CustomCards from '../../components/CustomCards/CustomCards';
import { Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import FilterSearchComponent from '../../components/FilterSearchComponent/FilterSearchComponent';

const Dashboard = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [searchBook, setSearchBook] = useState([]);

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

  const childProps = { allBooks,  setAllBooks, searchBook, setSearchBook }
  return (
    <Grid item xs={12} justifyContent={"center"}>
      <FilterSearchComponent childProps={childProps}/>
      <Grid item xs={10} mt={'20px'} sx={{ display: "flex", flexWrap: "wrap" }}>
        {searchBook.map((val, index) => {
          return <Grid item container xs={4} sx={{  margin: "20px 0" }} justifyContent={"center"} key={index}><CustomCards bookData={val}/></Grid>
        })}
      </Grid>
    </Grid>
  )
}

export default Dashboard
