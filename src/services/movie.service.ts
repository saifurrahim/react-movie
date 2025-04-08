import axios from "axios";

const apiBaseUrl = '/tmdb-api';
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const movieService = {
    async getNowPLayingList(): Promise<any> {
        try{
            var results;
            
            await fetch('/now_playing.json')
            .then(response => response.json())
            .then(data => results = data)
            .catch(error => console.error(error));

            return results;

            // const response = await axios.get(`${apiBaseUrl}/movie/now_playing`);
            // return response.data.results;
        }
        catch(error)
        {
            console.error(error);
            throw error;
        }
    },

    async getGenreList(): Promise<any> {
        try{
            
            var results;
            
            await fetch('/genre.json')
            .then(response => response.json())
            .then(data => results = data)
            .catch(error => console.error(error));

            return results;

            // const response = await axios.get(`${apiBaseUrl}/genre/movie/list`);
            // return response.data.genres;
        }
        catch(error)
        {
            console.error(error);
            throw error;
        }
    },

    getImagePath(image: string): string {
        return `${imageBaseUrl}${image}`;
    }
}

export default movieService;