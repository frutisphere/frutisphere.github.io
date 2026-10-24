// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AppearanceProvider } from '../appearance/AppearanceContext';
import { HomePage } from './HomePage';

function LocationProbe() {
  return <div data-testid="location">{useLocation().pathname}</div>;
}

function renderHome() {
  return render(
    <AppearanceProvider>
      <MemoryRouter>
        <HomePage />
        <LocationProbe />
      </MemoryRouter>
    </AppearanceProvider>,
  );
}

describe('HomePage', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('presents the atlas, its three regions, featured content, and future community scope', () => {
    renderHome();

    expect(screen.getByRole('heading', { level: 1, name: 'A visual atlas of the Frutiger ecosystem' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Frutisphere' }).getAttribute('src')).toContain(
      '/assets/branding/frutisphere-logo.png',
    );
    expect(screen.getByRole('heading', { name: 'A visual and documentation atlas' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Selected Frutiger Aero entries' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'A future community around the atlas' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Visit Frutiger Aero atlas region' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Visit Vectordelia atlas region' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Visit More atlas region' })).toBeTruthy();
    expect(screen.queryByText('Future metric')).toBeNull();
  });

  it('separates Home from the Explore route', () => {
    renderHome();

    expect(screen.getByRole('link', { name: /^Home$/i }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /^Explore$/i }).getAttribute('href')).toBe('/explore');
    fireEvent.click(screen.getByRole('link', { name: /Open the atlas/i }));
    expect(screen.getByTestId('location').textContent).toBe('/explore');
  });
});
