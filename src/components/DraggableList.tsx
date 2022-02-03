import React, {useRef, useState} from 'react';
import {Animated, FlatList, PanResponder, View} from 'react-native';
import ProductItem from './ProductItem';
import Product from '../models/Product';
import styled from 'styled-components';

const initialValue: Product[] = Array.from(Array(200), (_, i) => ({
  id: i,
  name: `Product ${i}`,
  quantity: i % 2,
  value: (i % 2) * 10,
}));

const Placeholder = styled(Animated.View)`
  position: absolute;
  backgroundcolor: 'white';
  zindex: 2;
`;

function DraggableList() {
  const [listData] = useState(initialValue);

  const placeholderPosition = useRef(new Animated.ValueXY());

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (_, __) => true,
      onStartShouldSetPanResponderCapture: (_, __) => true,
      onMoveShouldSetPanResponder: (_, __) => true,
      onMoveShouldSetPanResponderCapture: (_, __) => true,

      onPanResponderGrant: (_, __) => {},
      onPanResponderMove: (_, gestureState) => {
        Animated.event([{y: placeholderPosition.current.y}], {
          useNativeDriver: false,
        })({
          y: gestureState.moveY,
        });
        console.log(gestureState.moveY);
      },
      onPanResponderTerminationRequest: (_, __) => false,
      onPanResponderRelease: (_, __) => {},
      onPanResponderTerminate: (_, __) => {},
      onShouldBlockNativeResponder: (_, __) => true,
    }),
  ).current;

  return (
    <>
      <Placeholder
        style={{
          top: placeholderPosition.current.getLayout().top,
        }}
      >
        <ProductItem name="Blablabla" value={123} quantity={2} />
      </Placeholder>
      <FlatList
        data={listData}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <View {...panResponder.panHandlers}>
            <ProductItem {...item} />
          </View>
        )}
      />
    </>
  );
}

export default DraggableList;
