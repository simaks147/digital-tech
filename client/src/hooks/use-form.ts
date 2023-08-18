import { useState } from 'react';

interface IHandler {
  value: any,
  onChange: (ev: any) => void
}

interface IFormData {
  values: Record<string, any>,
  reset: () => void,
  handlers: Record<string, IHandler>
}

export default function useForm(initialValues: Record<string, any> = {}): IFormData {
  const [values, setValues] = useState(initialValues);

  const setValue = (key: string, value: any) => setValues({ ...values, [key]: value });

  const onChange = (key: string) => (ev: any) =>
    setValue(key, ev.target ? ev.target.value : ev);

  return {
    values,
    reset: () => setValues(initialValues),
    handlers: Object.keys(values).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { value: values[key], onChange: onChange(key) },
      }),
      {}
    ),
  };
}
