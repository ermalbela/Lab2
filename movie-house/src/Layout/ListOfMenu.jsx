import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListOfMenu = ({searchResult, setSearchValue, setSearchToggle}) => {
  const history = useNavigate();

  return (
    <>
      {searchResult.map((data, idx) => {
        console.log(data);
        return (
          <Row key={idx} className="list-of-menu-item align-items-center" onClick={(e) => {
            e.preventDefault();
            setSearchValue('');
            setSearchToggle(false);
            history('/get_movie?id=' + [data][0].id);
          }}>
            <Col xs={2}>
              <img src={data.poster} className="list-of-menu-image img-fluid" alt={data.title} />
            </Col>
            <Col>
              <span>{data.title} </span>
              <span> [{data.genres.join(', ')}]</span>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default ListOfMenu
