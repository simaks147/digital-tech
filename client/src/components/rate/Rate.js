import React from 'react';
import {ReactComponent as StarFullIcon} from "../../icons/star-full-icon.svg";
import {ReactComponent as StarEmptyIcon} from "../../icons/star-empty-icon.svg";

const Rate = ({value}) => (
  <>
    {
      [...Array(5)].map((_, i) => {
        return i <= value - 1 ? <StarFullIcon key={i}/> : <StarEmptyIcon key={i}/>
      })
    }
  </>
);

export default Rate;
