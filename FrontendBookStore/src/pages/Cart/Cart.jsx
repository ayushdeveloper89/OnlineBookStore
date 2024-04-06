import React from 'react';
import CustomCartCards from '../../components/CustomCartCards/CustomCartCards';
import FilterSearchComponent from '../../components/FilterSearchComponent/FilterSearchComponent';
import { Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Cart = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [searchBook, setSearchBook] = useState([]);
    const { cartId, cartArr } = useSelector((state) => state.cart);
    let arr = [];

    useEffect(() => {
        getAllBooks();
    }, [cartArr])

    const getAllBooks = async () => {
        try {
            const fetchAllBooks = await axios.post('/userBooks/getBooks');
            fetchAllBooks.data.allBooks.map((val) => {
                if (cartArr.includes(val._id)) {
                    arr.push(val)
                }
            })
            setAllBooks(arr)
            setSearchBook(arr)
            console.log(fetchAllBooks.data.allBooks)

        } catch (error) {
            console.log(error)
        }
    }

    const childPropsFilteredSeach = { allBooks, setAllBooks, searchBook, setSearchBook }
    return (
        <Grid item xs={12} justifyContent={"center"}>
            <FilterSearchComponent childProps={childPropsFilteredSeach} />
            <Grid item xs={10} mt={'20px'} sx={{ display: "flex", flexWrap: "wrap" }}>
                {searchBook.map((val, index) => {
                    return <Grid item container xs={4} sx={{ margin: "20px 0" }} justifyContent={"center"} key={index}><CustomCartCards bookData={val} getAllBooks={getAllBooks} /></Grid>
                })}
            </Grid>
        </Grid>
    )
}

export default Cart
