import React from 'react';
import './MovieCard.style.css';
import Badge from 'react-bootstrap/Badge';

const MovieCard = ({ movie }) => {
  return (
    <div
        className='movie-card'
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path})` }}
    >
        <div className='movie-card-info'>
            <h1>{movie.title}</h1>
            {movie.genre_ids.map((id) =>  <Badge bg="danger">{id}</Badge> )}
            <div>
                <div>{movie.vote_average}</div>
                <div>{movie.popularity}</div>
                <div>{movie.adult?'over18':'under18'}</div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard