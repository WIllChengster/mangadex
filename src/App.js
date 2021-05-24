import {
  Route,
} from 'react-router-dom';

import './style.css';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import Homepage from './components/homepage/Homepage';
import SeriesPage from './components/seriesPage/SeriesPage';
import ChapterPage from './components/chapterPage/ChapterPage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'lightgray',
    width: '100%'
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Container disableGutters maxWidth={false} className={classes.container}>
      <Navbar></Navbar>
      <Route exact path="/">
        <Homepage/>
      </Route>
      <Route exact path="/series/:seriesId">
        <SeriesPage/>
      </Route>
      <Route path="/chapter/:chapterId">
        <ChapterPage/>
      </Route>
    </Container>
  );
};

export default App;
