import { useEffect, useState, useContext } from "react";
import movieService from "./services/movie.service"
import { context } from "./MovieApp";
import Movie from "./models/Movie";
import './NowPlaying.css';


function NowPlaying()
{
    const [isReady, setReady] = useState(false);
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isTransitioning, setTransitioning] = useState(false);

    const movieContext = useContext(context);

    const listClick = (e : React.MouseEvent<HTMLElement>, listIndex : number) => {
        document.querySelector('#nowPlaying ul li.active')?.classList.remove('active');

        setTransitioning(true);

        let movie = movies[listIndex] as Movie;

        setTimeout(() => {
            setMovie(movie);
            setTransitioning(false);
        }, 500);

        e.currentTarget.classList.add('active');
    };

    // Run after render  
    useEffect(() => {
        const fetchMovies = async () => {
            const nowPlayingData = await movieService.getNowPLayingList();
            setMovies(nowPlayingData);
            setMovie(nowPlayingData[0]);
        }
        fetchMovies();

        setTimeout(() => {
            setReady(true);
        },2000);
    },[]);
    // the second parameter is the dependency, 
    // if undefined : the function always retriggerring every time react component rerendered.
    // if [] : the function only run on the first render (the first time the component mounted/ready)
    // if [movies, backdrop.. etc] : the function will rerun if the defined state rerendered

    return (
        <>
        <div id="nowPlaying" className="bg-indigo-500 h-[500px]">
        {isReady ? 
        (
            <div className="flex h-full">
                <div className="bg-gray-800 hidden md:block basis-auto shrink-0 h-[500px] relative">
                    <img key="poster" src={((movie?.poster_path ?? "") == "" ? undefined : movieService.getImagePath(movie?.poster_path ?? ""))} alt="Poster" className="h-full transition-opacity duration-500" style={{opacity: isTransitioning ? .25 : 1}}/>
                    <div className="absolute bottom-0 right-0 bg-[rgba(255,0,0,.25)] p-2">
                        <span className="text-white font-bold text-2xl">Now Playing</span>
                    </div>
                </div>

                <div className="bg-gray-300 relative" >
                    <div key="backdrop" className="h-full w-full text-white p-4 transition-opacity duration-500" style={{backgroundImage: `url(${movieService.getImagePath(movie?.backdrop_path ?? "")})`, backgroundSize: 'cover', opacity: isTransitioning ? .25 : 1}}>
                        <article className="bg-[rgba(0,0,0,.5)] p-2 rounded flex flex-col h-[320px]">
                            <h2 key="title" className="font-bold text-2xl">{movie?.original_title}</h2>
                            
                            <div className="my-2">
                                <span key="voteAverage" className="bg-white rounded-full px-3 py-1 text-black shadow-md">Score : <b>{movie?.vote_average.toFixed(2)}</b> / 10.00</span>
                                <small key="voteCount" className="font-semibold"> from {movie?.vote_count} votes</small>
                            </div>

                            <p key="overview" className="flex-1 overflow-y-auto mb-2">
                                {movie?.overview}
                            </p>

                            <span key="genres">Genres : {movieContext.getGenreNames(movie?.genre_ids ?? [])}</span>
                        </article>
                    </div>

                    <div className="absolute bottom-0 right-0 w-full h-[150px] rounded bg-[rgba(0,0,0,.5)] p-2 shadow-md">
                        <ul className="flex gap-2 overflow-x-auto overflow-y-hidden h-full w-full">
                            {movies.map((movie: any, index : number) => {
                                return <li key={index} className={`shrink-0 cursor-pointer ${index === 0 ? 'active' : ''}`} onClick={(event) => listClick(event, index)}>
                                    <img src={movieService.getImagePath(movie.poster_path)} alt={movie.original_title} className="h-full"/>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        ) : (
            <div className="h-full w-full bg-white-500 flex justify-center items-center">
                <div className="clapper">
                    Test
                </div>
            </div>
        )}    

        </div>
        </>
    )
} 

export default NowPlaying