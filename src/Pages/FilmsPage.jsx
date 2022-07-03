import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Row, Typography } from 'antd';

import { CardComponent } from '../Components/CardComponent';

import { saveFilms } from '../store/characters';

const { Title } = Typography;

export const FilmsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((resp) => {
        resp.results.sort((a, b) => a.episode_id - b.episode_id)
        setData(resp.results);
        dispatch(saveFilms(resp.results));
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <div>
          <Title type="warning" level={2}>Filmes de startwars</Title>
          <Row gutter={[16, 48]}>
              {data.map((item, i) => (
                <CardComponent key={i} {...item} />
              ))}
          </Row>
    </div>
  )
}
