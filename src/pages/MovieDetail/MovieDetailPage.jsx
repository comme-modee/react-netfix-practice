import React from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailPage } from '../../hooks/useMovieDetailPage'
import { Alert } from 'bootstrap'
import '../Homepage/components/Banner/Banner.style.css'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { useMovieGenreQuery } from '../../hooks/useMovieGenreList'


const MovieDetailPage = () => {
  //주소 뒤에 파라미터값을 useParams를 이용해 받아온다.
  let {id} = useParams()
  const { data, isLoading, isError, error } = useMovieDetailPage(id)
  const { data:genreDataList } = useMovieGenreQuery()
  
  console.log(data)
  if(isLoading) {
      return <h1>Lodaing...</h1>
  }
  if(isError) {
      return <Alert variant='danger'>{error.message}</Alert>
  }


  const showGenre = (genreIdList) => {
    if(!genreDataList) return []
    console.log(genreIdList, genreDataList)
    const gerneNameList = genreIdList.map((genreId) => {
      const genreObj = genreDataList.find((genreData) => genreData.id === genreId.id)
      return genreObj.name
    })

    return gerneNameList
  }

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
          </div>
      </div>
      <Container className='main-info-container'>
          <Row>
            <Col className='img'><img src={`http://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data?.poster_path}`} alt=''/></Col>
            <Col>
              <div>{showGenre(data?.genres).map((genre) => <Badge bg="danger p-2 me-2">{genre}</Badge>)}</div>
              <div>{data?.title}</div>
              <div>{data?.tagline}</div>
              <div>인기: {data?.popularity}</div>
              <div>평점: {data?.vote_average}</div>
              <div>연령: {data.adult?'over18':'under18'}</div>
              <div>{data?.overview}</div>
              <div>영화 상세정보</div>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default MovieDetailPage