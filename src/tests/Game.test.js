import React from 'react';
import { getByTestId, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockResponse = {
    response_code:0,
    results:[
        { category:"Geography",type:"multiple",difficulty:"medium",question:"Which of the following countries is within the Eurozone but outside of the Schengen Area?",correct_answer:"Cyprus",incorrect_answers:["Malta","Greece","Portugal"]},
        { category:"History",type:"multiple",difficulty:"hard",question:"List the following Iranic empires in chronological order:",correct_answer:"Median, Achaemenid, Parthian, Sassanid",incorrect_answers:["Median, Achaemenid, Sassanid, Parthian","Achaemenid, Median, Parthian, Sassanid","Achaemenid, Median, Sassanid, Parthian"]},
        { category:"Politics",type:"multiple",difficulty:"easy",question:"Who was elected leader of the UK Labour Party in September 2015?",correct_answer:"Jeremy Corbyn",incorrect_answers:["Ed Miliband","David Cameron","Theresa May"]},
        { category:"Geography",type:"multiple",difficulty:"medium",question:"What is the fifth largest country by area?",correct_answer:"Brazil",incorrect_answers:["United States","Australia","India"]},
        { category:"Entertainment: Video Games",type:"multiple",difficulty:"medium",question:"Which of the following Terran units from the RTS game Starcraft was first introduced in the expansion Brood War?",correct_answer:"Medic",incorrect_answers:["Wraith","Science Vessel","SCV"]}
    ]
}
const errorResponse = {
    response_code:3,
};

describe('Testa a página do jogo e..', () => {
    let history;
    let store;
    beforeEach(() => {
        jest.spyOn(global, 'fetch')
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse)
        })
        const propriedades = renderWithRouterAndRedux(<App />);
        history = propriedades.history;
        store = propriedades.store;
        const nameInput = screen.getByTestId('input-player-name');
        const playButton = screen.getByRole("button", { name: 'Play'});
        userEvent.type(nameInput, 'Raphael');
        const emailInput = screen.getByTestId('input-gravatar-email');
        userEvent.type(emailInput, 'raphael-ba@hotmail.com');
        userEvent.click(playButton);
    })
    test('Verifica se com o código de response errado, retorna a tela inicial', async () => {
        jest.spyOn(global, 'fetch')
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(errorResponse)
        })
        await waitFor(() => {
            expect(history.location.pathname).toBe('/')
        })
    })
    test('Verifica se estamos na página do jogo e é possível jogar.', async () => {
        const algumaCoisa = await screen.findByTestId('question-category');
        expect(algumaCoisa).toBeInTheDocument();
    })
    test('Verifica se ao escolher uma resposta errada, o botão de next aparece.', async () => {
        const wrongAnswer1 = await screen.findByTestId('wrong-answer-0');
        userEvent.click(wrongAnswer1);
        const nextButton = await screen.findByTestId('btn-next');
        expect(nextButton).toBeInTheDocument();
    })
    test('Verifica se ao clicar na opção correta, o score é atualizado corretamente.', async () => {
        const correctAnswer = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer);
        const score = await screen.findByTestId('header-score');
        expect(score).toHaveTextContent('70');
    })
    test('Verifica se após clicar na resposta e no botão de next, a próxima pergunta é exibida, até chegar a última e o score atualiza corretamente para as perguntas hard e easy e no fim, vai para a página de feedbacks', async () => {
        const correctAnswer = await screen.findByTestId('correct-answer');
        const currentQuestionIndex = screen.getByTestId('current-question')
        expect(currentQuestionIndex).toHaveTextContent('1');
        userEvent.click(correctAnswer);
        const nextButton = await screen.findByTestId('btn-next');
        userEvent.click(nextButton);

        const actualQuestion = await screen.findByTestId('question-text');
        expect(currentQuestionIndex).toHaveTextContent('2');
        expect(actualQuestion).toHaveTextContent('List the following Iranic empires in chronological order:')
        const correctAnswer2 = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer2);
        const score = await screen.findByTestId('header-score');
        expect(score).toHaveTextContent('170');
        const nextButton2 = await screen.findByTestId('btn-next');
        userEvent.click(nextButton2);
        const actualQuestion2 = await screen.findByTestId('question-text');
        expect(actualQuestion2).toHaveTextContent('Who was elected leader of the UK Labour Party in September 2015?')
        const correctAnswer3 = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer3);
        const score2 = await screen.findByTestId('header-score');
        expect(score2).toHaveTextContent('210');
        const nextButton3 = await screen.findByTestId('btn-next');
        userEvent.click(nextButton3);
        const actualQuestion3 = await screen.findByTestId('question-text');
        expect(actualQuestion3).toHaveTextContent('What is the fifth largest country by area?');
        const correctAnswer4 = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer4);
        const nextButton4 = await screen.findByTestId('btn-next');
        userEvent.click(nextButton4);
        const correctAnswer5 = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer5);
        const nextButton5 = await screen.findByTestId('btn-next');
        userEvent.click(nextButton5);
        const feedbackText = await screen.findByTestId('feedback-text');
        expect(feedbackText).toBeInTheDocument();
    })
    test('Verifica se o timer está contando apropriadamente', async () => {
        await waitFor(() => {
            screen.getByTestId('correct-answer');
            expect()
        });
        const timer = screen.getByTestId('timer')
        expect(timer).toHaveTextContent('30');
        await waitFor(() => {
            expect(timer).toHaveTextContent('29')
        }, { timeout: 10000 })
    })
    test('Verifica se quando o tempo acaba, os botões são disabilitados ', async () => {
        const THIRTY_SECONDS = 35000;
        await waitFor(() => {
            screen.getByTestId('correct-answer');
        }, { timeout: 10000 })
        const currentScore = screen.getByTestId('header-score');
        expect(currentScore).toHaveTextContent('0');
        const timer = screen.getByTestId('timer')
        expect(timer).toBeInTheDocument()
        await waitFor(() => {
            expect(timer.textContent).toBe('0'); 
        }, { timeout: THIRTY_SECONDS})
        const button = screen.getByTestId('correct-answer')
        expect(button).toBeInTheDocument()
        await waitFor(() => {
            expect(button).toBeDisabled()
        }, { timeout: 10000})
        expect(currentScore).toHaveTextContent('0')
    }, 60000)
})
