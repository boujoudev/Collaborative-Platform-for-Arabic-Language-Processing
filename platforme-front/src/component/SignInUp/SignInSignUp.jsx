import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import CodeVerification from "./CodeVerification";
import ChangePassWord from "./ChangePassWord";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ForgotPassword from "./ForgetPassword";
import AfterForgetPassword from "./AfterForgetPassword";

const SignInSignUp = () => {
  const [select, setselect] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="ButtonSignInUp"
          onClick={() => {
            setselect("SignUp");
          }}
        >
          Sign Up
        </button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <button
          className="ButtonSignInUp"
          onClick={() => {
            setselect("SignIn");
          }}
        >
          Sign In
        </button>
      </DialogTrigger>

      <DialogContent>
        {select === "SignIn" ? <SignInPage /> : <SignUpPage />}
      </DialogContent>
    </Dialog>
  );
};

export default SignInSignUp;
