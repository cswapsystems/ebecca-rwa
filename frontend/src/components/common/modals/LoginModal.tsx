"use client";

import Button from "@/components/common/buttons/Button";
import TextInput from "@/components/common/inputs/TextInput";
import React, { useState } from "react";
import { Actions, CreateAccountLink, ErrorMessage, Field, Label, LoginWrap, Title } from "./LoginModalStyles";
import Modal from "./Modal";
import { useAuth } from "@/hooks";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: { username: string; password: string }) => void;
  onCreateAccount?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onSubmit, onCreateAccount }) => {
  const { signIn, refreshUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // If custom onSubmit is provided, use it
    if (onSubmit) {
      onSubmit({ username, password });
      return;
    }

    // Use Amplify Auth
    if (!username || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      await signIn({ username, password });
      // Refresh auth state throughout the app
      await refreshUser();
      // Success - close modal and reset form
      setUsername("");
      setPassword("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && username && password) {
      handleSubmit();
    }
  };

  return (
    <Modal open={open} onClose={onClose} width={440} showHeader={false}>
      <LoginWrap>
        <Title>Log In</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleFormSubmit}>
          <Field>
            <Label>Email</Label>
            <TextInput
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <Actions>
            <Button
              variant="primary"
              width="100%"
              height={44}
              fontSize={16}
              lineHeight={22}
              borderRadius={12}
              disabled={isLoading || !username || !password}
              type={"submit" as const}
            >
              {isLoading ? "Logging in..." : "Submit"}
            </Button>
          </Actions>
        </form>

        <CreateAccountLink onClick={onCreateAccount}>Create New Account</CreateAccountLink>
      </LoginWrap>
    </Modal>
  );
};

export default LoginModal;
