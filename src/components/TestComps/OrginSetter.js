import React, { useContext } from 'react';
import { GlobalContext } from '../../utilities/GlobalContext';

export default function OrginSetter(){
    const setServerOrigin = useContext(GlobalContext).setServerOrigin;
    return(
        <div>
            <select onChange={(event) => {updateServerOrigin(event.target.value);}}>
                <option value="http://localhost:3001">Dev</option>
                <option value="https://twentyfourseven-sale-67425.herokuapp.com">Production</option>
            </select>
        </div>
    );

    function updateServerOrigin(newOrgin){
        setServerOrigin(setServerOrigin(newOrgin));
      }
}