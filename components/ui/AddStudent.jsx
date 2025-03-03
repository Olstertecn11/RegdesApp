import React, { useState } from 'react';
import { Modal, Button, FormControl, Input, IconButton, Toast } from 'native-base';
import { Eye, EyeOff } from 'lucide-react-native';
import { register } from '../../services/user';
import { useSession } from '../../context/SessionContext';
import { assignedMeToClass } from '../../services/classes';

const AddStudent = ({ isOpen, onClose }) => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSession();

  const handleSave = async () => {
    if (contrasena !== confirmarContrasena) {
      Toast.show({ title: 'Las contraseñas no coinciden' });
      return;
    }

    setIsLoading(true);
    const response = await register({ usuario, contrasena, correo });
    console.log(response);

    if (response.status === 201) {
      const user_created = response.data;
      const response2 = await assignedMeToClass(user_created.id, user.clase.id_clase);
      console.log(response2);

      if (response2.status === 201) {
        Toast.show({ title: 'Usuario asignado correctamente' });
      } else {
        Toast.show({ title: 'Error al asignar usuario' });
      }
    } else {
      Toast.show({ title: 'Error al crear usuario' });
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content maxWidth="400px" bg={'#191A1A'}>
        <Modal.CloseButton />
        <Modal.Header>Agregar Estudiante</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Usuario</FormControl.Label>
            <Input
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Ingrese nombre"
              color="white"
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Correo</FormControl.Label>
            <Input
              value={correo}
              onChangeText={setCorreo}
              placeholder="Ingrese su correo"
              color="white"
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type='password'
              value={contrasena}
              onChangeText={setContrasena}
              placeholder="Ingrese su contraseña"
              color="white"
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Confirmar Contraseña</FormControl.Label>
            <Input
              type='password'
              value={confirmarContrasena}
              onChangeText={setConfirmarContrasena}
              placeholder="Confirme su contraseña"
              color="white"
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              bg="red.500"
              color="white"
              onPress={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onPress={handleSave}
              bg="teal.400"
              color="white"
              isLoading={isLoading}
            >
              Guardar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddStudent;
