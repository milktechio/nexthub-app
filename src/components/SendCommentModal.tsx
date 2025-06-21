import React, {useState} from 'react';
import {Button, Modal} from 'native-base';

type Props = {
  isOpen: boolean;
};

const SendCommentModal = ({isOpen}: Props) => {
  const [isOpenInside, setIsOpenInside] = useState(false);

  function sendCommentHandler() {}

  return (
    <Modal isOpen={isOpen || isOpenInside} size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Enviar Comentario</Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button flex="1" onPress={sendCommentHandler}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default SendCommentModal;
