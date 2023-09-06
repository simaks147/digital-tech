import { useState } from 'react';
import { IProductSpec } from '../components/admin/product/Product';

export default function useSpecification(initSpecification: IProductSpec[] = []) {
  const [specification, setSpec] = useState(initSpecification);

  return {
    specification,
    addSpec: () => setSpec([...specification, { title: '', desc: '', num: Date.now().toString() }]),
    deleteSpec: (num: string) => setSpec(specification.filter(spec => spec.num !== num)),
    changeSpec: (key: string, value: string, num: string) => setSpec(specification.map((spec) => spec.num === num ? {
      ...spec,
      [key]: value
    } : spec))
  };
}
