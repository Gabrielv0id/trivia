import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

const TOKEN = {
    token: '123798328917897321'
}
describe('Testa a página de login e..', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch')
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(TOKEN)
        })
    })
    test('Verifica se o botão está inicialmente desabilitado', () => {
        renderWithRouterAndRedux(< App />);
        const playButton = screen.getByRole("button", { name: 'Play'});
        expect(playButton).toBeDisabled();
    })
    test('Verifica se ao preencher ambos os inputs, e apenas assim, o botão é habilitado', () => {
        renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByTestId('input-player-name');
        const playButton = screen.getByRole("button", { name: 'Play'});
        userEvent.type(nameInput, 'Raphael');
        expect(playButton).toBeDisabled();
        const emailInput = screen.getByTestId('input-gravatar-email');
        userEvent.type(emailInput, 'raphael-ba@hotmail.com');
        expect(playButton).toBeEnabled();
    })
    test('Verifica se ao clicar em Play, uma requisição a API da Trivia é feita.', () => {
        renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByTestId('input-player-name');
        const playButton = screen.getByRole("button", { name: 'Play'});
        userEvent.type(nameInput, 'Raphael');
        const emailInput = screen.getByTestId('input-gravatar-email');
        userEvent.type(emailInput, 'raphael-ba@hotmail.com');
        userEvent.click(playButton);
        expect(global.fetch).toHaveBeenCalled();
    })
    test('Verifica se ao clickar no settings é apropriadamente redirecionado', () => {
        renderWithRouterAndRedux(<App />);
        const settingsButtons = screen.getByRole('button', { name: /Setting/ });
        userEvent.click(settingsButtons);
    })
})