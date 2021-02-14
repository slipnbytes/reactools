import { render, cleanup, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React, { useState } from 'react';
import { act } from 'react-test-renderer';

import { useOutClick } from '@/hooks/useOutClick';

import { Button } from '../components/Button';

describe('useOutClick', () => {
  afterEach(() => {
    cleanup();
  });

  it('should receive true value because the click was outside the element heard', () => {
    const { result: state } = renderHook(() => useState(false));
    const { result: outClick } = renderHook(() =>
      useOutClick<HTMLButtonElement>(),
    );

    const { container } = render(
      <div>
        <Button ref={outClick.current.ref} />

        <section id="content">Content</section>
      </div>,
    );

    act(() => {
      outClick.current.addListener(() => {
        state.current[1](true);
      });

      fireEvent.click(container.querySelector('#content') as Node);
    });

    expect(state.current[0]).toBe(true);
  });

  it('should receive false value because the click was on the element heard', () => {
    const { result: state } = renderHook(() => useState(false));
    const { result: outClick } = renderHook(() =>
      useOutClick<HTMLButtonElement>(),
    );

    const { container } = render(
      <div>
        <Button id="button" ref={outClick.current.ref} />

        <section id="content">Content</section>
      </div>,
    );

    act(() => {
      outClick.current.addListener(() => {
        state.current[1](true);
      });

      fireEvent.click(container.querySelector('#button') as Node);
    });

    expect(state.current[0]).toBe(false);
  });

  it('should receive false value because the reference has not been implemented', () => {
    const { result: state } = renderHook(() => useState(false));
    const { result: outClick } = renderHook(() =>
      useOutClick<HTMLButtonElement>(),
    );

    const { container } = render(
      <div>
        <Button />

        <section id="content">Content</section>
      </div>,
    );

    act(() => {
      outClick.current.addListener(() => {
        state.current[1](true);
      });

      fireEvent.click(container.querySelector('#content') as Node);
    });

    expect(state.current[0]).toBe(false);
  });
});
