import React from 'react';
import {Image, Text, View} from "react-native";
import tinyColor from "tinycolor2";
import {useTheme} from "@react-navigation/native";

export type TransactionType = {
  title: string
  sub: string
  price: number
}

const Transaction = (props: TransactionType) => {
  const {sub, title, price} = props
  const {colors} = useTheme()
  return (
    <View className='flex flex-row gap-2 rounded-2xl border p-2' style={{borderColor: colors.border}}>
      <Image source={require('@/assets/images/partial-react-logo.png')} className='w-8 h-8 rounded-full'/>
      <View>
        <Text style={{color: colors.text}} className='text-md font-bold'>{title}</Text>
        <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-sm'>{sub}</Text>
      </View>
      <Text style={{color: colors.text}} className='flex-1 text-right'>{price < 0 && '-'}${price}</Text>
    </View>
  );
};

export default Transaction;