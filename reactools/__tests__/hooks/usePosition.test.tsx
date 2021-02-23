import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { usePosition, UsePositionRect } from '@/hooks/usePosition';

import { cleanRenderAfterEach } from '../_utils/cleanRenderAfterEach';

describe('usePosition', () => {
  cleanRenderAfterEach();

  it('should receive a valid position', () => {
    const { result: position } = renderHook(() =>
      usePosition<HTMLDivElement>(),
    );

    render(<section ref={position.current.ref}>Content</section>);

    expect(position.current).toEqual(
      expect.objectContaining<UsePositionRect>({
        y: expect.any(Number),
        x: expect.any(Number),
        width: expect.any(Number),
        height: expect.any(Number),
        top: expect.any(Number),
        left: expect.any(Number),
        right: expect.any(Number),
        bottom: expect.any(Number),
      }),
    );
  });
});
