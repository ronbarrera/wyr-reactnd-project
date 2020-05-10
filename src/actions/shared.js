import { getInitialData, saveQuestionAnswer} from '../utils/api'
import { receiveUsers, addAnswerToUser } from '../actions/users'
import { receiveQuestions, addUserToAnswer } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'

// Set AUTHED_ID for testing
const AUTHED_ID = 'ronaldbarrera'

export function handleInitialData () {
  return (dispatch) => {
			return getInitialData()
				.then(({ users, questions }) => {
					dispatch(receiveUsers(users))
					dispatch(receiveQuestions(questions))
					dispatch(setAuthedUser(AUTHED_ID))
				})
  }
}

export function handleSubmitAnswer (info) {
	return (dispatch) => {
		dispatch(addUserToAnswer(info))
		dispatch(addAnswerToUser(info))

		return saveQuestionAnswer(info)
			.catch((e) => {
				console.warn('Error in handleSubmitAnswer: ', e)
				alert('There was an error submitting the answer. Try again.')
			})
	}
}