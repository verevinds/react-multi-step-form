import React, { memo, useMemo } from 'react';
import { Form } from 'react-bootstrap';

const MultiStepForm = ({ input, handleChange }) => {
  const jsx = useMemo(() => {
    let jsx = [];
    for (let key in input) {
      let { title, placeholder, type, required, description } = input[key];
      let formControl = (
        <>
          <Form.Control
            type={type}
            placeholder={placeholder}
            required={!!required}
            onChange={handleChange ? handleChange(key) : () => {}}
          />

          {!!description ? (
            <Form.Text className="text-muted">{description}</Form.Text>
          ) : undefined}
        </>
      );

      const formChek = (type, key, description, handleChange) => {
        return (
          <Form.Check
            type={type}
            id={key}
            label={description}
            onChange={handleChange ? handleChange(key) : () => {}}
          />
        );
      };
      switch (type) {
        case 'tel':
          formControl = (
            <>
              <Form.Control
                type={type}
                placeholder={placeholder}
                required={!!required}
                pattern="/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/"
                onChange={handleChange ? handleChange(key) : () => {}}
              />
              <Form.Text className="text-muted">
                Введите номер телефона в формате: +7(903)888-88-88
              </Form.Text>
            </>
          );
          break;
        case 'checkbox':
          formControl = formChek(type, key, description, handleChange);
          break;
        case 'switch':
          formControl = formChek(type, key, description, handleChange);
          break;
      }
      jsx.push(
        <Form.Group controlId={key} key={key}>
          {!!title ? <Form.Label>{title}</Form.Label> : undefined}
          {formControl}
        </Form.Group>,
      );
    }
    return jsx;
  }, [input, handleChange]);
  return <>{jsx.map((item) => item)}</>;
};

export default memo(MultiStepForm);
