import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Testa a página de login e..', () => {
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
        expect(fetch).toHaveBeenCalled();
    })
})