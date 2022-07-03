import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import { Button, Card, Col, Divider, List } from 'antd';

export const CardCharactersView = ({url}) => {
  const { films } = useSelector(state => state.character);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  
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

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <Col xs={24} md={12} xl={8}>
      <Card
        hoverable
        title={data.name}
        extra={<Button type="link">Ver mas</Button>}
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
