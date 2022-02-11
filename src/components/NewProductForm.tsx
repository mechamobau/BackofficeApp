import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import Product from '../models/Product';

type InputProps = TextInputProps & {
  label: string;
};

function Input({label, ...inputProps}: InputProps) {
  const {theme} = useTheme();

  return (
    <>
      <Text style={[styles.label, {color: theme.textColor}]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          inputProps.style,
          {borderColor: theme.buttonBorderColor, color: theme.textColor},
        ]}
        {...inputProps}
      />
    </>
  );
}

type Props = {
  onSubmit?: (values: Omit<Product, 'id'>) => void;
};

function NewProductForm({onSubmit}: Props) {
  const {theme} = useTheme();

  const [nameField, setNameField] = useState('');
  const [quantityField, setQuantityField] = useState('');
  const [valueField, setValueField] = useState('');

  const handleSubmit = () => {
    const quantity = Number(quantityField);

    if (Number.isNaN(quantity)) {
      Alert.alert(
        'Erro no formulário',
        'A quantidade deve conter um número inteiro',
      );
      return;
    }

    if (quantity <= 0) {
      Alert.alert('Erro no formulário', 'A quantidade deve ser maior que 0');
      return;
    }

    const value = Number(valueField);
    if (Number.isNaN(value)) {
      Alert.alert(
        'Erro no formulário',
        'O valor unitário deve conter um número',
      );
      return;
    }

    if (value < 0) {
      Alert.alert(
        'Erro no formulário',
        'O valor unitário deve ser maior ou igual a 0',
      );
      return;
    }

    onSubmit?.({
      name: nameField,
      quantity,
      value,
    });

    reset();
  };

  const reset = () => {
    setNameField('');
    setQuantityField('');
    setValueField('');
  };

  return (
    <View>
      <Input
        label="Nome do produto"
        value={nameField}
        onChangeText={textInputValue => {
          setNameField(textInputValue);
        }}
      />
      <Input
        label="Quantidade em estoque"
        keyboardType="number-pad"
        value={quantityField}
        onChangeText={setQuantityField}
      />
      <Input
        label="Valor unitário"
        keyboardType="numeric"
        value={valueField}
        onChangeText={setValueField}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitButton, {backgroundColor: theme.primaryColor}]}
      >
        <Text style={[styles.submitButtonText, {color: theme.textColor}]}>
          Cadastrar produto
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  submitButton: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewProductForm;
