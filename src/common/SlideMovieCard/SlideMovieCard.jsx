import Badge from 'react-bootstrap/Badge';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreList';
import './SlideMovieCard.style.css';
import { useNavigate } from 'react-router-dom';

const SlideMovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const { data:genreData } = useMovieGenreQuery()

  const showGenre = (genreIdList) => {
    if(!genreData) return []
    const gerneNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name
    })

    return gerneNameList
  }
  const moveToDetailPage = () => {
    navigate(`/movies/${movie.id}`)
  }

  return (
    <div
        className='slide-movie-card'
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path})` }}
        onClick={moveToDetailPage}
    >
        <div className='movie-card-info'>
            <h1>{movie.title}</h1>
            {showGenre(movie.genre_ids).map((id) =>  <Badge bg="success me-2" key={id}>{id}</Badge> )}
            <div>
                <div>{movie.vote_average}</div>
                <div>{movie.popularity}</div>
                <div>{movie.adult?'over18':'under18'}</div>
            </div>
        </div>
    </div>
  )
}

export default SlideMovieCard