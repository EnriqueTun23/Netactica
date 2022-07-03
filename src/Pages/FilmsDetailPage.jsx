import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Col, Card, Typography, Row } from 'antd';
import { CardCharactersView } from '../Components/CardCharactersView';


const { Title } = Typography;

export const FilmsDetailPage = () => {

  const { idUrl } = useSelector(state => state.character);

  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  

  useEffect(() => {
      if (idUrl !== '') {
        fetch(idUrl)
          .then((response) => response.json())
          .then((resp) => {
            setFilm(resp)
            setIsLoading(false)
          })
      } else {
        navigate(`/`)
      }
  }, [idUrl]);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title type='warning' level={2}>Lista de personajes de la pelicula {film.title} del episodio {film.episode_id}</Title>
        </Col>
      </Row>
      <Row gutter={[16, 48]}>
        {film.characters.map((value, i) => (
          <CardCharactersView url={value} key={i} />
        ))}
      </Row>
    </>
  )
}
