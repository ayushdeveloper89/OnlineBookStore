import React, { useEffect, useState } from 'react';
import {
    Grid,
    TextField,
} from '@mui/material';

const FilterSearchComponent = (props) => {
    const { allBooks, setAllBooks, searchBook, setSearchBook } = props.childProps;
    const [searchItem, setSearchItem] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let arr = allBooks.filter((item) => {
            if (searchItem === "") {
                return item;
            } else if (item.title.toLowerCase().includes(searchItem.toLowerCase())) {
                return item;
            } else if (item.author.toLowerCase().includes(searchItem.toLowerCase())) {
                return item;
            }
        })
        setSearchBook(arr)
    }, [searchItem]);
    return (
        <Grid item xs={12} justifyContent={"center"}>
            <Grid item xs={10} mt={'20px'} sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                    label="Search"
                    id="title"
                    type="text"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
            </Grid>
        </Grid>
    )
}

export default FilterSearchComponent
