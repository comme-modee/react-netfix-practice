import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap'
import { responsive } from '../../../../constants/responsive';
import MovieSlieder from '../../../../common/MovieSlider/MovieSlider';

const PopularMovieSlide = () => {   
    const { data, isLoading, isError, error } = usePopularMoviesQuery()

    if(isLoading){
        return <div className='loading'></div>
    }
    if(isError){
        return <Alert variant='danger'>{error.message}</Alert>
    }
  return (
    <div className='movie-slider'>
        <MovieSlieder 
            title='Popular Movies' 
            movies={data.results} 
            responsive={responsive}
        />
    </div>
  )
}

export default PopularMovieSlide