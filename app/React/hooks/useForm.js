import { useFormik } from "formik";
import { object, string } from "yup";

const userSchema = object({
  username: string()
    .required("username is required")
    .min(5, "must be a minimum of 5 characters"),
  password: string()
    .required("password is required")
    .min(5, "must be a minimum of 5 characters"),
});

export default function useForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: userSchema,
  });
  return formik;
}
