import { ReactElement, useState } from 'react';
import Input from '../components/Input/';
import { useForm } from 'react-hook-form'
import nookies from 'nookies'
import { FiTrash, FiEdit2, FiCheck } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/Button';
import EditableInput from '../components/EditableInput';

import * as Styles from '../styles/Pages/EditQuestions'

interface IQuestionsProps {
  id: string
  question: string
}

const EditQuestions = (): ReactElement => {
  const [isUserEditingQuestion, setIsUserEditingQuestion] = useState(false)
  const [questionBeingEdited, setQuestionBeingEdited] = useState<IQuestionsProps>({} as IQuestionsProps)
  const [questions, setQuestions] = useState<IQuestionsProps[]>(() => {
    const { questions: questionsFromCookies } = nookies.get()

    if (questionsFromCookies) {
      return JSON.parse(questionsFromCookies)
    }

    return []
  })

  const { register, handleSubmit, getValues, reset, setValue } = useForm()

  const handleCreateQuestion = () => {
    const newQuestion = getValues('question')

    const updatedQuestions = [
      ...questions,
      {
        id: uuidv4(),
        question: newQuestion
      }
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
          question: getValues('new-question')
        }
      }

      return question
    })

    nookies.set(undefined, 'questions', JSON.stringify(updatedQuestions))

    setQuestions(updatedQuestions)

    setIsUserEditingQuestion(false)
    setQuestionBeingEdited({} as IQuestionsProps)
  }
  
  return (
    <Styles.Container>
      <Styles.Content>
        <form onSubmit={handleSubmit(handleCreateQuestion)}>
          <h1>Adicione suas perguntas aqui</h1>

          <div className="input-wrapper">
            <Input
              register={register}
              name='question' 
              label='Digite sua pergunta aqui'
            />

            <Button title='Adicionar' type='submit' />
          </div>
        </form>

        <Styles.Questions>
          <h2>Perguntas já registradas:</h2>

          {questions.length === 0 && (
            <p>Ops, parece que não existem perguntas cadastradas :(</p>
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
                />
              ) : (
                <p>{question.question}</p>
              )}

              <div className="actions">
                {isUserEditingQuestion && (isUserEditingQuestion && questionBeingEdited.id === question.id) ? (
                    <div
                    role='button'
                    className="action success"
                    onClick={() => handleSaveQuestion(question.id)}
                  >
                    <FiCheck size={18} />
                  </div>
                ) : (
                  <>
                    <div
                      role='button'
                      className="action"
                      onClick={() => handleEditQuestion(question)}
                    >
                      <FiEdit2 size={18} />
                    </div>
                    <div
                      role='button'
                      className="action delete"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <FiTrash size={18} />
                    </div>
                  </>
                )}
              </div>
            </Styles.Question>
          ))}
        </Styles.Questions>
      </Styles.Content>

    </Styles.Container>
  );
};

export default EditQuestions
