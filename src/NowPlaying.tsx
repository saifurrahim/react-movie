import { useEffect, useState } from "react";
import movieService from "./services/movie.service"


function NowPlaying()
{
    const [movies, setMovies] = useState([]);

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
                </li>
            ))}
        </ul>
        </>
    )
} 

export default NowPlaying