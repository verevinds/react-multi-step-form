import React, { memo, useState, useEffect, useMemo } from 'react';
import { MutiStepContext } from './context';
import MultiStep from './MultiStep';

interface IMultiStepWrapper {
  input?: IInput[];
}
interface IInput {
  forEach: any;
  [key: string]: IObjInput;
  objInput: IObjInput;
}
export interface IObjInput {
  title?: string;
  placeholder?: string;
  name: string;
  type:
    | 'button'
    | 'checkbox'
    | 'password'
    | 'reset'
    | 'text'
    | 'color'
    | 'date'
    | 'datetime'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'range'
    | 'search'
    | 'tel'
    | 'time'
    | 'url'
    | 'month'
    | 'week';
}
interface IObj {
  [key: string]: any;
}
const MultiStepWrapper: React.FC<IMultiStepWrapper> = ({ input }) => {
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
    let obj: IObj = {
      step: 1,
    };
    input?.forEach((item: any, index: number, arr) => {
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
  useEffect(() => {
    console.log('state', state);
  }, [state]);
  return (
    <MutiStepContext.Provider value={{ state, setState }}>
      <MultiStep />
    </MutiStepContext.Provider>
  );
};

export default memo(MultiStepWrapper);
