import React, {useState} from "react";

import {useSetRecoilState} from "recoil";
import {Link, useNavigate} from "react-router-dom";
import {Button, Checkbox, Form, Input, Message, Typography} from "@arco-design/web-react";
import {Login as LoginIcon} from "@icon-park/react"

import {authAtom} from "../../context/auth";
import {login} from "../../utils/auth";
import {IFormLogin} from "../../types";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data: IFormLogin) => {
    try {
      setIsFetching(true);
      const res = await login(data);
      setIsFetching(false);
      Message.success(res.message);
      setAuth({
        auth: true,
        uid: res.uid,
        username: res.username,
      });
      navigate("/home");
    } catch (err: any) {
      Message.error(err.message);
      setIsFetching(false);
    }
  };

  return (
    <div>
      <div style={{
        marginTop: "100px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }
      }>
        <LoginIcon theme="outline" size="32" fill="#333"/>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          <Typography.Title heading={5}>
            Sign In
          </Typography.Title>
        </Typography>
      </div>

      <div style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Form
          form={form}
          layout='vertical'
          style={{maxWidth: 380}}
          scrollToFirstError
          onSubmit={onSubmit}
          disabled={isFetching}
          size='large'
        >
          <Form.Item label='Email' field='email' hasFeedback={true}
                     rules={[{required: true, message: 'Email is required'}]}>
            <Input placeholder='please enter your email'/>
          </Form.Item>
          <Form.Item
            label='Password'
            field='password'
            hasFeedback
            rules={[{required: true, message: 'Password is required'}]}
          >
            <Input.Password placeholder='please enter your password'/>
          </Form.Item>
          <Form.Item
            field='remember'

          >
            <Checkbox>Remember me</Checkbox>

          </Form.Item>
          <Form.Item
          >
            <Button
              type='primary' htmlType='submit' long
              loading={isFetching}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div style={{
        display: 'flex',
        margin: "auto",
        width: 360,
        justifyContent: "flex-end"
      }}>


        <Typography>
          <Typography.Text>
            <Link to="/i/flow/signup">
              {"Don't have an account? Sign Up"}
            </Link>
          </Typography.Text>
        </Typography>

      </div>
    </div>
  );
}

export default Login;
