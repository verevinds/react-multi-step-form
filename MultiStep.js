import React, { memo } from 'react';
import MultiStepButton from './MultiStepButton';
import { MutiStepContext } from './context';
import { useContext } from 'react';

const MultiStep = () => {
  const { state, setState } = useContext(MutiStepContext);

  const handleChange = (input) => (event) =>
    setState({
      ...state,
      [`step${state.step}`]: {
        ...state[`step${state.step}`],
        [input]: {
          ...state[`step${state.step}`][input],
          value: event.currentTarget.value,
        },
      },
    });
  const nextStep = () => setState({ ...state, step: state.step + 1 });

  const prevStep = () => setState({ ...state, step: state.step - 1 });

  if (state[`step${state.step}`]) {
    return (
      <MultiStepButton
        nextStep={nextStep}
        prevStep={state.step > 1 ? prevStep : undefined}
        handleChange={handleChange}
        input={state[`step${state.step}`]}
      >
        <h1>{state.step}</h1>
      </MultiStepButton>
    );
  } else {
    return <MultiStepButton prevStep={prevStep}>{}</MultiStepButton>;
  }
};

export default memo(MultiStep);
