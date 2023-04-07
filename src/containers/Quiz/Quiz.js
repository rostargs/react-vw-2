import React, {Component} from "react";
import classes from "./Quiz.module.scss"
import { ActiveQuiz } from "../../components/ActiveQuiz/ActiveQuiz";
import { FinishedQuiz } from "../../components/FinishedQuiz/FinishedQuiz";

export class Quiz extends Component{
    state = {
        results:{},
        isFinished: false,
        activeQuestion:0,
        answerState: null,
        quiz: [
            {
                question: 'Якого кольору небо?',
                rightAnswerId: 2, 
                id:1,
                answers: [
                    {text: 'Чорний',id: 1},
                    {text: 'Синій',id: 2},
                    {text: 'Червоний',id: 3},
                    {text: 'Зелений',id: 4}
                ]
            },
            {
                question: 'Який зараз рік?',
                rightAnswerId: 3, 
                id:2,
                answers: [
                    {text: '2222',id: 1},
                    {text: '2223',id: 2},
                    {text: '2023',id: 3},
                    {text: '1456',id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
          const key = Object.keys(this.state.answerState)[0]
          if (this.state.answerState[key] === 'success') {
            return
          }
        }
    
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
    
        if (question.rightAnswerId === answerId) {
          if (!results[question.id]) {
            results[question.id] = 'success'
          }
    
          this.setState({
            answerState: {[answerId]: 'success'},
            results
          })
    
          const timeout = window.setTimeout(() => {
            if (this.isQuizFinished()) {
              this.setState({
                isFinished: true
              })
            } else {
              this.setState({
                activeQuestion: this.state.activeQuestion + 1,
                answerState: null
              })
            }
            window.clearTimeout(timeout)
          }, 1000)
        } else {
          results[question.id] = 'error'
          this.setState({
            answerState: {[answerId]: 'error'},
            results
          })
        }
      }
    
      isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
      }
    
      retryHandler = () => {
        this.setState({
          activeQuestion: 0,
          answerState: null,
          isFinished: false,
          results: {}
        })
      }
    
      render() {
        return (
          <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
              <h1>Ответьте на все вопросы</h1>
    
              {
                this.state.isFinished
                 ? <FinishedQuiz
                      results={this.state.results}
                      quiz={this.state.quiz}
                      onRetry={this.retryHandler}
                    />
                 : <ActiveQuiz
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQuestion + 1}
                    state={this.state.answerState}
                  />
              }
            </div>
          </div>
        )
      }
}