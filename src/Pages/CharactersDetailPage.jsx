import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { Col, Typography, Row, Divider, List } from 'antd';

const { Title, Text } = Typography;

export const CharactersDetailPage = () => {

  const { urlPeople, films } = useSelector(state => state.character);
  
  
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const dataTitle = (item) => {
    const res = films.find(element => element.url === item)
    return res.title
  } 

  useEffect(() => {
    if (urlPeople !== '') {
      fetch(urlPeople)
        .then((response) => response.json())
        .then((resp) => {
          setCharacter(resp)
          setIsLoading(false)
        })
    } else {
      navigate(`/`)
    }
  }, [urlPeople]);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <>
      <Row className='animate__animated animate__zoomInDown' justify='center'>
        <Col>
          <Title type='warning' level={2}>{character.name}</Title>
        </Col>
      </Row>
      <Row>
        <Col className='animate__animated animate__zoomIn' span={12}>
          <p>
            <Text strong>Fecha de cumpleaños: </Text>
            <Text italic>{character.birth_year}</Text>
          </p>
          <p>
            <Text strong>Color de ojos: </Text>
            <Text italic>{character.eye_color}</Text>
          </p>
          <p>
            <Text strong>Genero: </Text>
            <Text italic>{character.gender}</Text>
          </p>
          <p>
            <Text strong>Altura: </Text>
            <Text italic>{`${character.height} cm`}</Text>
          </p>
          <p>
            <Text strong>Peso: </Text>
            <Text italic>{`${character.mass} kg`}</Text>
          </p>
          <Divider orientation='left'>Lista de peliculas</Divider>
          <List
            size="small"
            bordered
            dataSource={character.films}
            renderItem={item => <List.Item>{dataTitle(item)}</List.Item>}
          />
        </Col>
      </Row>
    </>
    
  )
}
