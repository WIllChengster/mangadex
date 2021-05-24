import React, {
    useState,
    useEffect,
} from 'react';
import {
    useParams,
    useHistory,
} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
    bottomNav: {
        backgroundColor: '#424242'
    },
    page: {
        width: '100%',
    }
});

const ChapterPage = () => {
    const {
        chapterId,
    } = useParams();
    const [homeServer, setHomeServer] = useState('');
    const [chapterData, setChapterData] = useState({
        data: []
    });
    const classes = useStyles();
    const history = useHistory();

    //sets homeServer on render
    useEffect(() => {
        axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`).then(res => {
            setHomeServer(res.data.baseUrl);
        });
    }, []);

    //sets chapterData
    useEffect(() => {
        axios.get(`https://api.mangadex.org/chapter/${chapterId}`).then(res => {
            setChapterData(res.data.data.attributes);
        });
    }, []);

    const pages = chapterData.data.map((page, index) => {
        const {
            hash,
        } = chapterData;
        return (
            <div key={index}>
                <img
                    className={classes.page}
                    src={`${homeServer}/data/${hash}/${page}`} />
            </div>
        );
    });

    return (
        <div className={classes.pageContainer} >
            {pages}
            <BottomNavigation
                showLabels
                className={classes.bottomNav}
            >
                <BottomNavigationAction label="Back" icon={<KeyboardArrowLeftIcon />} />
                <BottomNavigationAction label="Favorites" icon={<KeyboardArrowRightIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default ChapterPage;