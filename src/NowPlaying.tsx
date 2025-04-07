import { useEffect, useState, useContext } from "react";
import movieService from "./services/movie.service"
import { context } from "./MovieApp";


function NowPlaying()
{

    const [movies, setMovies] = useState([]);

    const movieContext = useContext(context);

    // onMounted
    useEffect(() => {
        const fetchMovies = async () => {

            const nowPlayingList = await movieService.getNowPLayingList();

            setMovies(nowPlayingList);
        }

        fetchMovies();
    });

    return (
        <>
        <ul>
            {movies.map((movie : any) => (
                <li key={movie.id}>
                    <b>{movie.original_title}</b>
                    <span>{movie.overview}</span>
                    <br />
                    <span>{movieContext.getGenreNames(movie.genre_ids)}</span>
                </li>
            ))}
        </ul>
        </>
    )
} 

export default NowPlaying