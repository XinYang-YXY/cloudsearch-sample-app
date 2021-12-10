import { useState, useRef } from "react";

import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineIdcard } from "react-icons/ai";
import { FaRegHandPeace } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { FcCancel } from "react-icons/fc";

function NewsletterPage(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmailInvalid, setUserEmailInvalid] = useState({
    isInvalid: false,
  });
  const [userNameInvalid, setUserNameInvalid] = useState({ isInvalid: false });

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailInvalid, setNewEmailInvalid] = useState({ isInvalid: false });

  const [unsubscriptionEmail, setUnsubscriptionEmail] = useState("");

  const [subscribeBtnAction, setSubscribeBtnAction] = useState({
    isLoading: false,
  });

  const toast = useToast();

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const updateInitialRef = useRef();
  const deleteInitialRef = useRef();

  function onChangeUserEmail(event) {
    const target = event.target;
    setUserEmail(target.value);
  }
  function onChangeUserName(event) {
    const target = event.target;
    setUserName(target.value);
  }

  function onChangeCurrentEmail(event) {
    const target = event.target;
    setCurrentEmail(target.value);
  }
  function onChangeNewEmail(event) {
    const target = event.target;
    setNewEmail(target.value);
  }

  function onChangeUnsubscriptionEmail(event) {
    const target = event.target;
    setUnsubscriptionEmail(target.value);
  }

  const backend_api_url = process.env.REACT_APP_BACKEND_API_URL

  function create_request() {
    if (userEmail === "" && userName === "") {
      setUserEmailInvalid({ isInvalid: true });
      setUserNameInvalid({ isInvalid: true });
      toast({
        title: "Please enter your email & name.",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    } else if (userEmail === "") {
      setUserEmailInvalid({ isInvalid: true });
      toast({
        title: "Please enter your email.",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    } else if (userName === "") {
      setUserNameInvalid({ isInvalid: true });
      toast({
        title: "Please enter your name.",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    } else {
      setSubscribeBtnAction({ isLoading: true });
      setUserEmailInvalid({ isInvalid: false });
      setUserNameInvalid({ isInvalid: false });
      const myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, name: userName }),
      };

      fetch(
        `${backend_api_url}/subscribe`,
        myInit
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);

          if (data.status === "failure") {
            if (data.reason === "ER_DUP_ENTRY") {
              setUserEmailInvalid({ isInvalid: true });
              toast({
                title:
                  "The email is already used to subscribe to the newsletter",
                position: "top-right",
                status: "error",
                isClosable: true,
              });
            } else {
              toast({
                title: "Oops, something went wrong. Please try again.",
                position: "top-right",
                status: "error",
                isClosable: true,
              });
            }
          } else {
            fetch(
              `${backend_api_url}/subscribe/count`,
              { method: "GET" }
            )
              .then((res) => {
                return res.json();
              })
              .then((totalSubscriber) => {
                console.log(totalSubscriber);
                if (totalSubscriber !== "failure") {
                  toast({
                    title: `Subscribed successfully! We have ${totalSubscriber} subscriber(s) now!`,
                    position: "top-right",
                    status: "success",
                    isClosable: true,
                  });
                }
              });
          }

          setSubscribeBtnAction({ isLoading: false });
        });
    }
  }
  function update_request() {
    if (newEmail === "") {
      setNewEmailInvalid({ isInvalid: true });
      toast({
        title: "Please enter your new email.",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    } else {
      setNewEmailInvalid({ isInvalid: false });
      const myInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldEmail: currentEmail,
          newEmail: newEmail,
        }),
      };

      fetch(
        `${backend_api_url}/subscribe/update`,
        myInit
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status === "failure") {
            if (data.reason === "ER_DUP_ENTRY") {
              toast({
                title:
                  "The new email is already used to subscribe to the newsletter",
                position: "top-right",
                status: "error",
                isClosable: true,
              });
            } else if (data.reason === 400) {
              toast({
                title: "Your current email is not subscribed to the newsletter",
                position: "top-right",
                status: "error",
                isClosable: true,
              });
            } else {
              toast({
                title: "Oops, something went wrong. Please try again.",
                position: "top-right",
                status: "error",
                isClosable: true,
              });
            }
          } else {
            toast({
              title: "Email updated successfully!",
              position: "top-right",
              status: "success",
              isClosable: true,
            });
            onUpdateClose();
            setCurrentEmail("");
            setNewEmail("");
          }
        });
    }
  }
  function delete_request() {
    const myInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: unsubscriptionEmail }),
    };

    fetch(
      `${backend_api_url}/unsubscribe`,
      myInit
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === "failure") {
          if (data.reason === 400) {
            toast({
              title: "The email is not subscribed to the newsletter",
              position: "top-right",
              status: "error",
              isClosable: true,
            });
          } else {
            toast({
              title: "Oops, something went wrong. Please try again.",
              position: "top-right",
              status: "error",
              isClosable: true,
            });
          }
        } else {
          toast({
            title: "Unsubscribed successfully!",
            position: "top-right",
            status: "success",
            isClosable: true,
          });
          onDeleteClose();
          setUnsubscriptionEmail("");
        }
      });
  }
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr"
      alignItems="center"
      height="calc(100vh - 30px)"
      marginLeft="10px"
      marginRight="10px"
    >
      <Box maxW="300px" m="auto">
        <Text textAlign={["center"]} textStyle="h1" fontSize="1.2rem" mb="3px">
          CloudSeArch Newsletter
        </Text>
        <InputGroup mb="10px">
          <InputLeftElement
            pointerEvents="none"
            children={<HiOutlineMail color="gray.300" />}
          />
          <Input
            type="email"
            placeholder="Your Email"
            {...userEmailInvalid}
            errorBorderColor="red.300"
            onChange={onChangeUserEmail}
          />
        </InputGroup>
        <InputGroup mb="10px">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineIdcard color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Your Name"
            {...userNameInvalid}
            errorBorderColor="red.300"
            onChange={onChangeUserName}
          />
        </InputGroup>
        <Box display="flex" justifyContent="flex-end">
          <Button
            rightIcon={<FaRegHandPeace />}
            colorScheme="blue"
            onClick={create_request}
            loadingText="Subscribing..."
            {...subscribeBtnAction}
          >
            Subscribe
          </Button>
        </Box>

        <Box mt="13px">
          <Button
            colorScheme="whatsapp"
            width="300px"
            mb="10px"
            leftIcon={<FiEdit />}
            onClick={onUpdateOpen}
          >
            Update Subscription
          </Button>
          <Button
            colorScheme="red"
            width="300px"
            leftIcon={<ImCancelCircle />}
            onClick={onDeleteOpen}
          >
            Unsubscribe
          </Button>
        </Box>
      </Box>

      <Modal
        initialFocusRef={updateInitialRef}
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        isCentered
        motionPreset="slideInBottom"
        marginLeft="10px"
        marginRight="10px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update subscription email</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Current email</FormLabel>
              <Input
                ref={updateInitialRef}
                placeholder="Current email"
                onChange={onChangeCurrentEmail}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>New email</FormLabel>
              <Input
                placeholder="New Email"
                {...newEmailInvalid}
                errorBorderColor="red.300"
                onChange={onChangeNewEmail}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              leftIcon={<BiEditAlt />}
              onClick={update_request}
            >
              Update
            </Button>
            <Button onClick={onUpdateClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={deleteInitialRef}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        size="xs"
        isCentered
        motionPreset="slideInBottom"
        marginLeft="10px"
        marginRight="10px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sorry to see you go</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Your email</FormLabel>
              <Input
                ref={deleteInitialRef}
                placeholder="Your email"
                onChange={onChangeUnsubscriptionEmail}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              leftIcon={<FcCancel />}
              onClick={delete_request}
            >
              Unsubscribe
            </Button>
            <Button onClick={onDeleteClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NewsletterPage;
