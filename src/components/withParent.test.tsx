import React, {ReactNode} from 'react';
import {render, within} from '@testing-library/react-native';
import withParent from './withParent';
import {Text, View} from 'react-native';

const TEST_ID_COMPONENT_A = 'component-a';
const ComponentA = ({children}: {children: ReactNode}) => (
  <View testID={TEST_ID_COMPONENT_A}>{children}</View>
);

const TEST_ID_COMPONENT_B = 'component-b';
const ComponentB = () => (
  <Text testID={TEST_ID_COMPONENT_B}>Just a dummy component</Text>
);

describe('withParent | function | unit test', () => {
  it('should render a component inside another according with argument order', () => {
    const Component = withParent(ComponentA)(ComponentB);

    const {getByTestId, toJSON} = render(<Component />);

    expect(
      within(getByTestId(TEST_ID_COMPONENT_A)).getByTestId(TEST_ID_COMPONENT_B),
    ).not.toBeNull();

    expect(toJSON()).toMatchSnapshot();
  });
});
