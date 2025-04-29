import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function CodeVerification() {
  return (
    <div className="code-verification-container">
      <h2 className="verification-title">TAL-Arabe Platform</h2>
      <p className="verification-subtitle">Verify your email address</p>
      <p className="verification-instruction">
        Enter the code sent to you via email
      </p>
      <InputOTP maxLength={6} className="otp-input-container">
        <InputOTPGroup className={"otp-input-group"}>
          <InputOTPSlot index={0} className="otp-slot" />
          <InputOTPSlot index={1} className="otp-slot" />
          <InputOTPSlot index={2} className="otp-slot" />
          <InputOTPSlot index={3} className="otp-slot" />
          <InputOTPSlot index={4} className="otp-slot" />
          <InputOTPSlot index={5} className="otp-slot" />
        </InputOTPGroup>
      </InputOTP>
      <button className="verify-button">Verify</button>
      <p className="resend-instruction">
        Don’t receive code?{" "}
        <a href="#" className="resend-link">
          Request again
        </a>
      </p>
    </div>
  );
}

export default CodeVerification;
