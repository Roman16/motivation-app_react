import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import defaultImage from '../img/default-image.png';
import Dialog from './DialogWindow';

const styles = {
    card: {
        width: '50%',
        height: '85vh',
        overflowY: 'auto',
        margin: '10px',
        padding: '10px',
        boxSizing: 'border-box'
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    saveButton: {
        margin: '0 auto',
        display: 'block',
        width: '100px',
        textAlign: 'center'
    },
};


class OfferedPhrase extends Component {
    state = {
        ...this.props.phrase,
        reason: '',
        modalIsOpen: false,
        type: ''
    };

    openModal = type => {
        this.setState({modalIsOpen: true, type});
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    componentWillReceiveProps(nextProps) {
        if(Object.keys(nextProps.phrase).length === 0) {
            this.setState({
                type: '',
                reason: '',
                text: '',
                originalAuthor: '',
                category: {
                    name: ''
                }
            });
        } else {
            this.setState({...nextProps.phrase, type: '', reason: ''});
        }
    }

    updatePhrase = () => {
        if(this.state.type === 'confirm') {
            this.props.update(this.state)
        } else {
            this.props.reject(this.state.reason)
        }
    };

    render() {
        return (
            <Card className={this.props.classes.card}>
                <div>
                    <TextField
                        label="Phrase"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={this.state.text || ''}
                        onChange={e => this.setState({text: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="Author"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={this.state.originalAuthor || ''}
                        onChange={e => this.setState({originalAuthor: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="Category"
                        fullWidth
                        disabled
                        margin="normal"
                        variant="outlined"
                        value={this.state.category ? this.state.category.name : ''}
                        onChange={e => this.setState({category: {...this.state.category, name: e.target.value}})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="Reason of rejection"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline={true}
                        rows={3}
                        value={this.state.reason}
                        onChange={e => this.setState({reason: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <div className='categories-avatar'>
                        <div className='image'>
                            <img
                                src={this.state.image ? this.state.image.url : defaultImage}
                                alt=""/>
                        </div>
                    </div>

                    <div style={{display: 'flex'}}>
                        <Button
                            className={this.props.classes.saveButton}
                            variant="outlined"
                            component="span"
                            onClick={() => this.openModal('confirm')}
                        >
                            Confirm
                        </Button>

                        <Button
                            className={this.props.classes.saveButton}
                            variant="outlined"
                            component="span"
                            onClick={() => this.openModal('reject')}
                        >
                            Reject
                        </Button>
                    </div>
                </div>

                <Dialog
                    isOpen={this.state.modalIsOpen}
                    type={this.state.type}
                    open={this.openModal}
                    close={this.closeModal}
                    action={this.updatePhrase}
                />
            </Card>

        )
    }
}


export default withStyles(styles)(OfferedPhrase);