import React, {Component, Fragment} from 'react';


import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/DeleteForever';


const styles = {
    card: {
        width: '50%',
        height: '85vh',
        overflowY: 'auto',
        margin: '10px',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px'
    },
    questionBlock: {
        width: '90%'
    },
    question: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    answer: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
};

class QuestionsList extends Component {
    render() {
        return (
            <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{margin: '0 0 20px 0'}}>
                        {this.props.title}:
                    </Typography>

                    {this.props.questions.map((item, index) => {
                        return (
                            <Fragment key={item.id}>
                                <CardActionArea className={this.props.classes.listItem}>
                                    <div onClick={() => this.props.open(item)} className={this.props.classes.questionBlock}>
                                        <Typography gutterBottom variant="h5" component="h2" className={this.props.classes.question}>
                                            {item.question}
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.answer}>
                                            {item.answer}
                                        </Typography>
                                    </div>
                                    <Delete onClick={() => this.props.remove(item.id, index)}/>
                                </CardActionArea>
                                <Divider/>
                            </Fragment>
                        )
                    })}
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(QuestionsList);