import {Alert} from 'react-native';

export function useValidateText() {
  function validateText(
    type: 'name' | 'username' | 'email' | 'password',
    text: string,
  ) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const usernameRegex =
      /^(?=.*[0-9])(?!.*[0-9])|(?=.*[a-z])(?!.*\W)(?!.* ).{5,10}$/;
    const nameRegex = /^(?!.*[0-9])(?=.*[a-z])(?!.*\W)(?!.* ).{3,12}$/;
    const passRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* ).{8,16}$/;

    if (type === 'email') {
      return !text.match(emailRegex)
        ? Alert.alert(
            'Por favor ingresa un correo valido.',
            'Ej. usuario@email.com',
          )
        : true;
    }

    if (type === 'name') {
      return !text.match(nameRegex)
        ? Alert.alert(
            'Por favor ingresa un nombre valido.',
            'Sín números ni caracteres especiales. Ej. Juan',
          )
        : true;
    }

    if (type === 'username') {
      return !text.match(usernameRegex)
        ? Alert.alert(
            'Por favor ingresa un usuario valido.',
            'Sín caracteres especiales (Puede contener numeros). Ej. Usuario12',
          )
        : true;
    }

    if (type === 'password') {
      return !text.match(passRegex)
        ? Alert.alert(
            'Por favor ingresa una contraseña valida.',
            'Ej. Root1234',
          )
        : true;
    }
  }

  return validateText;
}
