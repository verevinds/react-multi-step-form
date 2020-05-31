import React, { memo, useContext } from 'react';
import MultiStepButton from './MultiStepButton';
import { MutiStepContext } from './context';

const MultiStep = () => {
  const { state, setState } = useContext(MutiStepContext);

  const handleChange = (input: string) => (
    e: React.FormEvent<HTMLInputElement>,
  ) =>
    setState({
      ...state,
      [`step${state.step}`]: {
        ...state[`step${state.step}`],
        [input]: {
          ...state[`step${state.step}`][input],
          value: e.currentTarget.value,
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
  // switch (state.step) {
  //   case 1:
  //     return (
  //       <MultiStepButton
  //         nextStep={nextStep}
  //         handleChange={handleChange}
  //         input={[
  //           { title: 'Имя', name: 'firstName' },
  //           { title: 'Фамилия', name: 'lastName' },
  //         ]}
  //       >
  //         <h1>{state.step}</h1>
  //       </MultiStepButton>
  //     );
  //   case 2:
  //     return (
  //       <MultiStepButton
  //         nextStep={nextStep}
  //         handleChange={handleChange}
  //         input={[{ title: 'Электронная почта', name: 'email' }]}
  //       >
  //         <h1>{state.step}</h1>
  //       </MultiStepButton>
  //     );
  //   default:
  //     return (
  //       <MultiStepButton prevStep={prevStep}>
  //         <h1>{state.step}</h1>
  //       </MultiStepButton>
  //     );
  // }
};

export default memo(MultiStep);
