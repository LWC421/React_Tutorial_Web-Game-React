import React, { useContext, useCallback, memo, useMemo } from 'react'
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, NORMALIZE_CELL, TableContext, QUESTION_CELL } from './MineSearch';

const getTdStyle = (code) => {
  switch(code){
    case CODE.NORMAL:
    case CODE.MINE:
      return{
        background: '#444'
      }
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return{
        background: 'white'
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return{
        background: '#888'
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return{
        background: '#550'
      }
    default:
      return{
        background: 'white'
      }
  }
};

const getTdText = (code) => {
  switch(code){
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑'
    case CODE.FLAG:
      return '!'
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?'
    case CODE.OPENED:
      return ''
    default:
      return code;
  }
}

const Td = memo(({rowIndex, cellIndex}) => {
  const { tableData, halted, dispatch } = useContext(TableContext)
  const onClickTd = useCallback(() => {
    if (halted){
      return
    };
    switch(tableData[rowIndex][cellIndex]){
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex})
        return
      case CODE.MINE:
        dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex})
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback( (e) => {
    e.preventDefault();
    if(halted){
      return
    };
    switch(tableData[rowIndex][cellIndex]){
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex})
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex})
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex})
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted])


  return useMemo(() =>(
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}>
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  ), [tableData[rowIndex][cellIndex]])
});

export default Td;