import { ReactElement, useState } from 'react';
import Input from '../components/Input/';
import { useForm } from 'react-hook-form'
import nookies from 'nookies'
import { FiTrash, FiEdit2 } from 'react-icons/fi'

import Button from '../components/Button';

import * as Styles from '../styles/Pages/Create'

interface IQuestionsProps {
  id: number
  question: string
}

const EditQuestions = (): ReactElement => {
  const [questions, setQuestions] = useState<IQuestionsProps[]>(() => {
    const { questions: questionsFromCookies } = nookies.get()

    if (questionsFromCookies) {
      return JSON.parse(questionsFromCookies)
    }

    return []
  })

  const { register, handleSubmit, getValues, reset } = useForm()

  const handleSubmitForm = () => {
    const newQuestion = getValues('question')

    const updatedQuestions = [
      ...questions,
      {
        id: questions.length + 1,
        question: newQuestion
      }
    ]
    
    nookies.set(undefined, 'questions', JSON.stringify(updatedQuestions), {
      maxAge: 60 * 60 * 24 * 7 * 10
    })

    setQuestions(updatedQuestions)

    reset()
  }

  return (
    <Styles.Container>
      <Styles.Content>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
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
            <Styles.Question key={question.id}>
              <p>{question.question}</p>

              <div className="actions">
                <div className="action">
                  <FiEdit2 size={18} />
                </div>
                <div className="action delete">
                  <FiTrash size={18} />
                </div>
              </div>
            </Styles.Question>
          ))}
        </Styles.Questions>
      </Styles.Content>

    </Styles.Container>
  );
};

export default EditQuestions
