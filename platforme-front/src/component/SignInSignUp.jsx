import { Weight } from "lucide-react";
import SignUpPage from "./SignUpPage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SignInSignUp = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="ButtonSignInUp">Sign Up</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <SignUpPage />
      </DialogContent>
    </Dialog>
  );
};

export default SignInSignUp;
