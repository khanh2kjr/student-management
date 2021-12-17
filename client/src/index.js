import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'app/store'
import { Provider } from 'react-redux'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
