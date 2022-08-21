import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import useCart from '../../hooks/useCart';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BookCard({book}) {
  const [expanded, setExpanded] = React.useState(false);
  const {addToCart,removeFromCart} = useCart(book);
 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
    
        title={book.title}
        subheader={book.publisher}
        sx={{minHeight: 80}}
      />
      <CardMedia
        component="img"
        height="194"
        image={`/books/${book.id%120}.jpg`}
        alt="book image"
        sx={{ objectFit: "contain" }}
      />
      <CardContent sx={{minHeight: 80}}>
      {book.bookAuthors.map((authors) => {
          return (
            <Typography align='center'>{authors.firstName} {authors.lastName}</Typography>
          );
        })}
      <Typography paragraph>{book.price} TL</Typography>
      
      </CardContent>
      <CardActions disableSpacing>
        
        <IconButton 
          onClick={addToCart}
          aria-label="add to cart" >
          <AddShoppingCartOutlinedIcon />
        </IconButton>

        <IconButton 
          onClick={removeFromCart}
          aria-label="remove from cart" >
          <RemoveShoppingCartOutlinedIcon />
        </IconButton>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>               
          <Typography paragraph>Category: {book.category.categoryName}</Typography>
          <Typography paragraph>Description: {book.category.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
