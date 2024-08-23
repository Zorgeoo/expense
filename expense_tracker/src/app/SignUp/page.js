"use client";

import { Logo } from "@/assets/Logo";
import { AuthProvider, useAuth } from "@/components/utils/AuthProvider";
import * as yup from "yup";
import { useFormik } from "formik";

export const SignUp = () => {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object({
    userName: yup.string().required("Нэвтрэх нэрээ оруулна уу"),
    email: yup.string().email("Алдаатай имэйл").required("Имэйлээ оруулна уу"),
    password: yup
      .string()
      .min(8)
      .matches(/[0-9]/, "Тоо оруулна уу")
      .matches(/[A-Z]/, "Том үсэг оруулна уу")
      .matches(/[^\w]/, "Тэмдэгт оруулна уу")
      .required("Нууц үгээ оруулна уу"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null, "Нууц үг зөрүүтэй байна"])
      .required("Нууц үгээ давтан оруулна уу"),
  });

  const onSubmit = async (values) => {
    try {
      // Log the form values for debugging purposes
      console.log(values);

      await register(values.userName, values.email, values.password);

      // Optionally, you could handle success here (e.g., redirect, show a success message)
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error("Registration error:", error);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log(formik.values);

  const { register } = useAuth();

  return (
    <div className="h-screen w-screen">
      <div className="flex w-full h-full">
        <div className="flex-1 m-auto flex flex-col items-center">
          <div className="flex h-fit items-center">
            <Logo width="40" />
            <div>Geld</div>
          </div>
          <div className="flex flex-col items-center py-10">
            <div className="text-2xl font-semibold pb-2">
              Create Geld account
            </div>
            <div>Sign up below to create your Wallet account</div>
          </div>
          <div className="flex flex-col gap-4 w-2/5">
            <input
              type="text"
              placeholder="Name"
              className="pl-4 border rounded-lg bg-[#F3F4F6] p-1"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {formik.errors.userName ? (
              <p className="text-red-600">{formik.errors.userName}</p>
            ) : null}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="pl-4 border rounded-lg bg-[#F3F4F6] p-1"
            />
            {formik.errors.email ? (
              <p className="text-red-600">{formik.errors.email}</p>
            ) : null}
            <input
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="pl-4 border rounded-lg bg-[#F3F4F6] p-1"
            />
            {formik.errors.password ? (
              <p className="text-red-600">{formik.errors.password}</p>
            ) : null}
            <input
              placeholder="Re-password"
              name="confirm"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              className="pl-4 border rounded-lg bg-[#F3F4F6] p-1"
            />
            {formik.errors.confirm ? (
              <p className="text-red-600">{formik.errors.confirm}</p>
            ) : null}
            <button
              className="rounded-[20px] w-full bg-[#0166FF]"
              type="submit"
              onClick={formik.submitForm}
            >
              Sign Up
            </button>
          </div>
          <div className="flex gap-3 pt-10">
            <div>Already have account?</div>
            <div className="text-[#0166FF] cursor-pointer">Log In</div>
          </div>
        </div>
        <div className="flex-1 bg-[#0166FF] w-full h-full"></div>
      </div>
    </div>
  );
};
export default SignUp;
