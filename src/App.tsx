
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Game from './pages/Game'
import styled from 'styled-components'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <AppContainer>
            <Game/>
          </AppContainer>
          }/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;