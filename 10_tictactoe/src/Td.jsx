import React, { useCallback, useEffect, useRef, memo } from "react";
import { CLICK_CELL } from "./TicTacToe"

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) =>{

    const ref = useRef([])
    useEffect(() => {
        console.log(rowIndex === ref.current[0],
            rowIndex === ref.current[1],
            dispatch === ref.current[2],
            cellData === ref.current[3])
        ref.current = [rowIndex, cellIndex, dispatch, cellData]
    }, [rowIndex, cellIndex, dispatch, cellData])

    const onClickTd = useCallback(() =>{
        console.log(rowIndex, cellIndex)
        if (cellData){
            alert("이미 존재합니다")
            return;
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex})
    }, [cellData]);

    return(
        <td className="td" onClick={onClickTd}>{cellData}</td>
    )
})

export default Td