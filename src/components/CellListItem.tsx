import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  const { type } = cell;
  // my way to do it
  // return cell.type === 'code' ? <CodeCell /> : <TextEditor />;

  if (type === 'code') {
    child = <CodeCell cell={cell} />;
  } else {
    child = <TextEditor cell={cell}/>;
  }

  return <div>{child}</div>;
};

export default CellListItem;
