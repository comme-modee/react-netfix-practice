import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'bootstrap'
import { Col, Container, Row } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const MoviePage = () => {
  const [ query, setQuery ] = useSearchParams()
  const [ page, setPage ] = useState(1)
  let keyword = query.get("q")||"";
  
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const [ filteredList, setFilteredList ] = useState([]);
  
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
    data.results.sort(function(a, b) {
      return b.popularity - a.popularity;
    });
    setFilteredList([data.results])
  }
  const sortedVoteAverage = () => {
    data.results.sort(function(a, b) {
      return b.vote_average - a.vote_average;
    });
    setFilteredList([data.results])
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
              {data?.results.map((movie, index) => 
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