import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Key, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import axiosInstance from "../api/axiosInstance";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/password-reset-request", {
        email,
        role: "AMBASSADOR",
      });
      setSuccessMessage(response.data.message || "OTP sent successfully to your email");
      setStep(2);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please check your email and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/password-reset", {
        email,
        otp,
        password,
        role: "AMBASSADOR",
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to reset password. Please verify the OTP and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-4xl shadow-xl p-8 border border-neutral-100 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-600 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Password Reset!</h1>
          <p className="text-neutral-500 mt-2">Your password has been successfully updated. Redirecting you to login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image with Text Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-blue-900 to-blue-700">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/FE-BG.jpeg)",
            opacity: 0.3,
          }}
        />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Forgot Your Password?
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
            Don't worry, you can recover access to your account using a secure One-Time Password sent directly to your registered email.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <img
                src="/images/nextIf-ico.jpg"
                alt="Logo"
                className="w-14 h-14 mb-6 shadow-lg object-center shadow-blue-600/20 rounded-2xl cursor-pointer"
                onClick={() => navigate("/login")}
              />
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Reset Password
              </h1>
              <p className="text-neutral-500">
                {step === 1 ? "Request a verification code" : "Enter the verification code and set a new password"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step1"
                  onSubmit={handleRequestOtp}
                  className="space-y-5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@nextif.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-4 h-4 text-neutral-400" />}
                  />

                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-2"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Send OTP Code
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="step2"
                  onSubmit={handleResetPassword}
                  className="space-y-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  {successMessage && (
                    <div className="bg-blue-50 border border-blue-100 text-blue-600 text-xs p-3 rounded-xl">
                      {successMessage}
                    </div>
                  )}

                  <Input
                    label="Enter 6-Digit OTP"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    icon={<Key className="w-4 h-4 text-neutral-400" />}
                  />

                  <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="w-4 h-4 text-neutral-400" />}
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Lock className="w-4 h-4 text-neutral-400" />}
                  />

                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-2"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Reset Password
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    className="w-full text-center text-xs text-neutral-500 hover:text-blue-600 transition-colors py-2 flex items-center justify-center gap-1"
                  >
                    <ArrowLeft size={12} /> Change Email
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full text-center text-sm text-neutral-500 hover:text-blue-600 transition-colors py-4 mt-4"
            >
              Back to Login
            </button>

            <p className="text-center text-neutral-400 text-xs mt-8">
              &copy; 2025 NextIF Ambassador Portal. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
