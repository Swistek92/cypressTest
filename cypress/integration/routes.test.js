/* eslint-disable prettier/prettier */

import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand';
import { generateRandomId } from '../../lib/features/reservations/utils';

it('display correct heading when navigating to shows routes', () => {
  cy.visit('/');
  cy.findByRole('button', { name: /shows/i }).click();
  cy.findByRole('heading', { name: /upcoming shows/i }).should('exist');
});

it('display correct heading when navigating to bands routes', () => {
  cy.visit('/');
  cy.findByRole('button', { name: /bands/i }).click();
  cy.findByRole('heading', { name: /Our Illustrious Performers/i }).should(
    'exist'
  );
});

it('displays correct brand name for brand route that existed at build time', () => {
  cy.task('db:reset').visit('/bands/1');

  cy.findByRole('heading', {
    name: /Shamrock Pete/i,
  }).should('exist');
});

it('throw a error for an unkown band id ', () => {
  cy.task('db:reset').visit('/bands/1234');

  cy.findByRole('heading', {
    name: /Could not retrieve band data: Error: band not found/i,
  }).should('exist');
});

it('displays name for band that was not present at build time', () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  cy.task('db:reset').task('addBand', newBand).visit(`/bands/${bandId}`);
  cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should('exist');
});
