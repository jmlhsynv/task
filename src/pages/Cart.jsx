import React, { useEffect } from "react";

import Container from "@mui/material/Container";

import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { getCart, deleteCart } from "../store/cart/cart";

function Cart() {

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const removeItem = (id) => {
    let data = cart.filter((e) => e.id !== id);
    dispatch(deleteCart(data));
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cart.length > 0 ? (
            cart.map((index, key) => (
              <Grid item xs={6} md={4} key={key}>
                <Card sx={{ maxWidth: 345 }} style={{ minHeight: "320px" }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={index.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {index.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      $ {index.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => removeItem(index.id)}>
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography gutterBottom variant="h6" component="div">
              Cart is empty
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Cart;
