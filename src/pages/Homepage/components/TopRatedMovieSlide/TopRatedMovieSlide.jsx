import React from 'react'
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import { Alert } from 'bootstrap'
import { responsive } from '../../../../constants/responsive';
import MovieSlieder from '../../../../common/MovieSlider/MovieSlider';

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery()

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert variant='danger'>{error.message}</Alert>
    }
  return (
    <div>
        <MovieSlieder 
            title='Top Rated Movies' 
            movies={data.results} 
            responsive={responsive}
        />
    </div>
  )
}

export default PopularMovieSlide