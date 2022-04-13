import React, { useState } from "react";

import { SubmitHandler, useForm, Controller } from "react-hook-form";

import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { existEmail, existUsername, register } from "../../utils/auth";
import { IFormRegister, ISnackbarState } from "../../types";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { sleep } from "../../utils/utils";

function Signup() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormRegister>({ mode: "onChange" });
  const [isFetching, setIsFetching] = React.useState(false);
  const [snackBarState, setSnackBarState] = useState<ISnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = snackBarState;
  const [serverity, setServerity] = useState<"success" | "error">("success");
  const [infoMessage, setInfoMessage] = useState("");
  const [usernameExist, setUsernameExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const handleOpen = () => {
    setSnackBarState({ ...snackBarState, open: true });
  };

  const handleClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  async function onUsernameBlur(name: string) {
    try {
      await existUsername(name);
      setUsernameExist(true);
    } catch (e) {
      setUsernameExist(false);
    }
  }

  async function onEmailBlur(email: string) {
    try {
      await existEmail(email);
      setEmailExist(true);
    } catch (e) {
      setEmailExist(false);
    }
  }

  const onSubmit: SubmitHandler<IFormRegister> = async (data) => {
    try {
      setIsFetching(true);
      const res = await register(data);
      setAuth({
        auth: true,
        username: res.user.username,
        uid: String(res.user._id),
      });
      setServerity("success");
      setInfoMessage(res.message + " Redirecting...");
      handleOpen();
      await sleep(2000);
      navigate("/home");
    } catch (err: any) {
      // console.log(err);
      setServerity("error");
      setInfoMessage(err.message);
      handleOpen();
      setIsFetching(false);
    }
  };

  // console.log(errors);

  return (
    <div>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: false, pattern: /^[a-zA-Z]+$/i }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      error={fieldState.invalid}
                      autoFocus
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: false, pattern: /^[a-zA-Z]+$/i }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      error={fieldState.invalid}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 6,
                    maxLength: 16,
                    pattern: /^[a-zA-Z0-9_-]{6,16}$/i,
                  }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      name="username"
                      label="Username"
                      type="username"
                      id="username"
                      autoComplete="username"
                      color={
                        fieldState.isDirty && !usernameExist
                          ? "success"
                          : "primary"
                      }
                      error={
                        fieldState.invalid ||
                        (usernameExist && fieldState.isDirty)
                      }
                      onBlur={() => onUsernameBlur(field.value)}
                      helperText={
                        (fieldState.error &&
                          (fieldState.error.type === "required"
                            ? "Username is Required"
                            : fieldState.error.type ===
                              ("minLength" || "maxLength ")
                            ? "Username must be between 6 and 16 characters"
                            : "Username can only use letters numbers and underscores")) ||
                        (usernameExist && "Username already exist")
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i,
                  }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      onBlur={() => onEmailBlur(field.value)}
                      autoComplete="email"
                      color={
                        fieldState.isDirty && !emailExist
                          ? "success"
                          : "primary"
                      }
                      error={
                        fieldState.invalid || (emailExist && fieldState.isDirty)
                      }
                      helperText={
                        (fieldState.error &&
                          (fieldState.error.type === "required"
                            ? "Email is Required"
                            : "This is not a valid email")) ||
                        (emailExist && "This email is already registered")
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*]{8,16}$/i,
                  }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={fieldState.invalid}
                      helperText={
                        fieldState.error &&
                        (fieldState.error.type === "required"
                          ? "Password is Required"
                          : "Password must be 8-16 characters and contain both numbers and letters")
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isFetching}
              disabled={Object.keys(errors).length !== 0 || usernameExist}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/i/flow/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
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
    </div>
  );
}

export default Signup;
