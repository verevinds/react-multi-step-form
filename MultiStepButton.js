import React, {
  memo,
  useCallback,
  useMemo,
  useContext,
  FormEvent,
} from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { MutiStepContext } from './context';
import MultiStepForm, { IMultiStepForm } from './MultiStepForm';
import styles from './styles.module.css';

const MultiStepButton = ({
  nextStep,
  prevStep,
  handleChange,
  input,
  children,
}) => {
  const { state } = useContext(MutiStepContext);
  const handleMove = useCallback(
    function (event) {
      event.preventDefault();
      nextStep ? nextStep() : console.log('Done!', state);
    },
    [nextStep, state],
  );

  const buttonNext = useMemo(() => {
    if (nextStep) {
      return (
        <FormControl
          as="input"
          type="submit"
          value="Далее"
          className="btn btn-primary"
        />
      );
    } else {
      return (
        <FormControl
          as="input"
          type="submit"
          value="Готово"
          className="btn btn-success"
        />
      );
    }
  }, [nextStep]);
  const buttonPrev = useMemo(() => {
    return (
      <FormControl
        as="input"
        type="submit"
        value="Назад"
        name="prevStep"
        onClick={(event) => {
          event.preventDefault();
          if (!!prevStep) prevStep();
        }}
        disabled={!prevStep}
      />
    );
  }, [prevStep]);
  return (
    <div>
      <Form onSubmit={handleMove}>
        <div className={styles.form}>
          {input ? (
            <MultiStepForm handleChange={handleChange} input={input} />
          ) : (
            <>{children}</>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <InputGroup aria-label="Basic example">
            {buttonPrev}
            {buttonNext}
          </InputGroup>
        </div>
      </Form>
    </div>
  );
};

export default memo(MultiStepButton);
