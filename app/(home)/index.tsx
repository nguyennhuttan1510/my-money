import React from 'react';
import {Button, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import {useSession} from "@/hooks/useSession";
import {useTheme} from "@react-navigation/native";
import tinyColor from 'tinycolor2';
import Transaction from "@/app/(home)/components/Transaction";
import {useUser} from "@clerk/clerk-expo";
const HomeScreen = () => {
  const {colors} = useTheme()
  const {signOut} = useSession()
  const { user } = useUser()

  return (
    <SafeAreaView style={{flex: 1}}>
        <View className='p-2 h-fit'>
          <View className='bg-[#1d1e20] p-4 rounded-3xl mb-4'>
            <View className='flex flex-row gap-2 mb-4'>
              <Image source={require('@/assets/images/partial-react-logo.png')} className='w-10 h-10 rounded-full mb-1'/>
              <View>
                <Text style={{color: colors.text}} className='text-lg'>Nguyen Nhut Tan</Text>
                <Text style={{color: tinyColor(colors.text).darken(40).toString()}}>{user?.emailAddresses[0].emailAddress}</Text>
              </View>
            </View>

            <View className='mb-4 flex flex-row justify-between items-baseline'>
              <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-lg'>Total</Text>
              <Text style={{color: colors.text}} className='text-2xl'>$9,780.39</Text>
            </View>

            <View className='flex flex-row justify-between'>
              <Text style={{color: colors.text}} className='text-xl'>Statistics</Text>
              <View className='flex flex-row gap-2 items-center'>
                <Text style={{color: colors.text}} className='text-sm'>Budget</Text>
                <View className='flex flex-row gap-1 items-center rounded-full bg-gray-700'>
                  <Text style={{color: colors.text}} className='pl-1 pr-2 py-1'>Personal</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='bg-[#1d1e20] p-4 rounded-tl-3xl rounded-tr-3xl flex-1'>
          <View className='flex flex-row justify-between mb-4'>
            <Text style={{color: colors.text}} className='font-bold'>Transaction</Text>
            <Link href={'/'} style={{color: colors.text}} className='font-bold'>View All</Link>
          </View>

          <ScrollView>
            <View className='flex flex-col gap-y-2'>
              {/*<Transaction />*/}

              <View className='flex flex-col gap-2'>
                <Text style={{color: colors.text}}>Yesterday</Text>
                <View className='flex flex-row gap-2 rounded-2xl border p-2' style={{borderColor: colors.border}}>
                  <Image source={require('@/assets/images/partial-react-logo.png')} className='w-8 h-8 rounded-full'/>
                  <View>
                    <Text style={{color: colors.text}} className='text-md font-bold'>Food</Text>
                    <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-sm'>Dinner</Text>
                  </View>
                  <Text style={{color: colors.text}} className='flex-1 text-right'>-$39</Text>
                </View>

                <View className='flex flex-row gap-2 rounded-2xl border p-2' style={{borderColor: colors.border}}>
                  <Image source={require('@/assets/images/partial-react-logo.png')} className='w-8 h-8 rounded-full'/>
                  <View>
                    <Text style={{color: colors.text}} className='text-md font-bold'>Food</Text>
                    <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-sm'>Dinner</Text>
                  </View>
                  <Text style={{color: colors.text}} className='flex-1 text-right'>-$39</Text>
                </View>
              </View>

              <View className='flex flex-col gap-2'>
                <Text style={{color: colors.text}}>6/9</Text>
                <View className='flex flex-row gap-2 rounded-2xl border p-2' style={{borderColor: colors.border}}>
                  <Image source={require('@/assets/images/partial-react-logo.png')} className='w-8 h-8 rounded-full'/>
                  <View>
                    <Text style={{color: colors.text}} className='text-md font-bold'>Food</Text>
                    <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-sm'>Dinner</Text>
                  </View>
                  <Text style={{color: colors.text}} className='flex-1 text-right'>-$39</Text>
                </View>

                <View className='flex flex-row gap-2 rounded-2xl border p-2' style={{borderColor: colors.border}}>
                  <Image source={require('@/assets/images/partial-react-logo.png')} className='w-8 h-8 rounded-full'/>
                  <View>
                    <Text style={{color: colors.text}} className='text-md font-bold'>Food</Text>
                    <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-sm'>Dinner</Text>
                  </View>
                  <Text style={{color: colors.text}} className='flex-1 text-right'>-$39</Text>
                </View>
              </View>

              <View className='flex flex-col gap-2'>
                <Text style={{color: colors.text}}>5/9</Text>
                <View className='flex flex-row gap-2 rounded-2xl border p-2' style={{borderColor: colors.border}}>
                  <Image source={require('@/assets/images/partial-react-logo.png')} className='w-8 h-8 rounded-full'/>
                  <View>
                    <Text style={{color: colors.text}} className='text-md font-bold'>Food</Text>
                    <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-sm'>Dinner</Text>
                  </View>
                  <Text style={{color: colors.text}} className='flex-1 text-right'>-$39</Text>
                </View>

                <View className='flex flex-row gap-2 rounded-2xl border p-2' style={{borderColor: colors.border}}>
                  <Image source={require('@/assets/images/partial-react-logo.png')} className='w-8 h-8 rounded-full'/>
                  <View>
                    <Text style={{color: colors.text}} className='text-md font-bold'>Food</Text>
                    <Text style={{color: tinyColor(colors.text).darken(40).toString()}} className='text-sm'>Dinner</Text>
                  </View>
                  <Text style={{color: colors.text}} className='flex-1 text-right'>-$39</Text>
                </View>
              </View>
            </View>
          </ScrollView>

        </View>
    </SafeAreaView>
      // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //   <Text>Home Page</Text>
      //   <Button title='Throw error' onPress={() => {
      //     throw new Error('Fake error')
      //   }} />
      //   <Button title='Logout' onPress={() => {signOut()}} />
      //   <Link href={'/login'} >Login</Link>
      // </View>
  )
};

export default HomeScreen;