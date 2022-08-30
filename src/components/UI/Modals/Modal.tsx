import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';


const Backdrop: React.FC<{ onClose: (flag: boolean) => void }> = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose.bind(null, false)}></div>
    );
};

type ModalOverlayProps = {
    children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

/* Typescript also has a non-null assertion that you can use when you are sure that the value is 
    never null by adding the ! operator to the end of your statement: */
const portalElement = document.getElementById('overlays')!;


export interface BackdropProps {
    children: React.ReactNode;
    onClose: (flag: boolean) => void;
}

/* Here we use React Portal for creating Modals using react */
const Modal: React.FC<BackdropProps> = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;