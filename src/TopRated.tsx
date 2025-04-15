import { useContext, useEffect, useState } from "react"
import movieService from "./services/movie.service";
import Movie from "./models/Movie";
import { context } from "./MovieApp";
import "./TopRated.css"

function TopRated() {
    const [isReady, setReady] = useState(false);
    const [movies, setMovies] = useState([]);
    const movieContext = useContext(context);

    useEffect(() => {
        const fetchMovies = async () => {
            const topRatedData = await movieService.getTopRatedList();
            setMovies(topRatedData);
            console.log(topRatedData);
        };

        fetchMovies().then(() => {
            setTimeout(() => {
                setReady(true);
            }, 1000)
        });

    }, []);

    return (
        <>
        <div id="TopRated" className="bg-red-500 p-2 min-h-[500px]">
            {isReady ? 
            (
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-white">Top Rated</h2>
                    <ul className="grid md:grid-cols-3 gap-2">
                        {movies.map((movie : Movie, index : number) => {
                            return <li key={index} className="flex gap-2 my-2 bg-white rounded shadow-md p-4">
                                <span>#{index+1}</span>
                                <div className="top-rated-poster shadow-md">
                                    <img src={movieService.getImagePath(movie.poster_path)} alt={movie.title} className="w-[64px]"/>
                                </div>
                                <div className="block">
                                    <h3>{movie.title}</h3>
                                    <div className="my-2">
                                        <span key="voteAverage" className="bg-yellow-500 rounded-full px-3 py-1 text-black shadow-md">Score : <b>{movie?.vote_average.toFixed(2)}</b> / 10.00</span>
                                        <small key="voteCount" className="font-semibold"> from {movie?.vote_count} votes</small>
                                    </div>
                                    <span>{movieContext.getGenreNames(movie.genre_ids)}</span>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            ) : (

            
                <div className="animate-pulse w-full bg-white-500 h-[500px] flex justify-center items-center" style={{animationDuration: '1s'}}>
                    <div className="clapper">
                        Test
                    </div>
                </div>
            )}
            
        </div>
        </>
    )

}

export default TopRated