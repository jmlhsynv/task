import React, { useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products/products";
import { getLocalItems } from "../store/cart/cart";


import { getCart, postCart } from "../store/cart/cart";

function Home() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProducts());
    user && dispatch(getCart());
  }, [dispatch]);

  const addToCart = (id) => {
    let data = products.find((e) => e.id === id);

    if (user) {
      let check = cart.some((e) => e.id == id);
      if (!check) {
        dispatch(postCart([...cart, data]));
      }
    } else {
      if (localStorage.getItem("cart")) {
        if (!JSON.parse(localStorage.getItem("cart")).includes(data)) {
          localStorage.setItem(
            "cart",
            JSON.stringify([...JSON.parse(localStorage.getItem("cart")), data])
          );
        }
      } else {
        localStorage.setItem("cart", JSON.stringify([data]));
      }
      dispatch(getLocalItems());
    }
  };
  return (
    <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {products.map((index, key) => (
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
                  <Button size="small" onClick={() => addToCart(index.id)}>
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
