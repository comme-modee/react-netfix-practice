import React, { useEffect, useState } from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery()
    const videoId = data?.results[0].id

    const [ show, setShow ] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [ videoKey, setVideoKey ] = useState()
    
    // const getVideoKey = async (videoId) => {
    //     let videoApi = `https://api.themoviedb.org/3/movie/${videoId}/videos`;
    //     let response = await fetch(videoApi);
    //     let data = await response.json();
    //     let trailer = data?.results.filter((video) => video.type === "Trailer")
    //     setVideoKey(trailer[0].key)
    // }
    
    const getVideoKey = async (videoId) => {
        try {
            let videoApi = `https://api.themoviedb.org/3/movie/${videoId}/videos`;
            let response = await fetch(videoApi);
    
            if (!response.ok) {
                throw new Error(`Failed to fetch video data. Status: ${response.status}`);
            }
    
            let data = await response.json();
            let trailer = data?.results.filter((video) => video.type === "Trailer");
    
            if (trailer.length > 0) {
                setVideoKey(trailer[0].key);
            } else {
                throw new Error("No trailer found for the specified movie.");
            }
        } catch (error) {
            console.error("Error fetching video key:", error.message);
            // 여기서 에러를 처리하거나 적절한 방식으로 핸들링할 수 있습니다.
        }
    }

    useEffect(() => {
        if(videoId) getVideoKey(videoId)
    }, [videoId]);
    

    if(isLoading) {
        return <div className='loading'></div>
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
            <h2>{data?.results[0].tagline}</h2>
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
            {videoId ? (
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
            ) : (
                <div>Loading...</div>
            )}
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Banner