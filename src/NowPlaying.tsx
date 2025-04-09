import { useEffect, useState, useContext } from "react";
import movieService from "./services/movie.service"
import { context } from "./MovieApp";
import Movie from "./models/Movie";
import './NowPlaying.css';


function NowPlaying()
{

    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState<Movie | null>(null);

    const movieContext = useContext(context);

    const listClick = (e : React.MouseEvent<HTMLElement>, listIndex : number) => {
        document.querySelector('#nowPlaying ul li.active')?.classList.remove('active');

        let movie = movies[listIndex] as Movie;

        setMovie(movie);

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
    },[]);
    // the second parameter is the dependency, 
    // if undefined : the function always retriggerring every time react component rerendered.
    // if [] : the function only run on the first render (the first time the component mounted/ready)
    // if [movies, backdrop.. etc] : the function will rerun if the defined state rerendered

    return (
        <>
        <div id="nowPlaying" className="bg-indigo-500 h-[500px] flex">

            <div className="bg-green-300 hidden md:block basis-auto shrink-0 h-[500px] relative">
                <img key="poster" src={((movie?.poster_path ?? "") == "" ? undefined : movieService.getImagePath(movie?.poster_path ?? ""))} alt="" className="h-full"/>
                <div className="absolute bottom-0 right-0 bg-[rgba(255,0,0,.25)] p-2">
                    <span className="text-white font-bold text-2xl">Now Playing</span>
                </div>
            </div>

            <div key="backdrop" className="bg-orange-300 relative" style={{backgroundImage: `url(${movieService.getImagePath(movie?.backdrop_path ?? "")})`, backgroundSize: 'cover'}}>
                <div className="h-full w-full bg-[rgba(0,0,0,.25)] text-white p-4">
                    <h2 key="title" className="font-bold text-2xl">{movie?.original_title}</h2>
                    <span key="overview">
                        {movie?.overview}
                    </span>
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
        </>
    )
} 

export default NowPlaying