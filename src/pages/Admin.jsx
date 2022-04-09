import React, { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  editProduct,
  getProducts,
} from "../store/products/products";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Admin() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const [edit, setEdit] = useState({});

  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    let data = products.find((e) => e.id === id);
    setEdit(data);
  };
  const handleClose = () => setOpen(false);

  const postData = (data, e) => {
    dispatch(editProduct({ ...edit, ...data }));
    e.target.reset();
    setOpen(false);
  };
  return (
    <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
      <Grid item xs={6} md={4}>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          component={RouterLink}
          to="add-product"
        >
          Add product
        </Button>
      </Grid>

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
                  <Button size="small" onClick={() => removeProduct(index.id)}>
                    Delete Product
                  </Button>
                  <Button size="small" onClick={() => handleOpen(index.id)}>
                    Edit Product
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(postData)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Title"
                  fullWidth
                  id="Title"
                  label="Title"
                  defaultValue={edit ? edit.title || "" : " "}
                  {...register("title", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  defaultValue={edit ? edit.price || "" : " "}
                  {...register("price", { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  defaultValue={edit ? edit.description || "" : " "}
                  {...register("description", { required: true })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default Admin;
