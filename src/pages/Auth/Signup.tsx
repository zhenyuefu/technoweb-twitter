import React, {useState} from "react";
import {useSetRecoilState} from "recoil";
import {Link, useNavigate} from "react-router-dom";
import {Button, Form, Input, Message, Space, Typography} from "@arco-design/web-react";
import {Login as LoginIcon} from "@icon-park/react";

import {checkEmail, checkUsername, register} from "../../utils/auth";
import {IFormRegister} from "../../types";
import {authAtom} from "../../context/auth";
import {sleep} from "../../utils/utils";

type IValidStatus = "success" | "error" | "validating";

function Signup() {
  const [form] = Form.useForm<IFormRegister>();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [usernameState, setUsernameState] = useState<IValidStatus>();
  const [emailState, setEmailState] = useState<IValidStatus>();

  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();


  const onSubmit = async (data: IFormRegister) => {
    try {
      setIsSubmitting(true);
      await sleep(3000);
      const res = await register(data);
      setAuth({
        auth: true,
        username: res.username,
        uid: String(res.uid),
      });
      Message.success(res.message + " Redirecting...");
      await sleep(2000);
      navigate("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Message.error(err.message);
      setIsSubmitting(false);
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

      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <Typography>
          <Typography.Title heading={5}>
            Sign Up
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
          disabled={isSubmitting}
          size="large"
        >
          <Form.Item label='Email' field='email' hasFeedback
                     validateStatus={emailState}
                     validateTrigger={'onBlur'}
                     rules={[{required: true, message: 'Email is required'},
                       {
                         type: 'email',
                         message: 'Wrong email format'
                       },
                       {
                         validator: async (value, callback) => {
                           try {
                             setEmailState('validating');
                             await checkEmail(value);
                             setEmailState("success");
                           } catch (e) {
                             setEmailState('error');
                             callback((e as Error).message);
                           }
                         }
                       }]}>
            <Input placeholder='please enter your email'/>
          </Form.Item>
          <Form.Item label='Username' field='username' hasFeedback
                     validateTrigger={'onBlur'}
                     validateStatus={usernameState}
                     rules={[{required: true, message: 'Username is required'},
                       {
                         minLength: 6,
                         maxLength: 16,
                         message: 'Username must be 6-16 characters'
                       },
                       {
                         match: /^[a-zA-Z\d_-]{6,16}$/i, message:
                           'Username can only use letters numbers and underscores'
                       },
                       {
                         validator: async (value, callback) => {
                           try {
                             setUsernameState('validating');
                             await checkUsername(value);
                             setUsernameState("success");
                           } catch (e) {
                             setUsernameState('error');
                             callback((e as Error).message);
                           }
                         }
                       }

                     ]}>
            <Input placeholder='please enter your username'/>
          </Form.Item>
          <Form.Item
            label='Password'
            field='password'
            hasFeedback
            rules={[
              {required: true, message: 'Password is required'},
              {
                minLength: 8,
                maxLength: 16,
                message: 'Password must be 8-16 characters'
              },
              {
                match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d~!@#$%^&*]{8,16}$/i,
                message:
                  'Password must contain contain both numbers and letters'
              }
            ]}
          >
            <Input.Password placeholder='please enter your password'/>
          </Form.Item>
          <Form.Item>
            <Space>
              <Form.Item label='First Name'
                         field='firstName' hasFeedback
                         rules={[{match: /^[a-zA-Z]+$/i, message: 'Can only contain characters'}]}>

                <Input placeholder='First Name'/>
              </Form.Item>
              <Form.Item label='Last Name'
                         field='lastName' hasFeedback
                         rules={[{match: /^[a-zA-Z]+$/i, message: 'Can only contain characters'}]}>
                <Input placeholder='Last Name'/>
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary' htmlType='submit' long
              loading={isSubmitting}
            >
              Sign Up
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
            <Link to="/i/flow/login">
              {"Already have an account? Sign in"}
            </Link>
          </Typography.Text>
        </Typography>

      </div>
    </div>
  );
}

export default Signup;
