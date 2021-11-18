import { ReactElement, useState } from 'react';
import Input from '../components/Input/';
import { useForm } from 'react-hook-form'
import nookies from 'nookies'
import { FiTrash, FiEdit2, FiCheck, FiX } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/Button';
import EditableInput from '../components/EditableInput';

import * as Styles from '../styles/Pages/Configuration'
import { toast } from 'react-toastify';

export type ConditionType = 'CHECKED' | 'NOT-CHECKED' | 'EMPTY'

export interface IQuestionsProps {
  id: string
  question: string
  condition: ConditionType
}

const Configuration = (): ReactElement => {
  const [isUserEditingQuestion, setIsUserEditingQuestion] = useState(false)
  const [questionBeingEdited, setQuestionBeingEdited] = useState<IQuestionsProps>({} as IQuestionsProps)
  const [questions, setQuestions] = useState<IQuestionsProps[]>(() => {
    const { questions: questionsFromCookies } = nookies.get()

    if (questionsFromCookies) {
      return JSON.parse(questionsFromCookies)
    }

    return []
  })

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    getValues: getValues2,
    watch: watch2,
    setValue: setValue2,
    setError: setError2,
    formState: { errors: errors2 }
  } = useForm()

  const [acceptancePercentage, setAcceptancePercentage] = useState(() => {
    const { acceptancePercentage: acceptancePercentageFromCookies } = nookies.get()

    if (acceptancePercentageFromCookies) {
      const parsedAcceptancePercentage = Number(JSON.parse(acceptancePercentageFromCookies))
      setValue2('acceptancePercentage', parsedAcceptancePercentage)

      return parsedAcceptancePercentage
    }

    return 0
  })

  const handleCreateQuestion = () => {
    const newQuestion = getValues('question')

    if (!newQuestion) {
      return setError('question', {
        type: 'manual',
        message: 'Por favor, insira uma pergunta'
      })
    }

    const updatedQuestions = [
      {
        id: uuidv4(),
        question: newQuestion,
        condition: 'EMPTY' as ConditionType,
      },
      ...questions,
    ]
    
    nookies.set(undefined, 'questions', JSON.stringify(updatedQuestions), {
      maxAge: 60 * 60 * 24 * 7 * 10
    })

    setQuestions(updatedQuestions)

    reset()
  }

  const handleDeleteQuestion = (questionId: string) => {
    const filteredQuestions = questions.filter(question => questionId !== question.id)

    setQuestions(filteredQuestions)
    nookies.set(undefined, 'questions', JSON.stringify(filteredQuestions))
  }

  const handleEditQuestion = (question: IQuestionsProps) => {
    setQuestionBeingEdited(question)
    setIsUserEditingQuestion(true)

    setValue('new-question', question.question)
  }

  const handleSaveQuestion = (questionId: string) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return {
          id: question.id,
          question: getValues('new-question'),
          condition: question.condition,
        }
      }

      return question
    })

    nookies.set(undefined, 'questions', JSON.stringify(updatedQuestions))

    setQuestions(updatedQuestions)

    setIsUserEditingQuestion(false)
    setQuestionBeingEdited({} as IQuestionsProps)
  }

  const handleCalcelEditingQuestion = () => {
    setIsUserEditingQuestion(false)
    setQuestionBeingEdited({} as IQuestionsProps)

    reset()
  }

  const handleSetAcceptancePercentage = () => {
    const percentage = getValues2('acceptancePercentage')

    if (percentage > 100 || percentage < 0) {
      setError2('acceptancePercentage', {
        type: 'manual',
        message: 'Valor inválido. Insira um valor entre 0 e 100'
      })
    }

    nookies.set(undefined, 'acceptancePercentage', JSON.stringify(percentage))
    setAcceptancePercentage(percentage)
    setValue2('acceptancePercentage', percentage)

    toast.success('Valor atualizado com sucesso')
  }
  
  return (
    <Styles.Container>
      <Styles.Content>
        <form onSubmit={handleSubmit(handleCreateQuestion)}>
          <h1>Perguntas</h1>

          <div className="input-wrapper">
            <Input
              register={register}
              name='question' 
              label='Digite sua pergunta aqui'
              error={errors.question && errors.question}
            />

            <Button title='Adicionar' type='submit' />
          </div>
        </form>

        <Styles.Questions>
          {questions.length === 0 && (
            <p>Oops, parece que não existem perguntas registradas :(</p>
          )}

          {questions.map(question => (
            <Styles.Question
              key={question.id}
              isUserEditingQuestion={isUserEditingQuestion}
              isQuestionBeignEdited={
                isUserEditingQuestion
                && (isUserEditingQuestion && questionBeingEdited.id === question.id)
              }
            >
              {isUserEditingQuestion && (isUserEditingQuestion && questionBeingEdited.id === question.id) ? (
                <EditableInput
                  register={register}
                  name='new-question'
                  onSubmit={() => handleSaveQuestion(question.id)}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handleSaveQuestion(question.id)
                    }
                  }}
                />
              ) : (
                <p>{question.question}</p>
              )}

              <div className="actions">
                {isUserEditingQuestion && (isUserEditingQuestion && questionBeingEdited.id === question.id) ? (
                  <>
                    <button
                      title='Salvar'
                      role='button'
                      className="success"
                      onClick={() => handleSaveQuestion(question.id)}
                    >
                      <FiCheck size={18} />
                    </button>
                    <button
                      title='Cancelar'
                      role='button'
                      className="cancel"
                      onClick={() => handleCalcelEditingQuestion()}
                    >
                      <FiX size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      title='Editar'
                      disabled={isUserEditingQuestion}
                      role='button'
                      onClick={() => handleEditQuestion(question)}
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      title='Deletar'
                      disabled={isUserEditingQuestion}
                      role='button'
                      className="delete"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <FiTrash size={18} />
                    </button>
                  </>
                )}
              </div>
            </Styles.Question>
          ))}
        </Styles.Questions>

        <Styles.AcceptancePercentage>
          <h1>Definir porcentagem de aceitação</h1>

          <form onSubmit={handleSubmit2(handleSetAcceptancePercentage)}>
            <p>Qual a porcentagem mínima de itens completos?</p>

            <Input
              register={register2}
              name='acceptancePercentage'
              error={errors2.acceptancePercentage && errors2.acceptancePercentage}
              type='number'
              min='0'
              max='100'
              step="1"
            />

            <Button
              title='Salvar'
              type='submit'
              disabled={acceptancePercentage === Number(watch2('acceptancePercentage'))}
            />
          </form>
        </Styles.AcceptancePercentage>
      </Styles.Content>
    </Styles.Container>
  );
};

export default Configuration
