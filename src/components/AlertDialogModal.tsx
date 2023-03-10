import { 
  Center,
  AlertDialog,
  Button,
} from "native-base";
import { useRef } from "react";

interface Props {
  title: string;
  content: string;
  isOpenDialog: boolean;
  onClose: () => void;
  confirmAction: () => void;
  cancelAction: () => void;
}
export function AlertDialogModal({
  title,
  content,
  isOpenDialog,
  onClose,
  confirmAction,
  cancelAction
}: Props) {
  const cancelRef = useRef(null);
  return (
    <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpenDialog} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          
          <AlertDialog.Header>{title}</AlertDialog.Header>
            
          <AlertDialog.Body>
            {content}
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={cancelAction} ref={cancelRef}>Manter aberta</Button>
              <Button 
                background="primary.700"
                color="white" 
                onPress={confirmAction}
              >
                Encerrar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>

        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}