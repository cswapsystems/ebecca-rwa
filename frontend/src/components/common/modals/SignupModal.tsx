"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import TextInput from "@/components/common/inputs/TextInput";
import Button from "@/components/common/buttons/Button";
import VerificationModal from "./VerificationModal";
import { LoginWrap, Title, Field, Label, Actions, CreateAccountLink } from "./LoginModalStyles";
import { signUp, confirmSignUp, resendSignUpCode, getCurrentUser } from "@/lib/auth";
import { createUser } from "@/lib/data/userData";
import { useAuth } from "@/hooks";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, onClose, onSwitchToLogin }) => {
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = async () => {
    // Validate inputs
    if (!email || !fullName || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
            name: fullName,
          },
          autoSignIn: false, // Require email verification first
        },
      });

      setIsLoading(false);
      setShowVerification(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      // Confirm signup in Cognito
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      // Get the authenticated user to get userId
      const authUser = await getCurrentUser();
      if (authUser) {
        // Create User record in DynamoDB (server action)
        await createUser(email, fullName, authUser.userId);
      }

      // Refresh auth state throughout the app
      await refreshUser();

      setShowVerification(false);
      onClose();
    } catch (err) {
      throw err;
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
    } catch (err) {
      throw err;
    }
  };

  const handleClose = () => {
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setShowVerification(false);
    onClose();
  };

  return (
    <>
      <Modal open={open && !showVerification} onClose={handleClose} width={440} showHeader={false}>
        <LoginWrap>
          <Title>Create Account</Title>

          {error && (
            <div
              style={{
                color: "#d32f2f",
                fontSize: "14px",
                marginBottom: "16px",
                padding: "8px",
                backgroundColor: "#ffebee",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          <Field>
            <Label>Email</Label>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              type="email"
              width="100%"
              borderRadius={12}
              fontSize={16}
              lineHeight={20}
              padding="12px 13px"
              disabled={isLoading}
            />
          </Field>

          <Field>
            <Label>Full Name</Label>
            <TextInput
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              width="100%"
              borderRadius={12}
              fontSize={16}
              lineHeight={20}
              padding="12px 13px"
              disabled={isLoading}
            />
          </Field>

          <Field>
            <Label>Password</Label>
            <TextInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
              width="100%"
              borderRadius={12}
              fontSize={16}
              lineHeight={20}
              padding="12px 13px"
              disabled={isLoading}
            />
          </Field>

          <Field>
            <Label>Confirm Password</Label>
            <TextInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              type="password"
              width="100%"
              borderRadius={12}
              fontSize={16}
              lineHeight={20}
              padding="12px 13px"
              disabled={isLoading}
            />
          </Field>

          <Actions>
            <Button
              variant="primary"
              onClick={handleSubmit}
              width="100%"
              height={44}
              fontSize={16}
              lineHeight={22}
              borderRadius={12}
              disabled={isLoading || !email || !fullName || !password || !confirmPassword}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </Actions>

          {onSwitchToLogin && (
            <CreateAccountLink onClick={onSwitchToLogin}>Already have an account? Log in</CreateAccountLink>
          )}
        </LoginWrap>
      </Modal>

      <VerificationModal
        open={showVerification}
        onClose={() => {
          setShowVerification(false);
          handleClose();
        }}
        email={email}
        onVerify={handleVerify}
        onResendCode={handleResendCode}
      />
    </>
  );
};

export default SignupModal;
