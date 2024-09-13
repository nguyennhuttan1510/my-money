import React from 'react';
import {StyleProp, StyleSheet, Text, TextInput, TextInputBase, TextInputProps, View} from "react-native";
import {Control, FieldError, FieldErrors, FieldValues, Path, useController} from "react-hook-form";

interface InputType<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>
  stylesProps?: {
    root: StyleProp<any>
  },
  message?: string | React.ReactNode
}

function Input<T extends FieldValues> (props: InputType<T>) {
  const {control, name, stylesProps, message, ...rest} = props
  const {field} = useController<T>({
    control,
    name
  })
  return (
    <View style={styles.wrap}>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        style={[styles.root, stylesProps?.root]}
        {...rest}
      />
      {message && (
        <Text style={styles.error}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  wrap: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginHorizontal: 16,
  }
})

export default Input;