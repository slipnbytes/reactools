import { render, fireEvent, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import { act } from 'react-test-renderer';

import { useOutClick } from '@/hooks/useOutClick';

import { Button } from '../_components/Button';
import { cleanRenderAfterEach } from '../_utils/cleanRenderAfterEach';

describe('useOutClick', () => {
  cleanRenderAfterEach();

  it('should receive true value because the click was outside the element heard', () => {
    const { result: state } = renderHook(() => useState(false));
    const { result: outClick } = renderHook(() =>
      useOutClick<HTMLButtonElement>(),
    );

    render(
      <div>
        <Button ref={outClick.current.ref} />

        <section>Content</section>
      </div>,
    );

    act(() => {
      outClick.current.addListener(() => {
        state.current[1](true);
      });

      fireEvent.click(screen.getByText('Content'));
    });

    expect(state.current[0]).toBe(true);
  });

  it('should receive false value because the click was on the element heard', () => {
    const { result: state } = renderHook(() => useState(false));
    const { result: outClick } = renderHook(() =>
      useOutClick<HTMLButtonElement>(),
    );

    render(
      <div>
        <Button ref={outClick.current.ref} />

        <section>Content</section>
      </div>,
    );

    act(() => {
      outClick.current.addListener(() => {
        state.current[1](true);
      });

      fireEvent.click(screen.getByText('Button'));
    });

    expect(state.current[0]).toBe(false);
  });

  it('should receive false value because the reference has not been implemented', () => {
    const { result: state } = renderHook(() => useState(false));
    const { result: outClick } = renderHook(() =>
      useOutClick<HTMLButtonElement>(),
    );

    render(
      <div>
        <Button />

        <section>Content</section>
      </div>,
    );

    act(() => {
      outClick.current.addListener(() => {
        state.current[1](true);
      });

      fireEvent.click(screen.getByText('Content'));
    });

    expect(state.current[0]).toBe(false);
  });

  it('should receive false value because the added listener was removed shortly thereafter', () => {
    const { result: state } = renderHook(() => useState(false));
    const { result: outClick } = renderHook(() =>
      useOutClick<HTMLButtonElement>(),
    );

    render(
      <div>
        <Button ref={outClick.current.ref} />

        <section>Content</section>
      </div>,
    );

    act(() => {
      const listener = (): void => {
        state.current[1](true);
      };

      outClick.current.addListener(listener);
      outClick.current.removeListener(listener);

      fireEvent.click(screen.getByText('Content'));
    });

    expect(state.current[0]).toBe(false);
  });
});
