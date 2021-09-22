import 'bulmaswatch/superhero/bulmaswatch.min.css';

import ReactDOM from 'react-dom';

import CellList from './components/CellList';
import TextEditor from './components/TextEditor';

import { Provider } from 'react-redux';
import { store } from './state';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
