"use client";
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from '@nextui-org/react';
import { MailIcon } from '../icons/MailIcon.jsx';
import { LockIcon } from '../icons/LockIcon.jsx';
import { useAuth } from '../../../AuthContext';

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}


const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
  const { signIn } = useAuth();

  const handleSignIn = () => {
    // Perform sign-in logic here
    signIn();
    onClose(); // Close the modal after signing in
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
            />
            <div className="flex py-2 px-1 justify-between">
              <Checkbox
                classNames={{
                  label: 'text-small',
                }}
              >
                Remember me
              </Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleSignIn}>
              Sign in
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default SignIn;
