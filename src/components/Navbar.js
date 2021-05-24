import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        cursor: 'pointer',
    },
    titleContainer: {
        flexGrow: 1,
    },
}));

const NavbarComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <AppBar position="sticky" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.titleContainer} >
                        <Typography 
                            onClick={() => history.push('/')} 
                            variant="h6" 
                            className={classes.title}
                        >
                            MangaDex
                        </Typography>
                    </div>
                    <Button color="inherit">Search</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavbarComponent;