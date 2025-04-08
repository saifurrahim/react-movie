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
            const nowPlayingData = await movieService.getNowPLayingList();
            setMovies(nowPlayingData);
        }
        fetchMovies();
    });

    return (
        <>
        <div id="nowPlaying" className="bg-indigo-500 h-[500px] flex">

            <div className="bg-green-300 hidden md:block basis-auto shrink-0 h-[500px]">
                
            <img src="https://image.tmdb.org/t/p/original//yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg" alt="" className="h-full"/>
            </div>
            <div className="bg-orange-300 relative bg-[url(https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg)] bg-cover">
                <div className="h-full w-full bg-[rgba(0,0,0,.25)] text-white">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In omnis facere eligendi laboriosam, distinctio eum deserunt dolor corporis voluptatem cupiditate, ratione nemo aliquam quis dignissimos modi ullam tempora explicabo officia?</span>
                </div>

                <div className="absolute bottom-0 right-0 w-full h-[150px] rounded bg-[rgba(0,0,0,.5)] p-2 shadow-md">
                    <ul className="flex gap-2 overflow-x-auto overflow-y-hidden h-full w-full">
                        {movies.map((movie: any, index : number) => {
                            return <li key={index} className="basis-auto shrink-0">
                                <img src={movieService.getImagePath(movie.poster_path)} alt={movie.original_title} className="h-full"/>
                            </li>
                        })}
                    </ul>
                </div>

            </div>
{/* 
            <div className="w-full h-full flex flex-col">

                <h2 className="text-2xl font-semibold mb-2" style={{background: 'linear-gradient(to top, white, gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: "transparent"}}>Now Playing</h2>

                <div className="h-[480px] flex justify-center">
                    <img src="https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg" alt="" className="w-[320px]"/>
                </div>


            </div>

            <div className="absolute bottom-0 right-0  bg-[rgba(0,0,0,.75)] p-2 rounded shadow-md">
                <ul className="flex max-w-[720px] overflow-x-auto overflow-y-hidden gap-2">
                    {movies.map((movie : any) => {
                        return <li key={movie.id} className="relative basis-auto shrink-0 flex flex-col items-center">
                            <div className="inline-block h-[180px]">
                                <img src={movieService.getImagePath(movie.poster_path)} alt={movie.original_title} className="h-full"/>
                            </div>
                        </li>;
                    })}
                </ul>
            </div> */}
        </div>
        </>
    )
} 

export default NowPlaying