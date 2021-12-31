import React, { useState } from 'react';

export default Try = ({tryInfo}) =>{
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}