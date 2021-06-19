import { renderHook } from '@testing-library/react-hooks';

import { useManageableRef } from '@/hooks/useManageableRef';

const data = {
  user: null,
};

describe('useManageableRef', () => {
  it('should update the reference value', async () => {
    const { result: manageableRef } = renderHook(() => useManageableRef());
    const { result: manageableRef2, waitFor } = renderHook(() =>
      useManageableRef<any>('value'),
    );

    expect(manageableRef.current.current).toBe(null);
    expect(manageableRef2.current.current).toBe('value');

    await waitFor(() => {
      manageableRef2.current.current = data;
      (manageableRef2.current as any).any = data;
    });

    expect(manageableRef2.current.current).toEqual(data);
    expect((manageableRef2.current as any).any).not.toBeDefined();
  });
});
