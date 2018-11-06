import React, {PureComponent, Fragment} from 'react';

import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';


const styles = {
    card: {
        width: '50%',
        height: '85vh',
        overflowY: 'auto',
        margin: '10px',
    },
    phraseBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '25px',
        width: '100%'
    },
    phrase: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
};

class OfferedList extends PureComponent {
    render() {
        return (
            <Card className={this.props.classes.card}>
                {/*<Typography gutterBottom variant="h5" component="h2" style={{margin: '0 0 20px 0'}}>*/}
                {/*Offered phrases:*/}
                {/*</Typography>*/}

                {this.props.list.map((item, index) => {
                    return (
                        <Fragment key={item.id}>
                            <CardActionArea className={this.props.classes.phraseBlock}>
                                    <div onClick={() => this.props.openPhrase(item)} style={{width: '100%'}}>
                                        <Typography gutterBottom variant="h5" component="h2"
                                                    className={this.props.classes.phrase}>
                                            {item.text}
                                        </Typography>
                                        <Typography component="p">
                                            Category: {item.category.name}
                                        </Typography>
                                    </div>
                                {/*<Delete onClick={() => this.props.remove(item.id, index)}/>*/}
                            </CardActionArea>
                            <Divider/>
                        </Fragment>
                    )
                })}
            </Card>
        )
    }
}

export default withStyles(styles)(OfferedList);