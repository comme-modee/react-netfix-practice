import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel";
import './MovieSlider.style.css';
import SlideMovieCard from '../SlideMovieCard/SlideMovieCard';

const MovieSlieder = ({title, movies, responsive}) => {
  return (
    <div>
        <h3>{title}</h3>
        <Carousel
            infinite={true}
            centerMode={true}
            itemClass="movie-slider p-1"
            containerClass="carousel-container"
            responsive={responsive}
            showDots={true}
            dotListClass="custom-dot-list-style"
        >
            {movies.map((movie, index) => <SlideMovieCard movie={movie} key={index}/>)}
        </Carousel>
    </div>
  )
}

export default MovieSlieder