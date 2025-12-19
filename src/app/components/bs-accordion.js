'use client';
import { Accordion } from 'react-bootstrap';

export default function BsAccordion({ itemData }) {
  return (
    <>
      <Accordion defaultActiveKey="0">
        {itemData.map(item => (
          <Accordion.Item key={item.id} eventKey={item.id}>
            <Accordion.Header as={'h5'}>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
