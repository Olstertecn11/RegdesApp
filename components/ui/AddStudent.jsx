import React, { useState } from 'react';
import { Modal, Button, FormControl, Input, IconButton } from 'native-base';
import { Toast } from 'native-base';
import { register } from '../../services/user';
import { assignedMeToClass } from '../../services/classes';
import { useSession } from '../../context/SessionContext';
import { Eye, EyeOff } from 'lucide-react-native';

const AddStudent = ({ isOpen, onClose, update }) => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useSession();

  const handleSave = async () => {
    // Verificar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
      Toast.show({
        title: 'Las contraseñas no coinciden',
      });
      return;
    }

    const response = await register({ usuario, contrasena, correo });
    onClose();
    if (response.status === 201) {
      Toast.show({
        title: 'Usuario creado correctamente',
      });

      const user_created = response.data;

      const response2 = await assignedMeToClass(user_created.id, user.clase.id_clase);
      if (response2.status === 201) {
        Toast.show({
          title: 'Usuario asignado correctamente',
        });
      } else {
        Toast.show({
          title: 'Error al asignar usuario',
        });
      }
      return;
    }
    Toast.show({
      title: 'Error al crear usuario',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content maxWidth="400px" bg={'#191A1A'}>
        <Modal.CloseButton />
        <Modal.Header>Agregar Clase</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Usuario</FormControl.Label>
            <Input value={usuario} onChangeText={setUsuario} placeholder="Ingrese nombre" color="white" />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Correo</FormControl.Label>
            <Input value={correo} onChangeText={setCorreo} placeholder="Ingrese su correo" color="white" />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={contrasena}
              onChangeText={setContrasena}
              placeholder="Ingrese su contraseña"
              color="white"
              InputRightElement={
                <IconButton
                  icon={showPassword ? <EyeOff color="white" /> : <Eye color="white" />}
                  onPress={() => setShowPassword(!showPassword)}
                  variant="unstyled"
                />
              }
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Confirmar Contraseña</FormControl.Label>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmarContrasena}
              onChangeText={setConfirmarContrasena}
              placeholder="Confirme su contraseña"
              color="white"
              InputRightElement={
                <IconButton
                  icon={showConfirmPassword ? <EyeOff color="white" /> : <Eye color="white" />}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  variant="unstyled"
                />
              }
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button bg="red.500" color="white" onPress={onClose}>
              Cancelar
            </Button>
            <Button onPress={handleSave} bg="teal.400" color="white">
              Guardar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddStudent;
