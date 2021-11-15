import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CatCard from '../components/CatCard'
import FavoriteCats from '../components/FavoriteCats'
import GridCattImage from '../components/GridCattImage'

function HomeView() {
  const [catImage, setCatImage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [dislikes, setDislikes] = React.useState(0)
  const [likes, setLikes] = React.useState(0)
  const [favoriteCats, setFavoriteCats] = React.useState([])

  React.useEffect(() => {
    setIsLoading(true)

    fetch(process.env.REACT_APP_API_URL)
      .then(response => response.json())
      .then(data => setCatImage(data.file))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [likes, dislikes]);

  const dislikeHandler = () => {
    setCatImage('')
    setDislikes(dislikes + 1)
  }

  const likeHandler = () => {
    setLikes(likes + 1)
    setFavoriteCats([...favoriteCats, catImage])
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row>
        <Col sm>
          <FavoriteCats total={likes} />
          <CatCard
            isLoading={isLoading}
            catImage={catImage}
            dislike={dislikeHandler}
            like={likeHandler}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <GridCattImage favoriteImages={favoriteCats} />
      </Row>
    </Container>
  )
}

export default HomeView
