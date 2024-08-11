import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import HeroImage from "./ui/HeroImage";
import { toast } from 'react-toastify'
import axios from "axios";
import url from "@/baseurl";

const Hero = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (url !== "http://localhost:8000") {
      onOpen();
    }
  }, [onOpen]);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(`${url}`);
        console.log(response);
        if (response.status === 200) {
          toast.success('Backend is now active!');
          console.log('success');
        }
      } catch (error) {
        toast.error('Unable to connect to backend.');
        console.log('error');
      }
    };
    checkBackend();
  }, []);

  return (
    <>
      <HeroImage />
      <div className="z-1 absolute inset-0 flex flex-col justify-center p-6 space-y-4 rounded-lg">
        <p className="text-white z-5 text-6xl font-bold drop-shadow-md bg-clip-text animate-gradient">
          <strong className="text-9xl">Share</strong> and{" "}
          <strong className="text-8xl">Learn</strong>
        </p>
        <p className="text-white text-6xl font-bold drop-shadow-md bg-clip-text animate-gradient">
          New Recipes
        </p>
        <p className="text-white text-2xl font-medium drop-shadow-md">
          Discover the world's best recipes and share your own creations
        </p>
        <p className="text-white text-lg drop-shadow-md">
          Join our community and explore culinary delights from around the globe
        </p>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Important message
              </ModalHeader>
              <ModalBody>
                <p>
                  You are currently viewing the website with the backend
                  deployed on a third party service which may take 60-90 seconds
                  to load. So please be patient and wait for the website to
                  load.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Hero;
