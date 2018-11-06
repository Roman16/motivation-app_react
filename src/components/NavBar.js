import React from 'react';
import {NavLink} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';


const styles = {
    root: {
        width: '15%',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)'
    },
    a: {
        textDecoration: 'none',
        width: '100%',
        padding: '15px',
        color: '#686868',
        fontSize: '15px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: ' 400',
    },
    collapseItem: {
        textDecoration: 'none',
        width: '100%',
        padding: '15px 0 15px 30px',
        color: '#686868',
        fontSize: '15px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: ' 400',
    },
    activeLink: {
        background: 'rgba(0, 0, 0, 0.08)',
        color: "#000000",
    },
    listItem: {
        padding: 0
    },
    divider: {
        margin: '0 0 30px 0'
    }
};

const NavBar = (props) => {
    const {classes} = props;

    return (
        <List component="nav" className={classes.root}>
            <ListItem button className={classes.listItem}>
                <NavLink className={classes.a} activeClassName={classes.activeLink}
                         to='/categories'>Categories</NavLink>
            </ListItem>

            <ListItem button className={classes.listItem}>
                <NavLink className={classes.a} activeClassName={classes.activeLink} to='/offered_phrases'>Offered
                    phrases</NavLink>
            </ListItem>

            <ListItem button className={classes.listItem}>
                <NavLink className={classes.a} activeClassName={classes.activeLink} to='/faq'
                         onClick={e => e.preventDefault()}>FAQ</NavLink>
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.listItem}>
                        <NavLink className={classes.collapseItem} activeClassName={classes.activeLink}
                                 to='/faq/published'>Published</NavLink>
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                        <NavLink className={classes.collapseItem} activeClassName={classes.activeLink}
                                 to='/faq/not_published'>Not published</NavLink>
                    </ListItem>
                </List>
            </Collapse>
            <Divider className={classes.divider}/>

            <a className='tool-link' target="_blank" rel="noopener noreferrer" href="https://www.google.com.ua/?hl=ru">To marketing tool</a>
        </List>
    );
};


export default withStyles(styles)(NavBar);