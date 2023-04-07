import React from "react";
import { Layout } from "./hoc/Layout/Layout";
import { Quiz } from "./containers/Quiz/Quiz";
import { Route , Routes} from "react-router-dom";
import { Auth } from "./containers/Auth/Auth";
import { QuizList } from "./containers/QuizList/QuizList";
import { QuizCreator } from "./containers/QuizCreator/QuizCreator";




function App() {
  return (
    <Layout >
      <Routes>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/quize-creator" element={<QuizCreator/>}/>
          <Route path="/quiz/:id" element={<Quiz/>}/>
          <Route path="/" element={<QuizList/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
