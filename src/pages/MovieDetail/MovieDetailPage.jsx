import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailPage } from '../../hooks/useMovieDetailPage'
import { Alert } from 'bootstrap'
import '../Homepage/components/Banner/Banner.style.css'
import { Badge, Col, Container, Row, Button } from 'react-bootstrap'
import { useMovieGenreQuery } from '../../hooks/useMovieGenreList'
import './MovieDetailPage.style.css'
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews'
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import { useMovieRecommendations } from '../../hooks/useGetMovieRecommendations'
// import MovieCard from '../../common/MovieCard/MovieCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlay, faStar } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import { useMovieVideoQuery } from '../../hooks/useGetMovieVideo'
import MovieSlieder from '../../common/MovieSlider/MovieSlider'
import { responsive } from '../../constants/responsive'


const MovieDetailPage = () => {
  //주소 뒤에 파라미터값을 useParams를 이용해 받아온다.
  let { id } = useParams();
  let { data, isLoading, isError, error } = useMovieDetailPage(id);
  const { data:genreDataList } = useMovieGenreQuery();
  const { data:reviewData } = useMovieReviewsQuery(id);
  const { data:RecommendationsData } = useMovieRecommendations(id);
  const { data:videoData } = useMovieVideoQuery(id);
  const [ show, setShow ] = useState(false);
  let videoKey = '';

  
  useEffect(()=>{
    
    console.log("data: ", data)
    console.log("id: ", id)
    console.log("videoData: ", videoData)
    
    

  },[data, id, videoData])


  if(isLoading) {
      return <div className='loading'></div>
  }
  if(isError) {
      return <Alert variant='danger'>{error.message}</Alert>
  }
  if(!isLoading) {
    if(videoData.length > 0) {
      videoKey = videoData[0].key;
    } else if (videoData.length === 0) {
      console.log("비디오없음")
    }
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

    // 600자 이상인 리뷰는 isLongContent로 분류
    const isLongContent = review.content.length > 600;
  
    return (
      <div className='reviews'>
        <div className={isOpen ? 'review open' : 'review close'}>
          <div>{review.content}</div>
          <div className='author'>
            <span>{review.author}</span>
            <span>{review.updated_at.slice(0, 10)}</span>
          </div>
        </div>
        {isLongContent && <button onClick={toggleReview}>{isOpen ? '접기' : '더보기'}</button>}
      </div>
    );
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  

  return (
    <div>
      {videoData.length > 0 ?
        <Modal
            data-bs-theme="dark"
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <YouTube 
                  videoId={videoKey}
                  opts={{
                    width: "766",
                    height: "480",
                    playerVars: {
                      autoplay: 1, //자동재생 O
                      rel: 0, //관련 동영상 표시하지 않음
                    },
                  }}
                />
            </Modal.Body>
        </Modal> : ''
      }
      
      <div 
          style={{
              backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data?.backdrop_path}`,
          }}
          className="banner"
      >
          <div className='banner-info'>
              <h1>{data?.title}</h1>
              <h2>{data?.tagline}</h2>
              {videoData?<Button className='play-btn' onClick={handleShow}><FontAwesomeIcon icon={faPlay} />재생</Button>:''}
          </div>
      </div>
      <Container className='main-info-container'>
          <Row className='movie-info-container'>
            <Col className='img'><img src={`http://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data?.poster_path}`} alt=''/></Col>
            <Col>
              <div>{showGenre(data?.genres).map((genre, idx) => <Badge bg="success p-2 me-2" key={idx}>{genre}</Badge>)}</div>
              <div className='top'>
                <div className='title'>{data?.title}</div>
                <div className='tagline'>{data?.tagline}</div>
                <div className='info'>
                  <div><FontAwesomeIcon icon={faHeart} className='faHeart'/> {data?.popularity}</div>
                  <div><FontAwesomeIcon icon={faStar} className='faStar'/> {data?.vote_average}</div>
                  <div>{data.adult?<Badge bg="danger p-2 me-2">Over18</Badge>:<Badge bg="primary p-2 me-2">Under18</Badge>}</div>
                </div>
              </div>
              <div className='overview'>{data?.overview}</div>
              <div className='button'><Button variant="danger me-2">Budget</Button><span>$ {data?.budget.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></div>
              <div className='button'><Button variant="danger me-2">Revenue</Button><span>$ {data?.revenue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></div>
              <div className='button'><Button variant="danger me-2">Release Date</Button><span>{data?.release_date}</span></div>
              <div className='button'><Button variant="danger me-2">Run time</Button><span>{data?.runtime}분</span></div>
            </Col>
          </Row>


          <Row className='related-movie-container'>
            <div className='title'>{RecommendationsData.length === 0 ? '0 results' : 'Related Movies'}</div>
            {RecommendationsData.length === 0 ? <span></span> : (
              <MovieSlieder
                movies={RecommendationsData} 
                responsive={responsive}
              />
            )}
            
            {/* {RecommendationsData?.map((movie, index) => <Col key={index}><MovieCard movie={movie}/></Col>)} */}
          </Row>


          <Row className='review-container'>
            <div className='title'>{reviewData.length === 0 ? '0 reviews for this movie' : 'Reviews'}</div>
            {reviewData?.map((review, index) => 
                <ReviewComponent key={index} review={review}/>
            )}
          </Row>


          {/* <Tabs
            defaultActiveKey="reviews"
            id="justify-tab-example"
            className="mb-3 mt-3 tabs"
            justify
          >
            <Tab eventKey="reviews" title="Reviews">
              <Row className='review-container'>
                <div className='title'>{reviewData?.length === 0 ? '0 reviews for this movie' : 'Reviews'}</div>
                {reviewData?.map((review, index) => 
                    <ReviewComponent key={index} review={review}/>
                )}
              </Row>
            </Tab>
            <Tab eventKey="related-movie" title="Related-movie">
                <Row className='related-movie-container'>
                  <div className='title'>{RecommendationsData?.length === 0 ? '0 results' : 'Related Movies'}</div>
                  {RecommendationsData?.map((movie, index) => <Col key={index}><MovieCard movie={movie}/></Col>)}
                </Row>
            </Tab>
          </Tabs> */}
      </Container>
    </div>
  )
}

export default MovieDetailPage