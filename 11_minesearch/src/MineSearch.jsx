import React, { useReducer, createContext, useMemo, useEffect } from 'react'
import Table from './Table'
import Form from './Form'

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6, 
  OPENED: 0,
}

//초기값 설정인데 지금은 딱히 필요가 없기때문에 모양만 맞추었다.
export const TableContext = createContext({
  tableData: [[]],
  dispatch: () => {},
});

const initialState = {
    tableData: [[]],
    date:{
      row: 10,
      cell: 10,
      mine: 20,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
};

const plantMine = (row, cell, mine) =>{
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map( (arr, i) => {
    return i;
  })
  const shuffle = [];
  while(candidate.length > row * cell - mine){
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    shuffle.push(chosen)
  }

  const data = [];

  for (let i=0; i < row; i++){
    const rowData = [];
    data.push(rowData)
    for (let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL)
    }
  };

  for(let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE
  };

  console.log(data)

  return data;
}

export const START_GAME = 'START_GAME'
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL'
export const INCREMENT_TIMER = 'INCREMENT_TIMER'


const reducer = (state, action) => {
  switch(action.type){
    case START_GAME:
      return{
        ...state,
        data: {
          row: action.row, 
          cell: action.cell, 
          mine: action.mine
        },
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        openedCount: 0,
        timer: 0,
      };
    case OPEN_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]]
      tableData.forEach( (row, i) => {
        tableData[i] = [...state.tableData[i]]
      })

      const checked = [];
      let openedCount = 0

      const checkArround = (row, cell) => {
        if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
          return;
        }
        //상하좌우 없는 칸은 안 열기
        if( row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
          return
        }
        //이미 체크한 칸일 경우
        if(checked.includes( row + ',' + cell)){
          return
        }
        else{
          checked.push(`${row},${cell}`)
        }
        if(tableData[row][cell] === CODE.NORMAL){
          openedCount += 1
        }
        let around = []
        if(tableData[row-1]){
          around = around.concat(
            tableData[row-1][cell-1],
            tableData[row-1][cell],
            tableData[row-1][cell+1]
          );
        }
        around = around.concat(
          tableData[row][cell-1],
          tableData[row][cell+1]
        );
        if(tableData[row+1]){
          around = around.concat(
            tableData[row+1][cell-1],
            tableData[row+1][cell],
            tableData[row+1][cell+1]
          );
        }
        
        const count = around.filter( (v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        tableData[row][cell] = count
  
        if (count === 0){
          const near = [];
          if (row -1 > -1){
            near.push([row-1, cell-1])
            near.push([row-1, cell])
            near.push([row-1, cell+1])
          }
          near.push([row, cell-1])
          near.push([row, cell+1])
          if (row +1 < tableData.length){
            near.push([row+1, cell-1])
            near.push([row+1, cell])
            near.push([row+1, cell+1])
          }
          near.forEach((n) => {
            if(tableData[n[0]][n[1]] !== CODE.OPENED){
              checkArround(n[0], n[1])
            }
          })
        }
        tableData[row][cell] = count
      }

      checkArround(action.row, action.cell)

      //승리
      let halted = false;
      let result = ''
      if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
        halted = true;
        result = `승리! : ${state.timer}초`;
      }
      return{
        ...state,
        tableData: tableData,
        openedCount: state.openedCount + openedCount,
        halted: halted,
        result: result,
      }
    };
    case CLICK_MINE:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]]
      tableData[action.row][action.cell] = CODE.CLICKED_MINE
      return{
        ...state,
        tableData: tableData,
        halted: true
      }
    };
    case FLAG_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.MINE){
        tableData[action.row][action.cell] = CODE.FLAG_MINE
      }
      else{
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return{
        ...state,
        tableData: tableData,
      }
    }
    case QUESTION_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE){
        tableData[action.row][action.cell] = CODE.QUESTION_MINE
      }
      else{
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return{
        ...state,
        tableData: tableData,
      }
    }
    case NORMALIZE_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE){
        tableData[action.row][action.cell] = CODE.MINE
      }
      else{
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return{
        ...state,
        tableData: tableData,
      }
    }
    case INCREMENT_TIMER:{
      return {
        ...state,
        timer: state.timer+1
      }
    }
    default:
      return state;
  }
};



const MineSearch = () =>{
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted} = state;

  //useMemo를 이용해서 캐싱을 하자
  const value = useMemo( () => ( {tableData: tableData, halted: halted, dispatch}), [tableData, halted]);

  useEffect( () => {
    let timer;
    if(halted === false){
      timer = setInterval( () => {
        dispatch({type: INCREMENT_TIMER})
      }, 1000)
    }
    return () => {
       clearInterval(timer)
    }
  }, [halted])

  return(
    <TableContext.Provider value={value}>
      <Form/>
      <div>{state.timer}</div>
      <Table/>
      <div>{state.result}</div>
    </TableContext.Provider>
  )
}

export default MineSearch;
