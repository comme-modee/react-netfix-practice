import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery()
    
    if(isLoading) {
        return <h1>Lodaing...</h1>
    }
    if(isError) {
        return <Alert variant='danger'>{error.message}</Alert>
    }
  return (
    <div 
        style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data?.results[0].backdrop_path}`,
        }}
        className="banner"
    >
        <div className='banner-info'>
            <h1>{data?.results[0].title}</h1>
            <h2>{data?.results[0].overview}</h2>
        </div>
    </div>
  )
}

export default Banner