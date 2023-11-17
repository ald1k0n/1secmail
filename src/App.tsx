import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Message from "./components/Message";

import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/:id/*" element={<Message />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
