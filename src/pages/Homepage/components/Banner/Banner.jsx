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
    const videoId = data?.results[0].id
    const { data:videoData } = useMovieVideoQuery(videoId)
    console.log("비디오 아이디:", videoId, "비디오 데이터", videoData)
    // const [ id, setId ] = useState(null);
    const [ show, setShow ] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    
    useEffect(() => {
        
    }, [videoId]);
    

    if(isLoading) {
        return <h1>Loading...</h1>
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
            {videoData ? (
                <YouTube videoId={videoData[0]?.key} />
            ) : (
                <div>Loading...</div>
            )}
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Banner