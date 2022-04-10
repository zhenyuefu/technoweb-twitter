import React from "react";

import { SubmitHandler, useForm, Controller } from "react-hook-form";

import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface IFormInput {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

function Signup() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          window.location.href = "/";
        }
      });
  };
  console.log(errors);

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
                      error={fieldState.invalid}
                      helperText={
                        fieldState.error &&
                        (fieldState.error.type === "required"
                          ? "Username is Required"
                          : fieldState.error.type ===
                            ("minLength" || "maxLength ")
                          ? "Username must be between 6 and 16 characters"
                          : "Username can only use letters numbers and underscores")
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
                      autoComplete="email"
                      error={fieldState.invalid}
                      helperText={
                        fieldState.error &&
                        (fieldState.error.type === "required"
                          ? "Email is Required"
                          : "This is not a valid email")
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
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
    </div>
  );
}

export default Signup;
