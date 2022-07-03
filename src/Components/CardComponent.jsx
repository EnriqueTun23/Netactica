import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Col, Card, Button, Modal } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { addUrlCharacter } from '../store/characters';

import episodeOne from '../assets/1.gif'
import episodeTwo from '../assets/2.gif'
import episodeThree from '../assets/3.gif'
import episodeFour from '../assets/4.gif'
import episodeFive from '../assets/5.gif'
import episodeSix from '../assets/6.gif'

export const CardComponent = ({
    title,
    director,
    episode_id,
    url
}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleSaveUrlAndRedirect = () => {
    dispatch(addUrlCharacter(url))
    navigate(`/film/characters`)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const gifData = () => {
    switch (episode_id) {
      case 1:
        return <img width='100%' src={episodeOne} alt='episodio 1' />
      case 2:
        return <img width='100%' src={episodeTwo} alt='episodio 2' />
      case 3:
        return <img width='100%' src={episodeThree} alt='episodio 3' />
      case 4:
        return <img width='100%' src={episodeFour} alt='episodio 4' />
      case 5:
        return <img width='100%' src={episodeFive} alt='episodio 5' />
      default:
        return <img width='100%' src={episodeSix} alt='episodio 6' />
        
    }
  }


  return (
    <>
      <Col className='animate__animated animate__flipInX' xs={24} md={12} xl={8}>
        <Card
          // hoverable 
          title={title}
          extra={<Button onClick={onHandleSaveUrlAndRedirect} type="link">Personajes</Button>}
          actions={[
            <PlayCircleOutlined onClick={handleOpenModal} key="playCircle" />,
          ]}
        >
          <p><b>Episodio:</b> {episode_id}</p>
          <p><b>Director:</b> {director}</p>
        </Card>
      </Col>
    
    <Modal 
      title={` GIF del film ${title}`} 
      visible={isModalVisible} 
      onOk={handleOk} 
      okText='Cancel' 
      onCancel={handleCancel}
      cancelButtonProps={{
        hidden: true
      }}
    >
        {gifData()}
      </Modal>
    </>
   
  )
}
