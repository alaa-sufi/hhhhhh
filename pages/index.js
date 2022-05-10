import React from "react";
import { Button, Modal, Text } from '@nextui-org/react';
import Link from "next/link";
import { Profile , Courthouse , Sms ,Global,Eye ,Flag ,Facebook,Google,Call } from 'iconsax-react';

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
                <Profile
 size="32"
 color="#FF8A65"
/>
<Courthouse
 size="32"
 color="#FF8A65"
/>
<Sms
 size="32"
 color="#FF8A65"
/>
{/* <Lock1
 size="32"
 color="#FF8A65"
/> */}
<Eye
 size="32"
 color="#FF8A65"
/>
<Global
 size="32"
 color="#FF8A65"
/>
<Flag
 size="32"
 color="#FF8A65"
/>
<Facebook
 size="32"
 color="#FF8A65"
/>
<Google
 size="32"
 color="#FF8A65"
/>
<Call
 size="32"
 color="#FF8A65"
/>
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