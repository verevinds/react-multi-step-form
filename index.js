import React, { memo, useState, useEffect } from 'react';
import { MutiStepContext } from './context';
import MultiStep from './MultiStep';
import { useMemo } from 'react';

const MultiStepWrapper = ({ input }) => {
  const initState = useMemo(() => {
    let type = [
      'button',
      'checkbox',
      'password',
      'reset',
      'text',
      'color',
      'date',
      'datetime',
      'datetime-local',
      'email',
      'number',
      'range',
      'search',
      'tel',
      'time',
      'url',
      'month',
      'week',
      'switch',
    ];
    let obj = {
      step: 1,
    };
    input.forEach((item, index, arr) => {
      for (let key in item) {
        if (!~type.indexOf(item[key].type)) {
          item[key].type = 'text';
        }
        if (item[key].type === 'switch')
          Object.assign(item[key], { value: 'off' });
        else Object.assign(item[key], { value: '' });
      }
      obj[`step${index + 1}`] = item;
    });
    return obj;
  }, [input]);

  const [state, setState] = useState(initState);
  return (
    <MutiStepContext.Provider value={{ state, setState }}>
      <MultiStep />
    </MutiStepContext.Provider>
  );
};

export default memo(MultiStepWrapper);
