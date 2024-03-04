import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'bootstrap'
import { Col, Container, Row } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './MoviePage.style.css'

const MoviePage = () => {
  const [ query, setQuery ] = useSearchParams()
  const [ page, setPage ] = useState(1)
  let keyword = query.get("q")||"";
  
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const [ filteredList, setFilteredList ] = useState(null);

  useEffect(()=>{
    if(data) {
      setFilteredList(data)
    }
  },[data])
  
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <Alert variant='danger'>{error.message}</Alert>
  }
  
  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
  }
  
  const sortedPopularity = () => {
    console.log("인기순")
    const sortData = data.results.sort(function(a, b) {
      return b.popularity - a.popularity;
    });
    //배열이나 객체의 경우 참조형 타입이다. 객체의 주소값만 들고 있지 그 안에 실제 값이 바뀌었는지는 관심 밖이다.
    //그래서 state가 주소는 같으니까 변화가 없다고 판단하고 랜더링을 안한다.
    //그래서 객체를 재할당 해줄때는 (배열포함)... 을 통해서 새로운 객체를 넣어줘야한다.
    //새로운 객체가 들어오면 그 객체에 할당된 주소도 바뀌기 때문에 바뀌었다고 state가 인식을 하고 랜더링을 한다.
    setFilteredList({...data, results:sortData})
  }

  const sortedVoteAverage = () => {
    console.log("평점순")
    const sortData = data.results.sort(function(a, b) {
      return b.vote_average - a.vote_average;
    });
    setFilteredList({...data, results:sortData})
  }
  
  return (
    <div>
      <Container>
        <Row>
          <Col lg={4} xs={12}>
          <DropdownButton id="dropdown-basic-button" variant="danger" title="정렬">
            <Dropdown.Item href="#" onClick={sortedPopularity}>인기순</Dropdown.Item>
            <Dropdown.Item href="#" onClick={sortedVoteAverage}>평점순</Dropdown.Item>
          </DropdownButton>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {filteredList?.results.map((movie, index) => 
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie}/>
                </Col>
              )}
            </Row>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              forcePage={page-1}
              pageCount={data?.total_pages} //전체페이지가 몇개인지
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MoviePage