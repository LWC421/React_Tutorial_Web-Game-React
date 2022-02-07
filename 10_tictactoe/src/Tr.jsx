import React, { memo, useMemo } from "react"
import Td from "./Td"

const Tr = memo(({ rowIndex, rowData, dispatch }) => {

    return(
        <tr>
            {Array(rowData.length).fill().map( (td, i) => (
                <Td key={i} rowIndex={rowIndex} cellIndex={i} 
                dispatch={dispatch} cellData={rowData[i]}>{''}</Td>
            ))}
        </tr>
    )
})

export default Tr