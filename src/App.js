import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Home} from './pages/Home/Home'
import {Lists} from './pages/Lists/Lists'
import {CreateList} from './pages/CreateList/CreateList'
import {List} from './pages/List/List'


import { AuthContextProvider } from './contexts/AuthContext'

import './assets/styles/global.scss'

function App() {
  return (
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/lists" component={Lists} /> 
            <Route path="/createlist/:id" component={CreateList} /> 
            <Route path="/list/:id" component={List} /> 
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
