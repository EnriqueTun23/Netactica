import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { Button, Card, Col, Divider, List } from 'antd';
import { addURLPeople } from '../store/characters';

export const CardCharactersView = ({url}) => {
  const { films } = useSelector(state => state.character);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((resp) => {
          setData(resp);
          setIsLoading(false)
      });
  }, []);
  
  const dataTitle = (item) => {
    const res = films.find(element => element.url === item)
    return res.title
  }

  const handleUlrDetail = (url) => {
    dispatch(addURLPeople(url))
    navigate('/characters/detail')
  }

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <Col className='animate__animated animate__zoomIn' xs={24} md={12} xl={8}>
      <Card
        hoverable
        title={data.name}
        extra={<Button onClick={() => handleUlrDetail(data.url)} type="link">Ver mas</Button>}
      >
        <p><b>Color de ojos:</b> {data.hair_color}</p>
        <p><b>Genero:</b> {data.gender}</p>
        <Divider orientation='left'>Lista de peliculas</Divider>
        <List
          size="small"
          bordered
          dataSource={data.films}
          renderItem={item => <List.Item>{dataTitle(item)}</List.Item>}
        />
      </Card>
    </Col>
  )
}
