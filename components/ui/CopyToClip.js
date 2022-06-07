import { CopyToClipboard } from 'react-copy-to-clipboard';
import useTranslation from 'next-translate/useTranslation'
import { DocumentCopy } from 'iconsax-react';
import { Button, Tooltip, Whisper } from 'rsuite';
export default function CopyToClip({ text }) {
    const { t } = useTranslation("dashboard")
    return (
        <Whisper
            trigger="click"
            placement="top"
            controlId={`control-id-container`}
            speaker={
                <Tooltip >{t("the_copy")}</Tooltip>
            }
        >
            <Button className="p-0">
                <CopyToClipboard text={text}>
                    <DocumentCopy className=" text-primary" />
                </CopyToClipboard>
            </Button>
        </Whisper>
    )
}