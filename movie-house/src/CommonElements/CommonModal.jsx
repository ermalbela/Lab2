import { Modal } from "react-bootstrap";

const CommonModal = ({size, show, onHide, title, FormComponent, formProps}) => {
  return (
    <Modal size={size} show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {FormComponent && <FormComponent {...formProps} />}
      </Modal.Body>
    </Modal>
    
  );
};

export default CommonModal;