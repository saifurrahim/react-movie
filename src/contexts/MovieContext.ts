
class MovieContext {
    genres: any[];

    constructor(genres: any[])
    {
        this.genres = genres;
    }
    
    getGenreNames (genreIds : number[]) : string {
        return this.genres.filter(x => genreIds.includes((x.id as number))).map(x => x.name).join(" | ");
    }
}

export default MovieContext