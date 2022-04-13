import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { authAtom } from "../../context/auth";
import { useSetRecoilState } from "recoil";
import { login } from "../../utils/auth";
import { IFormLogin, ISnackbarState } from "../../types";
import { LoadingButton } from "@mui/lab";

function Login() {
  const { handleSubmit, control } = useForm<IFormLogin>();

  const navagate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const [snackBarState, setSnackBarState] = useState<ISnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = snackBarState;
  const [serverity, setServerity] = useState<"success" | "error">("success");
  const [infoMessage, setInfoMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleOpen = () => {
    setSnackBarState({ ...snackBarState, open: true });
  };

  const handleClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
    try {
      setIsFetching(true);
      const res = await login(data);
      setServerity("success");
      setInfoMessage(res.message);
      handleOpen();
      setAuth({
        auth: true,
        uid: res.uid,
        username: res.username,
      });
      navagate("/home");
    } catch (err: any) {
      // console.log(err);
      setIsFetching(false);
      setServerity("error");
      setInfoMessage(err.message);
      handleOpen();
    }
  };
  // console.log(errors);

  return (
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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />
          <Controller
            name="remember"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} value="remember" />}
                label="Remember me"
              />
            )}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isFetching}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/i/flow/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={serverity}
          sx={{ width: "100%" }}
        >
          {infoMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
