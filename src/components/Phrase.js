import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';

import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import defaultImage from '../img/default-image.png';

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
    }
};


class Phrase extends Component {
    state = {
        phrase: this.props.phrase || {},
        newPhrase: (this.props.phrase.id ? false : true),
        img: {}
    };

    changeImage = img => {
        let fd = new FormData();
        fd.append('image', img[0], img[0].name);
        this.setState({img: fd});

        this.setState({phrase: {...this.state.phrase, image: {url: URL.createObjectURL(img[0])}}});
    };


    render() {
        return (
            <Card className={this.props.classes.card}>
                <div>
                    <CardActionArea
                        className={this.props.classes.backButton}
                        onClick={() => this.props.backCategory()}
                    >
                        <LeftArrow/>
                        Back to {this.props.category.name}
                    </CardActionArea>
                    <Divider/>

                    <TextField
                        label="Phrase"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={this.state.phrase.text || ''}
                        onChange={e => this.setState({phrase: {...this.state.phrase, text: e.target.value}})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="Author"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={this.state.phrase.originalAuthor || ''}
                        onChange={e => this.setState({phrase: {...this.state.phrase, originalAuthor: e.target.value}})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <div className='categories-avatar'>
                        <div className='image'>
                            <img
                                src={this.state.phrase && this.state.phrase.image && this.state.phrase.image.url ? this.state.phrase.image.url : defaultImage}
                                alt=""/>
                        </div>
                        <div>
                            <ImageUploader
                                withIcon={false}
                                buttonText='Change image'
                                withLabel={false}
                                onChange={this.changeImage}
                                singleImage={true}
                                imgExtension={['.jpg', '.png', '.gif']}
                                maxFileSize={5242880}
                            />
                        </div>
                    </div>

                    <Button
                        className={this.props.classes.saveButton}
                        variant="outlined"
                        component="span"
                        onClick={() => this.props.save({
                            ...this.state.phrase,
                            categoryId: this.props.category.id,
                            image: this.state.img
                        }, this.state.newPhrase)}
                    >
                        Save
                    </Button>
                </div>
            </Card>

        )
    }
}


export default withStyles(styles)(Phrase);