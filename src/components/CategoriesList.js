import React, {PureComponent} from 'react';

import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {
    card: {
        width: '50%',
        height: '85vh',
        overflowY: 'auto',
        margin: '10px',
    }
};

class CategoriesList extends PureComponent {
    render() {
        return (
            <Card className={this.props.classes.card}>
                {this.props.categories.map((item, index) => {
                    return (
                        <CardActionArea
                            onClick={() => this.props.clickevent(item.id, index)}
                            key={item.id}
                        >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography component="p">
                                    Phrases: {item.phrasesCount}
                                </Typography>
                            </CardContent>
                            <Divider/>
                        </CardActionArea>
                    )
                })}
            </Card>
        )
    }
}

export default withStyles(styles)(CategoriesList);