import React from 'react';
import {ReactComponent as StarFullIcon} from "../../icons/star-full-icon.svg";
import {ReactComponent as StarEmptyIcon} from "../../icons/star-empty-icon.svg";

const Rate = ({value, onChange}) => (
  <>
    {
      [...Array(5)].map((_, i) => {
        const props = {
          key: i,
          style: onChange ? {cursor: 'pointer'} : {cursor: 'default'},
          onClick: onChange ? () => onChange(i + 1) : undefined
        }

        return i <= value - 1
          ? <StarFullIcon {...props}/>
          : <StarEmptyIcon {...props}/>
      })
    }
  </>
);

export default Rate;
