import { createContext, useState, useEffect, PropsWithChildren } from "react";
import movieService from "./services/movie.service";
import MovieContext from "./contexts/MovieContext";


const context = createContext<MovieContext>(new MovieContext([]));

const MovieContainer = ({ children } : PropsWithChildren) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const genreList = await movieService.getGenreList();
            setGenres(genreList);
        };

        fetchGenres();

    }, []);

    return (
        <context.Provider value={ new MovieContext(genres) }>
            {children}
        </context.Provider>
    )
}

export { MovieContainer, context };
