import { ActionType } from '../action-types';
import { Direction } from '../actions';
import { CellTypes } from '../cell';

import {
  Action,
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellActon,
} from '../actions';

export const updateCell = (id: string, content: string): UpdateCellActon => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string,
  type: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type,
    },
  };
};
