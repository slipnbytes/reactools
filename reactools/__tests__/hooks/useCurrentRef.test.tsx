import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useCurrentRef } from '@/hooks/useCurrentRef';
import { mergeRefs } from '@/resources/mergeRefs';

import { cleanRenderAfterEach } from '../_utils/cleanRenderAfterEach';
import { disableACTErrors } from '../_utils/disableACTErrors';

describe('useCurrentRef', () => {
  disableACTErrors();
  cleanRenderAfterEach();

  it('should value must always be updated', () => {
    const { result: currentRef } = renderHook(() => useCurrentRef<any>());
    const { result: currentRef2 } = renderHook(() => useCurrentRef<any>(''));

    render(
      <button
        type="button"
        ref={mergeRefs([currentRef.current[1], currentRef2.current[1]])}
      >
        Button
      </button>,
    );

    expect(currentRef.current[0]).toBeInstanceOf(HTMLButtonElement);
    expect(currentRef2.current[0]).toBeInstanceOf(HTMLButtonElement);

    act(() => {
      currentRef.current[1]('value');
      currentRef2.current[1]('value');
    });

    expect(currentRef.current[0]).toEqual('value');
    expect(currentRef2.current[0]).toEqual('value');
  });
});
