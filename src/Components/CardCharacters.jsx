import { useSelector, useDispatch } from 'react-redux';

import { Button, Card, Col, Divider, List } from "antd"
import { addURLPeople } from '../store/characters';
import { useNavigate } from 'react-router-dom';


export const CardCharacters = ({ characters }) => {
    const { films } = useSelector(state => state.character);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dataTitle = (item) => {
        const res = films.find(element => element.url === item)
        return res.title
    } 

    const handleUlrDetail = (url) => {
        dispatch(addURLPeople(url))
        navigate('/characters/detail')
    }

    if (characters.length === 0) {
        return (
            <div className="App">
                <h1 className="title">Cargando...</h1>
            </div>
        );
    }

  return (
      <>
          {characters.map((item, index) => (
              <Col className="animate__animated animate__jackInTheBox" xs={24} md={12} xl={8} key={index}>
                <Card
                    hoverable
                    title={item.name}
                    extra={<Button onClick={() => handleUlrDetail(item.url)} type="link">Ver mas</Button>}
                >
                    <p><b>Color de ojos:</b> {item.eye_color}</p>
                    <p><b>Genero:</b> {item.gender}</p>
                    <Divider orientation='left'>Lista de peliculas</Divider>
                    <List
                        size="small"
                        bordered
                        dataSource={item.films}
                        renderItem={item => <List.Item>{dataTitle(item)}</List.Item>}
                    />
                </Card>
              </Col>
              
          ))
        }
      </>
  )
}
