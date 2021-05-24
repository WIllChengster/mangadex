import React, {
    useEffect, 
    useState
} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {
    useParams,
    useHistory,
} from 'react-router-dom';

import axios from 'axios';

const defaultMangaData = {
    data: {
        attributes: {
            title: {
                en: ''
            },
            description: {
                en: ''
            }
        }
    }
};

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
    },
    content: {
        padding: theme.spacing(3),
    },
    chapters: {
        padding: theme.spacing(1),
        width: '100%',
        display: 'flex'
    },
    description: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    expand: {
        color: 'blue',
        cursor: 'pointer',
    },
    chapterName: {
        cursor: 'pointer',
    }
}));

const SeriesPage = (props) => {
    const [mangaData, setMangaData] = useState(defaultMangaData);
    const [chapters, setChapters] = useState([]);
    const [shouldExpandDesc, toggleExpandDesc] = useState(false);
    const classes = useStyles();
    const { seriesId } = useParams();
    const history = useHistory();

    const {
        attributes,
    } = mangaData.data;

    const {
        title,
        description: _description,
    } = attributes;

    useEffect(() => {
        axios.get(`https://api.mangadex.org/manga/${seriesId}`).then(res => {
            setMangaData(res.data);
        });
        axios.get('https://api.mangadex.org/chapter', {
            params: {
                manga: seriesId,
                translatedLanguage: ['en']
            }
        }).then(res => {
            setChapters(res.data.results);
        });
    }, []);
    const description = shouldExpandDesc? _description.en.slice(0, _description.en.indexOf('[hr]')) : _description.en.slice(0, 300) + '...';

    const chapterList = chapters.map((chapter, index) => {
        const {
            attributes,
            id: chapterId,
        } = chapter.data;

        const {
            chapter: chapterName,
        } = attributes;
        return (
            <div
                key={index}
            >
                <div className={classes.chapters} >
                <Typography 
                    className={classes.chapterName} 
                    onClick={() => history.push(`/chapter/${chapterId}`)}
                >
                    {chapterName}
                </Typography>
                </div>
                <Divider/>
            </div>
        );
    });

    const Expand = (
        <Typography 
            variant="overline"
            onClick={() => toggleExpandDesc(!shouldExpandDesc)} 
            className={classes.expand} 
        >
            {shouldExpandDesc ? 'Collapse' : 'Expand'}
        </Typography>
    );

    return (
        <Container className={classes.container} >
            <Paper elevation={3} >
                <div className={classes.content} >
                    <Typography variant='h3'>
                        {mangaData.data.attributes.title.en}
                    </Typography>
                    <div className={classes.description} >
                        <Typography dangerouslySetInnerHTML={{ __html: description }}/>
                        {Expand}
                    </div>

                    <div>
                        <Typography>Chapters</Typography>
                        <Divider/>
                    </div>
                    {chapterList}
                </div>
            </Paper>
        </Container>
    );
};

export default SeriesPage;