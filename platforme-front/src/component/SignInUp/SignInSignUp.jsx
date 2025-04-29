import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import CodeVerification from "./CodeVerification";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

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
