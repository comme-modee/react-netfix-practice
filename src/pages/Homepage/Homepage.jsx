import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'


//1. 배너 만들기 => popular movie를 들고와서 첫번째 아이템을 보여주자
//2. popular movie 가져오기
//3. top rated movie 가져오기
//4. upcoming movie 가져오기

const Homepage = () => {
  return (
    <div>
        <Banner/>
        <PopularMovieSlide/>
        <TopRatedMovieSlide/>
        <UpcomingMovieSlide/>
    </div>
  )
}

export default Homepage