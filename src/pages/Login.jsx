import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import swal from "sweetalert";

import { login } from "../store/auth";
import { getCart, postCart } from "../store/cart/cart";

function Login() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const { cart } = useSelector((state) => state.cart);

  const theme = createTheme();

  const postData = async (data, e) => {
    await axios
      .post("http://localhost:7000/login", data)
      .then((res) => {
        const data = {
          token: res.data,
        };
        dispatch(login(data));
      })
      .then(() => {
        dispatch(getCart());
      })
      .then(() => {
        if (localStorage.getItem("cart")) {
          dispatch(
            postCart([...cart, ...JSON.parse(localStorage.getItem("cart"))])
          );
        }
        localStorage.removeItem("cart");
        e.target.reset();
        history.push("/");
      })
      .catch(() =>
        swal({
          title: "Oops!",
          text: "Wrong password or username!",
          icon: "error",
          button: "Close",
        })
      );
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(postData)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              {...register("email", { required: true })}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              {...register("password", { required: true })}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
