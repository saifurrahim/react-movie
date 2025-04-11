import { useEffect, useState } from "react"
import movieService from "./services/movie.service";
import Movie from "./models/Movie";

function TopRated() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const topRatedData = await movieService.getTopRatedList();
            setMovies(topRatedData);
            console.log(topRatedData);
        };

        fetchMovies();

    }, []);

    return (
        <>
        <div className="bg-red-500">
            <ul>
                {movies.map((movie : Movie, index : number) => {
                    return <li key={index}>
                        <b>{movie.title}</b>
                        <p>{movie.overview}</p>
                    </li>
                })}
            </ul>
        </div>
        </>
    )

}

export default TopRated