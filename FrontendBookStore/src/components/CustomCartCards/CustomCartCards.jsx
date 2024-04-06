import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateStoreCart } from '../../store/reducers/cart.js';
import axios from 'axios';


const CustomCartCards = (props) => {
  const bookData = props.bookData;
  const getAllBooks = props.getAllBooks;

  const dispatch = useDispatch();
  const { cartId, cartArr } = useSelector((state) => state.cart);

 

  const handleRemoveFromCart = async () => {
    let books = cartArr.filter((val) => {
      return val !== bookData._id
    })
    console.log(books)
    let data = {
      id: cartId,
      books: books
    }
    try {
      const updateCart = await axios.post('/userCart/updateCart', data);
      dispatch(updateStoreCart({ cartArr: books }));
    //   getAllBooks()
    } catch (error) {
      console.log(error)
    }
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
        <Button variant="outlined" color='error' onClick={handleRemoveFromCart}>Remove From Cart</Button>
      </CardActions>
    </Card>
  )
}

export default CustomCartCards;
