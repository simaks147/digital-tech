import { useState } from 'react';

export default function useSpecification(initSpecification = {}) {
  const [specification, setSpec] = useState(initSpecification);

  return {
    specification,
    addSpec: () => setSpec([...specification, {title: '', desc: '', num: Date.now()}]),
    deleteSpec: (num) => setSpec(specification.filter(spec => spec.num !== num)),
    changeSpec: (key, value, num) => setSpec(specification.map((spec) => spec.num === num ? {
      ...spec,
      [key]: value
    } : spec))
  };
}
