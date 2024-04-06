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
import { useNavigate } from 'react-router';


const CustomCards = (props) => {
  const bookData = props.bookData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId, cartArr } = useSelector((state) => state.cart);
  const [isInCart, setIsInCart] = React.useState(false)

  React.useEffect(() => {
    if (cartArr.includes(bookData._id)) {
      setIsInCart(true)
    }
  }, [])

  const handleAddToCart = async () => {
    let books = [...cartArr];
    books.push(bookData._id);
    let data = {
      id: cartId,
      books: books
    }
    try {
      const updateCart = await axios.post('/userCart/updateCart', data);
      dispatch(updateStoreCart({ cartArr: books }));
      setIsInCart(true)
    } catch (error) {
      console.log(error)
    }
  }

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
      setIsInCart(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = () => {
    navigate(`bookDetail/${bookData._id}`, {
      state: {
        bookData: bookData
      }})
  }
  return (
    <Card sx={{ maxWidth: 300, boxShadow: 2 }}>
      <CardMedia
        sx={{ height: 350, width: 300, cursor: 'pointer' }}
        image={`http://localhost:5000/bookImages/${bookData.image}`}
        onClick={handleNavigate}
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
        {isInCart
          ? <Button variant="outlined" color='error' onClick={handleRemoveFromCart}>Remove From Cart</Button>
          : <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>}
      </CardActions>
    </Card>
  )
}

export default CustomCards
