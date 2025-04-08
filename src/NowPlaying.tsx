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

        const list = document.getElementById('nowPlaying');

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            (list as HTMLElement).scrollLeft += event.deltaY;
          };
      
          list?.addEventListener('wheel', handleWheel);
      
          return () => {
            list?.removeEventListener('wheel', handleWheel);
          };
    });

    return (
        <>
        <h2 className="text-2xl font-semibold mb-2">Now Playing</h2>
        <ul id="nowPlaying" className="flex w-full overflow-x-auto overflow-y-hidden gap-2">
            {movies.map((movie : any) => (
                <li key={movie.id} className="relative basis-auto shrink-0 flex flex-col items-center">
                    <div className="inline-block h-[360px]">
                        <img src={movieService.getImagePath(movie.poster_path)} alt={movie.original_title} className="h-full"/>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[20%] flex flex-col items-center p-2 bg-[rgba(0,0,0,.5)]">
                        <b className="text-white">{movie.original_title}</b>
                        <small className="text-white">{movieContext.getGenreNames(movie.genre_ids)}</small>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
} 

export default NowPlaying