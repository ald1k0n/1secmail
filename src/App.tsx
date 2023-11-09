import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy } from "react"
import Message from "./components/Message";

const Home = lazy(()=> import('./pages/Home'));
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:id/*" element={<Message />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
