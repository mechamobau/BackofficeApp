import React, {FunctionComponent} from 'react';
import {render, within} from '@testing-library/react-native';
import withParent from './withParent';
import {Text, View} from 'react-native';

type WithChildren<T = {}> = T & {children?: React.ReactNode};

const TEST_ID_COMPONENT_A = 'component-a';
function ParentComponent({children}: WithChildren) {
  return <View testID={TEST_ID_COMPONENT_A}>{children}</View>;
}

const TEST_ID_COMPONENT_B = 'component-b';
function ChildComponent() {
  return <Text testID={TEST_ID_COMPONENT_B}>Just a dummy component</Text>;
}

describe('withParent | function | unit test', () => {
  it('should render a component inside another according with argument order', () => {
    const Component = withParent(ParentComponent)(ChildComponent);

    const {getByTestId, toJSON} = render(<Component />);

    const componentA = getByTestId(TEST_ID_COMPONENT_A);
    const componentB = within(componentA).getByTestId(TEST_ID_COMPONENT_B);

    expect(componentA).not.toBeNull();
    expect(componentB).not.toBeNull();

    expect(toJSON()).toMatchSnapshot();
  });

  it('should change display name of component return', () => {
    const Component = withParent(ParentComponent)(
      ChildComponent,
    ) as FunctionComponent;

    const withParentWithoutDisplayName = withParent(
      ({children}: WithChildren) => (
        <View testID={TEST_ID_COMPONENT_A}>{children}</View>
      ),
    );

    const UnknownDisplayNameParentChild =
      withParentWithoutDisplayName(ChildComponent);

    expect(Component.displayName).toBe('withParent(ParentComponent)');
    expect(UnknownDisplayNameParentChild.displayName).toBe(
      'withParent(Unknown)',
    );
  });
});
