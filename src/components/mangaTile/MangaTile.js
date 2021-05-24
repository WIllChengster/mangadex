import _ from 'lodash';
import React, {
    useEffect,
    useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const defaultProps = {
    data: {
        attributes: {
            titles: {
                en: ''
            }
        }
    }
};

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(1),
    },
    title: {
        display: 'flex',
    },
    titleContent: {
        cursor: 'pointer',
    }
}));

const MangaTile = (props = defaultProps) => {
    const classes = useStyles();
    const history = useHistory();
    const [coverArtFileName, setCoverArtFileName] = useState('');
    const {
        data,
        relationships
    } = props.manga;

    const {
        attributes,
        id: seriesId
    } = data;

    const {
        title,
        description: _description,
    } = attributes;

    useEffect(() => {
        const coverArt = _.find(relationships, (rel) => rel.type === 'cover_art');
        axios.get('https://api.mangadex.org/cover', {
            params: {
                ids: [coverArt.id],
                limit: 1
            }
        }).then(res => {
            setCoverArtFileName(res.data.results[0].data.attributes.fileName);
        });
    }, []);

    const description = _description.en.slice(0, 250) + '...';
    return (
        <Card className={classes.card} >
            <CardContent>
                <div className={classes.title}>
                    <Typography
                        variant='h6'
                        className={classes.titleContent}
                        onClick={() => history.push(`/series/${seriesId}`)}
                    >
                        {title.en}
                    </Typography>
                </div>
                <Typography
                    variant="caption"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </CardContent>
        </Card>
    );
};

export default MangaTile;