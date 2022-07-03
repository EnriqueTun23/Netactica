
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Col, Card, Button } from 'antd';
import {  EllipsisOutlined } from '@ant-design/icons';

import { addUrlCharacter } from '../store/characters';

export const CardComponent = ({
    title,
    director,
    episode_id,
    url
}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleSaveUrlAndRedirect = () => {
    dispatch(addUrlCharacter(url))
    navigate(`/film/characters`)
  }


  return (
    <Col xs={24} md={12} xl={8}>
        <Card 
            // hoverable 
            title={title} 
            extra={<Button onClick={onHandleSaveUrlAndRedirect} type="link">Personajes</Button>} 
            actions={[
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
              <p><b>Episodio:</b> {episode_id}</p>
              <p><b>Director:</b> {director}</p>
        </Card>
    </Col>
  )
}
