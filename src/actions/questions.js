import { saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_USER_TO_ANSWER= 'ADD_USER_TO_ANSWER'

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS, 
		questions,
	}
}

function addQuestion (question) {
	return {
		type: ADD_QUESTION, 
		question, 
	} 
}

export function handleAddQuestion ({ optionOne, optionTwo }) {
	return (dispatch, getState) => {
		const { authedUser } = getState()

		return saveQuestion({
			optionOneText: optionOne, 
			optionTwoText: optionTwo, 
			author: authedUser
		})
			.then((question) => dispatch(addQuestion(question)))
	}
}

export function addUserToAnswer({ authedUser, qid, answer }) {
	return {
		type: ADD_USER_TO_ANSWER, 
		authedUser, 
		qid, 
		answer
	}
}

