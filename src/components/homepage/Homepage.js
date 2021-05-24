import React, {
    useEffect,
    useState,
} from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import '../mangaTile/MangaTile';
import MangaTile from '../mangaTile/MangaTile';

const Homepage = () => {

    const [mangaList, setMangaList] = useState([]);
    useEffect(() => {
        axios.get('https://api.mangadex.org/manga', {
            params: {
                //stuff goes here
            }
        }).then(res => {
            setMangaList(res.data.results);
        });
    }, []);

    const MangaTiles = mangaList.map( (manga, index) => {
        return (
            <MangaTile key={index} manga={manga}/>
        );
    });

    return (
        <Container>
            {MangaTiles}
        </Container>
    );
};

export default Homepage;