import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { loadData, filter } from '../store/characters'

import { CardCharacters } from '../Components/CardCharacters';
import { PaginationCharacters } from "../Components/PaginationCharacters";
import { Row, Col, Typography, Divider, Form, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

export const CharactersPage = () => {

  const [form] = Form.useForm();
  const { characters, films, backupCharacter, loadingCharacter } = useSelector(state => state.character);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    if (characters.length === 0) {
        dispatch(loadData('https://swapi.dev/api/people'))
    }
  }, [characters])

  useEffect(() => {
    if (films.length === 0) {
      navigate('/')
    }
  })
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = characters.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const onFinish = (values) => {
    dispatch(filter(values))
  };

  const filterEyeColor = () => {
    const eye_color = backupCharacter.map((item) => {
      return item.eye_color
    })

    const set_eye_color = new Set(eye_color)

    let result = [...set_eye_color];

    return (
      <>
        { result.map((color, i) => (
          <Option value={color} key={i}>{color}</Option>

        )) }
      </>
    )
  }

  if (loadingCharacter) {
    return (
      <div className="App">
        <h1 className="title">Cargando...</h1>
      </div>
    );
  }

  return (
    <div>
      <Title type="warning" level={2}>Lista de personajes</Title>
      <Divider orientation='left'>Filtros</Divider>
          <Form
            {...formItemLayout}
            form={form}
            name="search"
            layout='inline'
            onFinish={onFinish}
            scrollToFirstError
            style={{
              width: '100%',
            }}
          >
            <Row style={{width: '100%'}} gutter={{ xs: 0, sm: 0, md: 12, lg: 18, xl: 18 }}>
              <Col style={{ marginBottom: '20px'}} xs={24} sm={24} md={12}  xl={6}>
                <Form.Item
                  name="films"
                  label="Peliculas"
                >
                  <Select placeholder="Selecciona">
                    {films.map((film, i) => (
                      <Option value={film.url} key={i}>{film.title}</Option>

                    ))}
                  </Select>
                </Form.Item>

              </Col>

              <Col style={{ marginBottom: '20px'}} xs={24} sm={24} md={12} xl={6}>
                <Form.Item
                  name="gender"
                  label="Genero"
                >
                <Select placeholder="Selecciona un color">
                  <Option value="male">Masculino</Option>
                  <Option value="female">Femenino</Option>
                  <Option value="n/a">Other</Option>
                </Select>
                </Form.Item>

              </Col>
              <Col style={{ marginBottom: '20px' }} xs={24} sm={24} md={12} xl={6}>
                <Form.Item
                  name="eye_color"
                  label="Color de ojos"
                >
                  <Select placeholder="Selecciona un color">
                    {filterEyeColor()}
                  </Select>
                </Form.Item>

              </Col>
              <Col style={{ marginBottom: '20px'}} xs={24} sm={24} md={12} xl={6}>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      Buscar
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>


          </Form>
      <br />
      <br />
      <Row>
        <Col span={24}>
          <Row gutter={[16, 48]}>
            {currentPosts.length > 0 ? (
              <CardCharacters characters={currentPosts} />

            ) :  ( null ) }
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={12} md={8} xl={4}>
        <PaginationCharacters
          postsPerPage={postsPerPage}
          totalPosts={characters.length}
          paginate={paginate}
        />
        </Col>
      </Row>
    </div>
  )
}
