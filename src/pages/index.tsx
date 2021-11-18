import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import nookies from 'nookies'
import { FiCheck, FiX } from 'react-icons/fi'

import { ConditionType, IQuestionsProps } from './configuration'

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

    setPercent((totalOfCheckedQuestions * 100) / questions.length || 0)
  }

  const [questions, setQuestions] = useState<IQuestionsProps[]>(() => {
    const { questions: questionsFromCookies } = nookies.get()

    
    if (questionsFromCookies) {
      const parsedQuestionsFromCookies = JSON.parse(questionsFromCookies)
  
      getPercentOfCheckedQuestions(parsedQuestionsFromCookies)

      return parsedQuestionsFromCookies
    }

    return []
  })
  const [acceptancePercentage, setAcceptancePercentage] = useState(() => {
    const { acceptancePercentage: acceptancePercentageFromCookies } = nookies.get()

    if (acceptancePercentageFromCookies) {
      const parsedAcceptancePercentage = Number(JSON.parse(acceptancePercentageFromCookies))

      return parsedAcceptancePercentage
    }

    return 0
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
          <p className='without-questions'>
            Vá para a página de "Configurações" para adicionar questões
            e configurar a porcentagem de aceite
          </p>
        )}

        <Styles.Questions>
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
        </Styles.Questions>

        <Styles.Percent success={(percent !== 0 || acceptancePercentage !== 0) && percent > acceptancePercentage}>
          <div className="percent-header">
            <h3>Aceitação</h3>

            {questions.length !== 0 && (
              <p>
                {percent > acceptancePercentage
                  ? 'Porcentagem de questões concluídas maior que a porcentagem de aceite'
                  : 'Porcentagem de questões concluídas menor que a porcentagem de aceite'
                }
              </p>
            )}
          </div>

          <div className="percent-wrapper">
            <div className="percent-bar" style={{ width: `${percent}%` }} />

            <div
              className="acceptance-percentage"
              style={{ width: `${acceptancePercentage}%` }} 
            />
          </div>

          <div className="subtitle">
            <div className="square-wrapper">
              <div className="square success" />
              <p>Questões aceitas: <strong>{percent ? percent.toFixed(0) : 0}%</strong></p>
            </div>
            <div className="square-wrapper">
              <div className="square secondary" />
              <p>Porcentagem mínima de aceite: <strong>{acceptancePercentage ? acceptancePercentage.toFixed(0) : 0}%</strong></p>
            </div>
          </div>
        </Styles.Percent>
      </Styles.Content>
    </Styles.Container>
  )
}

export default Home
