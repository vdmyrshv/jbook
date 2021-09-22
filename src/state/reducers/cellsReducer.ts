import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

import produce from 'immer';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    // when the key in a key/value pair is dynamic, this is how you type it
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// don't forget to default the value to initialState and remember to return a value
const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      state.data[id].content = content;
      return;
    }
    case ActionType.DELETE_CELL: {
      delete state.data[action.payload];
      // when creating a NEW array you need to assign it back to state.order or any other state you're working with
      state.order = state.order.filter((id) => id !== action.payload);
      return;
    }
    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;
      const index = state.order.indexOf(id);
      // my way for reference
      // if (direction === 'up') {
      //   const before = state.order[index - 1];
      //   state.order[index - 1] = id;
      //   state.order[index] = before;
      // }
      // if (direction === 'down') {
      //   const after = state.order[index + 1];
      //   state.order[index + 1] = action.payload.id;
      //   state.order[index] = after;
      // }
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
      return;
    }
    case ActionType.INSERT_CELL_BEFORE: {
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.push(cell.id);
        return;
      }

      state.order = state.order.splice(foundIndex, 0, cell.id);

      return;
    }
    default:
      return state;
  }
});

const randomId = () => {
  // toString(36) means that this will contain numbers AND letters
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
