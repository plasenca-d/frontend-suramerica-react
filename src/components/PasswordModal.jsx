import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import instanceWithToken from '../utils/instanceWithToken';
import Cookies from 'js-cookie'

const PasswordModal = ({ isOpen, onClose, onSubmit, editId = Cookies.get("id") }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {

    instanceWithToken.patch('users/'+editId, {password}).then((result) => {
      alert("clave actualizada con exito")
    })

    setPassword('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asigna Nuevo Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Nueva Clave'
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={handleSubmit}>
            Actualizar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PasswordModal;
