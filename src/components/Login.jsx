"use client";
import { deleteToken, getToken, saveToken } from "@/mutation/serverActions";
import { logout, userData } from "@/slices/loginSlice";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state?.login?.status);
  const status = useSelector((state) => state?.login);
  console.log(status?.user, "userStatus");

  useEffect(() => {
    if (userStatus === "failed" || userStatus === "succeeded") {
      {
        checkUser();
      }
    }
  }, [userStatus]);

  const checkUser = async () => {
    const token = await getToken();

    if (token?.value) {
      router.push("/dashboard");
    } else if (
      status?.status === "succeeded" &&
      status?.user === 500 &&
      !token?.value
    ) {
      message.error("please check your email or password");
      dispatch(logout())
    }
  };

  // email: "dev.aert@gmail.com",
  // password: "helloworld",

  const onFinish = async (values) => {
    dispatch(
      userData({
        ...values,
        isEmployee: true,
      })
    );
    checkUser();
  };

  return (
    <div className="pt-7">
      <Form
        className="pt-12"
        name="register"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          required={false}
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          required={false}
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Must be at least 6 characters" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item className="mt-9">
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={userStatus === "loading"}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
