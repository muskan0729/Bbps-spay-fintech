import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";

const RegisterUser = () => {
  const navigate = useNavigate();

  /* ---------------- API ---------------- */
  const { execute: regUser, loading: regLoading } = usePost(
    "/register-new-merchant"
  );
  const { execute: sendPhoneOTP } = usePost("/send-mobile-otp");
  const { execute: verifyPhoneOTP } = usePost("/verify-mobile-otp");
  const { execute: sendEmailOTP } = usePost("/send-mail-otp");
  const { execute: verifyEmailOTP } = usePost("/verify-mail-otp");

  /* ---------------- FORM ---------------- */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [option, setOption] = useState("Individual");

  /* ---------------- PHONE OTP ---------------- */
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  /* ---------------- EMAIL OTP ---------------- */
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  /* ---------------- UI ---------------- */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------- PHONE OTP ---------------- */
  const handleSendPhoneOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!phone) return setError("Enter phone number");

    try {
      setLoading(true);
      await sendPhoneOTP({ mobile_no: phone });
      setPhoneOtpSent(true);
      setPhoneOtp("");
      setSuccess("Phone OTP sent");
    } catch {
      setError("Failed to send phone OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(phoneOtp)) {
      setPhoneOtp("");
      return setError("Phone OTP must be 6 digits");
    }

    try {
      setLoading(true);
      await verifyPhoneOTP({ mobile_no: phone, unique_otp: phoneOtp });
      setPhoneVerified(true);
      setSuccess("Phone verified");
    } catch {
      setPhoneOtp("");
      setPhoneOtpSent(false); // ✅ allow resend
      setError("Invalid phone OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EMAIL OTP ---------------- */
  const handleSendEmailOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) return setError("Enter email address");

    try {
      setLoading(true);
      await sendEmailOTP({ email });
      setEmailOtpSent(true);
      setEmailOtp("");
      setSuccess("Email OTP sent");
    } catch {
      setError("Failed to send email OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(emailOtp)) {
      setEmailOtp("");
      return setError("Email OTP must be 6 digits");
    }

    try {
      setLoading(true);
      await verifyEmailOTP({ email, unique_otp: emailOtp });
      setEmailVerified(true);
      setSuccess("Email verified");
    } catch {
      setEmailOtp("");
      setEmailOtpSent(false); // ✅ allow resend
      setError("Invalid email OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phoneVerified) return setError("Verify phone number");
    if (!emailVerified) return setError("Verify email address");
    if (password !== confirmPassword) return setError("Passwords do not match");

    if (option === "Organization") {
      try {
        const body = { name, mobile_no: phone, email, password };
        const res = await regUser(body);
      
        if (res?.registered) {
          // navigate();
          navigate("/register-organization", {
            state: { name, phone, email, option },
          });
        }
      } catch (err) {
        setError(err?.message || "Registration failed");
      }
    } else {
      navigate("/register-user", {
        state: { name, phone, email, option },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Create Account</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* PHONE */}
        <div>
          <input
            placeholder="Phone"
            type="number"
            value={phone}
            disabled={phoneVerified}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleSendPhoneOTP}
            disabled={phoneVerified}
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {phoneOtpSent ? "Resend OTP" : "Send OTP"}
          </button>

          {phoneOtpSent && !phoneVerified && (
            <div className="flex gap-2 mt-2">
              <input
                value={phoneOtp}
                maxLength={6}
                onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ""))}
                className="flex-1 border rounded-lg px-4 py-2 text-center"
              />
              <button
                onClick={handleVerifyPhoneOTP}
                className="bg-emerald-600 text-white px-4 rounded-lg"
              >
                Verify
              </button>
            </div>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            placeholder="Email"
            value={email}
            type="email"
            disabled={emailVerified}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleSendEmailOTP}
            disabled={emailVerified}
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {emailOtpSent ? "Resend OTP" : "Send OTP"}
          </button>

          {emailOtpSent && !emailVerified && (
            <div className="flex gap-2 mt-2">
              <input
                value={emailOtp}
                maxLength={6}
                onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                className="flex-1 border rounded-lg px-4 py-2 text-center"
              />
              <button
                onClick={handleVerifyEmailOTP}
                className="bg-emerald-600 text-white px-4 rounded-lg"
              >
                Verify
              </button>
            </div>
          )}
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
        </select>

        <button
          type="submit"
          disabled={regLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {regLoading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
