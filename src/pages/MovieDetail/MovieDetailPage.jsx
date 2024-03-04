import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailPage } from '../../hooks/useMovieDetailPage'
import { Alert } from 'bootstrap'
import '../Homepage/components/Banner/Banner.style.css'
import { Badge, Col, Container, Row, Button } from 'react-bootstrap'
import { useMovieGenreQuery } from '../../hooks/useMovieGenreList'
import './MovieDetailPage.style.css'
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useMovieRecommendations } from '../../hooks/useGetMovieRecommendations'
import MovieCard from '../../common/MovieCard/MovieCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const MovieDetailPage = () => {
  //주소 뒤에 파라미터값을 useParams를 이용해 받아온다.
  let {id} = useParams()
  const { data, isLoading, isError, error } = useMovieDetailPage(id)
  const { data:genreDataList } = useMovieGenreQuery()
  const { data:reviewData } = useMovieReviewsQuery(id)
  const { data:RecommendationsData } = useMovieRecommendations(id)

  console.log("추천 영화", RecommendationsData)
  
  useEffect(()=>{
    if(data) {
      console.log(data)
    }
  },[data])

  useEffect(()=>{
    console.log("id: ", data)
  },[id])

  if(isLoading) {
      return <h1>Lodaing...</h1>
  }
  if(isError) {
      return <Alert variant='danger'>{error.message}</Alert>
  }


  const showGenre = (genreIdList) => {
    if(!genreDataList) return []
    const gerneNameList = genreIdList.map((genreId) => {
      const genreObj = genreDataList.find((genreData) => genreData.id === genreId.id)
      return genreObj.name
    })

    return gerneNameList
  }

  const ReviewComponent = ({ review }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleReview = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className='reviews'>
        <div className={isOpen ? 'review open' : 'review close'}>
          <div>{review.content}</div>
          <div className='author'>
            <span>{review.author}</span>
            <span>{review.updated_at.slice(0, 10)}</span>
          </div>
        </div>
        <button onClick={toggleReview}>{isOpen ? '접기' : '더보기'}</button>
      </div>
    );
  };


  return (
    <div>
      <div 
          style={{
              backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data?.backdrop_path}`,
          }}
          className="banner"
      >
          <div className='banner-info'>
              <h1>{data?.title}</h1>
              <h2>{data?.overview}</h2>
              <button className='play-btn'><FontAwesomeIcon icon={faPlay} />재생</button>
          </div>
      </div>
      <Container className='main-info-container'>
          <Row>
            <Col className='img'><img src={`http://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data?.poster_path}`} alt=''/></Col>
            <Col>
              <div>{showGenre(data?.genres).map((genre) => <Badge bg="danger p-2 me-2">{genre}</Badge>)}</div>
              <div className='title'>{data?.title}</div>
              <div className='tagline'>{data?.tagline}</div>
              <div>인기: {data?.popularity}</div>
              <div>평점: {data?.vote_average}</div>
              <div>연령: {data.adult?'over18':'under18'}</div>
              <div className='overview'>{data?.overview}</div>
              <div className='button'><Button variant="danger me-2">Budget</Button><span>$ {data?.budget.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></div>
              <div className='button'><Button variant="danger me-2">Revenue</Button><span>$ {data?.revenue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></div>
              <div className='button'><Button variant="danger me-2">Release Date</Button><span>{data?.release_date}</span></div>
              <div className='button'><Button variant="danger me-2">Run time</Button><span>{data?.runtime}분</span></div>
            </Col>
          </Row>
          <Tabs
            defaultActiveKey="reviews"
            id="justify-tab-example"
            className="mb-3 mt-3 tabs"
            justify
          >
            <Tab eventKey="reviews" title="Reviews">
              <Row className='review-container'>
                <div className='title'>Reviews</div>
                {reviewData?.map((review, index) => 
                    <ReviewComponent key={index} review={review}/>
                )}
              </Row>
            </Tab>
            <Tab eventKey="related-movie" title="Related-movie">
                <Row>
                  {RecommendationsData?.map((movie, index) => <Col key={index}><MovieCard movie={movie}/></Col>)}
                </Row>
            </Tab>
          </Tabs>
      </Container>
    </div>
  )
}

export default MovieDetailPage