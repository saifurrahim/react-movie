import axios from "axios";

const apiBaseUrl = '/tmdb-api';
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const movieService = {
    async getNowPLayingList(): Promise<any> {
        try{
            const response = await axios.get(`${apiBaseUrl}/movie/now_playing`);
            return response.data.results;
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