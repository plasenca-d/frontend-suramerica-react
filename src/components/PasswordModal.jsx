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
  useToast,
} from '@chakra-ui/react';
import instanceWithToken from '../utils/instanceWithToken';
import Cookies from 'js-cookie'

const PasswordModal = ({ isOpen, onClose, onSubmit, editId = Cookies.get("id") }) => {
  const [password, setPassword] = useState('');
  const toast = useToast()
  const handleSubmit = () => {

    instanceWithToken.patch('users/' + editId, { password }).then((result) => {
      toast({
        title: 'Exito!',
        description: 'Contraseña actualizada con exito',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
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
