import React, {PureComponent} from 'react';

import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
    card: {
        width: '50%',
        height: '85vh',
        overflowY: 'auto',
        margin: '10px',
        padding: '10px',
        boxSizing: 'border-box'
    },
    saveButton: {
        margin: '0 auto',
        display: 'block',
        width: '150px',
        textAlign: 'center'
    }
};

class Question extends PureComponent {
    render() {
        return (
            <Card className={this.props.classes.card}>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Question"
                        fullWidth
                        multiline={true}
                        rows={2}
                        margin="normal"
                        variant="outlined"
                        value={this.props.question.question || ''}
                        onChange={this.props.handleChange('question')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="outlined-full-width"
                        label="Answer"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline={true}
                        rows={10}
                        value={this.props.question.answer || ''}
                        onChange={this.props.handleChange('answer')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Button
                        className={this.props.classes.saveButton}
                        variant="outlined"
                        component="span"
                        onClick={() => this.props.answer()}
                    >
                        {this.props.button}
                    </Button>
                </div>
            </Card>
        )
    }
}

export default withStyles(styles)(Question);