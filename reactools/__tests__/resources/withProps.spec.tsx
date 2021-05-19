import { render } from '@testing-library/react';

import { withProps } from '@/resources/withProps';

interface ComponentMockType extends jest.Mock {
  displayName?: string;
}

const ComponentMock: ComponentMockType = jest.fn(() => null);

const getLastComponentMockCall = (): unknown =>
  (ComponentMock.mock.calls.slice(-1)[0] as any[])[0];

describe('withProps', () => {
  beforeEach(() => {
    ComponentMock.mockClear();
    ComponentMock.displayName = undefined;
  });

  it('should receive default defined props', () => {
    ComponentMock.displayName = 'ComponentMock';

    const ComponentWithProps = withProps({ title: 'Title' })(ComponentMock);

    expect(ComponentWithProps.displayName).toBe('ComponentMock');
    expect(ComponentMock).not.toHaveBeenCalled();

    render(<ComponentWithProps />);

    expect(ComponentMock).toHaveBeenCalledTimes(1);
    expect(ComponentMock).toReturnWith(null);

    expect(getLastComponentMockCall()).toEqual({
      title: 'Title',
    });
  });

  it('should receive dynamically inserted props', () => {
    const ComponentWithProps = withProps({ number: 2, title: 'Title' })(
      ComponentMock,
    );

    render(<ComponentWithProps />);

    expect(getLastComponentMockCall()).toEqual({
      number: 2,
      title: 'Title',
    });

    render(<ComponentWithProps number={3} />);

    expect(getLastComponentMockCall()).toMatchObject({
      number: 3,
    });

    render(<ComponentWithProps title="Title 2" />);

    expect(getLastComponentMockCall()).toMatchObject({
      title: 'Title 2',
    });

    render(<ComponentWithProps title="Spider Man" number={18} />);

    expect(getLastComponentMockCall()).toEqual({
      number: 18,
      title: 'Spider Man',
    });
  });
});
