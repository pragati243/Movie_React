import {useState,useEffect} from 'react';
import MovieCard  from './MovieCard';
import './App.css';
import searchIcons from './search.svg';
const API_URL = 'http://www.omdbapi.com?apikey=b3eca69f'
const movie1 = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
}
const App = () => {

        const [movies,setMovies] = useState([]);
        const [searchTerm,setSearchTerm] = useState(' ');
        

    useEffect(()=> {
        searchMovies('Spiderman');
    },[]);

    const searchMovies= async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };
    return (
       <div className='app'>

        <h1>MovieLand</h1>

        <div className='search'>
            <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
                scr={searchIcons}
                alt='Search'
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
        
        {
            movies?.length>0
            ? (
                <div className='container'>
                   {movies.map((movie) => (
                        <MovieCard movie = {movie}/>
                   ))}
                </div>
            ) : (
                <div className='empty'>
                    <h2>No Movies found</h2>
                </div>
            )
        }
       </div>
    );
}

export default App;