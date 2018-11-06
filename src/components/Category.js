import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';

import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Delete from '@material-ui/icons/DeleteForever';
import Add from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';


import Pagination from './Pagination';

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
    phraseBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 5px'
    },
    phraseTitle: {
        width: '95%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
};


class Category extends Component {

    state = {
        exampleItems: [],
        pageOfItems: [],
    };

    componentDidMount() {
        const allCountries = this.props.phrases;
        this.setState({allCountries});
    }


    componentWillReceiveProps(nextProps) {
        this.setState({exampleItems: this.props.phrases})
    }

    changeImage = img => {
        let fd = new FormData();
        fd.append('image', img[0], img[0].name);

        this.props.changeAvatar(fd);
    };

    onPageChanged = pageOfItems => {
        this.setState({pageOfItems: pageOfItems});
    };

    render() {
        return (
            <Card className={this.props.classes.card}>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Category name"
                        placeholder="Placeholder"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={this.props.category.name || ''}
                        onChange={this.props.changeName}
                        onBlur={this.props.saveName}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <div className='categories-avatar'>
                        <div className='image'>
                            <img
                                src={this.props.category && this.props.category.image ? this.props.category.image.url : defaultImage}
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

                    <div className='phrases-block'>
                        <Typography className='add-phrase' variant="h6" component="h2">
                            Phrases
                            <Add onClick={this.props.addPhrase} style={{cursor: 'pointer'}}/>
                        </Typography>

                        <Pagination
                            items={this.props.phrases}
                            onChangePage={this.onPageChanged}
                        />

                        {this.state.pageOfItems.map((item, index) => {
                            return (
                                <CardActionArea key={item.id}>
                                        <div className={this.props.classes.phraseBlock}>
                                            <Typography
                                                component="h5"
                                                onClick={() => this.props.getPhrase(item)}
                                                className={this.props.classes.phraseTitle}
                                            >
                                                {item.text}
                                            </Typography>
                                            <Delete onClick={() => this.props.remove(item.id, index)}/>
                                        </div>

                                    <Divider/>
                                </CardActionArea>
                            )
                        })}
                    </div>
                </div>
            </Card>

        )
    }

}


export default withStyles(styles)(Category);