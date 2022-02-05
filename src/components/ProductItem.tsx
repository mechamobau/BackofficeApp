import React from 'react';
import styled from 'styled-components/native';
import Product from '../models/Product';

const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 6px;
  color: ${props => props.theme.textColor};
`;

const Value = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.textColor};
`;

const Quantity = styled.Text`
  margin: 0 15px;
  font-size: 19px;
  color: ${props => props.theme.textColor};
`;

const MainInfoWrapper = styled.View``;

const QuantityControlWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ControlButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  border-color: ${props => props.theme.buttonBorderColor};
  border-width: 1px;
`;

const ControlButtonText = styled.Text`
  font-size: 22px;
  color: ${props => props.theme.textColor};
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  margin-bottom: 12px;
`;

type BaseProps = Pick<Product, 'name' | 'quantity' | 'value'>;

type Props = BaseProps & {
  onRemovePress?: () => void;
  onAddPress?: () => void;
};

function ProductItem(props: Props) {
  const {name, quantity, value, onRemovePress, onAddPress} = props;

  const formattedValue = value.toFixed(2);

  return (
    <Container accessible>
      <MainInfoWrapper>
        <Title>{name}</Title>
        <Value>${formattedValue}</Value>
      </MainInfoWrapper>
      <QuantityControlWrapper>
        {quantity >= 1 && (
          <ControlButton
            accessibilityRole="button"
            accessibilityLabel="Remover produto"
            onPress={onRemovePress}
          >
            <ControlButtonText>-</ControlButtonText>
          </ControlButton>
        )}
        <Quantity accessibilityLabel={`Número de produtos: ${quantity}`}>
          {quantity}
        </Quantity>
        <ControlButton
          accessibilityRole="button"
          accessibilityLabel="Adicionar produto"
          onPress={onAddPress}
        >
          <ControlButtonText>+</ControlButtonText>
        </ControlButton>
      </QuantityControlWrapper>
    </Container>
  );
}

export default ProductItem;
