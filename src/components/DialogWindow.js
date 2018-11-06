import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

Modal.setAppElement('#root');

const dialogStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        textAlign: 'center'
    }
};

const Dialog = ({isOpen, type, open, close, action}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={close}
            style={dialogStyle}
            contentLabel="Example Modal"
        >
            <h2>
                {type === 'confirm' ?
                    'Do you really want to confirm this phrase? It will be available to all users.'
                    :
                    'Do you really want to reject this phrase? It will be completely removed from the system.'}
            </h2>

            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button
                    variant="outlined"
                    component="span"
                    onClick={() => {action(); close()}}
                >
                    Yes
                </Button>

                <Button
                    variant="outlined"
                    component="span"
                    onClick={() => close()}
                >
                    No
                </Button>
            </div>
        </Modal>
    )
};

export default Dialog;