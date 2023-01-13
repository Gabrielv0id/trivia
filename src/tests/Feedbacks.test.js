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

    test('Verifica se após clicar na resposta e no botão de next, a próxima pergunta é exibida, até chegar a última e o score atualiza corretamente para as perguntas hard e easy e no fim, vai para a página de feedbacks', async () => {
          
      const clickOnAwnserAndNext = async () => {
        const correctAnswer = await screen.findByTestId('wrong-answer-0');
        userEvent.click(correctAnswer);
        
        const nextButton = await screen.findByTestId('btn-next');
        userEvent.click(nextButton);
      };

      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()

      const feedbackText = await screen.findByTestId('feedback-text');
      expect(feedbackText).toBeInTheDocument();
      const score = screen.getByTestId('feedback-total-score')
      expect(score).toHaveTextContent('0')
      const assertions = screen.getByTestId('feedback-total-question')
      expect(assertions).toHaveTextContent('0')

      const buttonPlayAgain = screen.getByTestId('btn-play-again')
      userEvent.click(buttonPlayAgain);

      await waitFor(() => {
        const nameInput = screen.getByTestId('input-player-name');
        expect(nameInput).toBeInTheDocument();
      }, { timeout: 10000 })
  }, 1000)
    test('Verifica se após clicar na resposta e no botão de next, a próxima pergunta é exibida, até chegar a última e o score atualiza corretamente para as perguntas hard e easy e no fim, vai para a página de feedbacks', async () => {
          
      const clickOnAwnserAndNext = async () => {
        const correctAnswer = await screen.findByTestId('wrong-answer-0');
        userEvent.click(correctAnswer);
        
        const nextButton = await screen.findByTestId('btn-next');
        userEvent.click(nextButton);
      };

      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()
      await clickOnAwnserAndNext()

      const feedbackText = await screen.findByTestId('feedback-text');
      expect(feedbackText).toBeInTheDocument();

      const buttonPlayAgain = screen.getByTestId('btn-ranking')
      userEvent.click(buttonPlayAgain);

      await waitFor(() => {
        const rankTitle = screen.getByTestId('ranking-title');
        expect(rankTitle).toBeInTheDocument();
      }, { timeout: 10000 })
  }, 1000)

});