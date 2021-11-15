import { useState, useEffect } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { FiCheck, FiX } from 'react-icons/fi'

import { ConditionType, IQuestionsProps } from './edit-questions'

import * as Styles from '../styles/Pages/Home'

const Home: NextPage = () => {
  const [percent, setPercent] = useState(0)

  const getPercentOfCheckedQuestions = (questions: IQuestionsProps[]) => {
    const totalOfCheckedQuestions = questions.reduce((prev, currentQuestion) => {
      if (currentQuestion.condition === 'CHECKED') {
        return prev + 1
      }

      return prev
    }, 0)

    setPercent((totalOfCheckedQuestions * 100) / questions.length)
  }

  const [questions, setQuestions] = useState<IQuestionsProps[]>(() => {
    const { questions: questionsFromCookies } = nookies.get()

    const parsedQuestionsFromCookies = JSON.parse(questionsFromCookies)

    getPercentOfCheckedQuestions(parsedQuestionsFromCookies)

    if (questionsFromCookies) {
      return parsedQuestionsFromCookies
    }

    return []
  })

  const handleCheckItem = (questionId: string) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return {
          id: question.id,
          question: question.question,
          condition: 'CHECKED' as ConditionType
        }
      }

      return question
    })

    nookies.set(undefined, 'questions', JSON.stringify(updatedQuestions))

    setQuestions(updatedQuestions)
  }

  const handleUncheckItem = (questionId: string) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return {
          id: question.id,
          question: question.question,
          condition: 'NOT-CHECKED' as ConditionType
        }
      }

      return question
    })

    nookies.set(undefined, 'questions', JSON.stringify(updatedQuestions))

    setQuestions(updatedQuestions)
  }

  useEffect(() => {
    getPercentOfCheckedQuestions(questions)
  }, [questions])

  return (
    <Styles.Container>
      <Styles.Content>
        <h1>Questões</h1>

        {questions.length === 0 && (
          <p className='without-questions'>Vá para a aba de "Questões" para cadastrar questões</p>
        )}

        {questions.map(question => (
          <Styles.Question key={question.id} condition={question.condition}>
            <p>{question.question}</p>

            <div className="actions">
              <button
                title='Marcar'
                role='button'
                className="success"
                onClick={() => handleCheckItem(question.id)}
              >
                <FiCheck size={18} />
              </button>
              <button
                title='Desmarcar'
                role='button'
                className="cancel"
                onClick={() => handleUncheckItem(question.id)}
              >
                <FiX size={18} />
              </button>
            </div>
          </Styles.Question>
        ))}

        <Styles.Percent>
          <h3>Aceitação</h3>

          <div className="percent-wrapper">
            <div className="percent-bar" style={{ width: `${percent}%` }}>
              <p className="percent">{percent.toFixed(0)}%</p>
            </div>
          </div>
        </Styles.Percent>
      </Styles.Content>
    </Styles.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}
  }
}

export default Home
