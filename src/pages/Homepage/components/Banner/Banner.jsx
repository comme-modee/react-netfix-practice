import React, { useEffect, useState } from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMovieVideoQuery } from '../../../../hooks/useGetMovieVideo';
import YouTube from 'react-youtube';

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery()
    const [ id, setId ] = useState(null);
    const { data:videoData } = useMovieVideoQuery(id)
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        // 데이터가 사용 가능하고 결과가 있을 경우 id를 설정합니다.
        if (data) {
            setId(data.results[0].id);
        }
    }, [data]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    
    if(isLoading) {
        return <h1>Lodaing...</h1>
    }
    if(isError) {
        return <Alert variant='danger'>{error.message}</Alert>
    }
    console.log(id, data, videoData)

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
            <Button className='play-btn' onClick={handleShow}><FontAwesomeIcon icon={faPlay} />재생</Button>
        </div>

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
                <YouTube videoId={videoData?videoData[0].key:''}/>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Banner