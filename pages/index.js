import React from "react";
import { Button, Modal, Text } from '@nextui-org/react';
import Link from "next/link";

export default function ModalPage() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <>
            <div>
                <Button auto shadow onClick={handler}>
                    Open modal
                </Button>
                
                <Modal
                    closeButton
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            Welcome to
                            <Text b size={18}>
                                NextUI
                            </Text>
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        body
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onClick={closeHandler}>
                            Close
                        </Button>
                        <Button auto onClick={closeHandler}>
                            Sign in
                        </Button>
                    </Modal.Footer>
                </Modal>
              
            </div>
        </>
    );
}