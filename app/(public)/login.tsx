import React, {useState} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Resolver, useForm} from "react-hook-form";
import Input from "@/components/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {router, useRouter} from "expo-router";
import {tokenCache} from "@/libs/storage";
import {useSession} from "@/hooks/useSession";
import {useSignUp} from "@clerk/clerk-expo";
import {SignUpCreateParams} from "@clerk/types";

type Account = {
  email: string
  password?: string
  confirmPassword?: string
  code?: string
}

type FormType = 'SIGN_IN' | 'SIGN_UP' | 'FORGOT_PASSWORD' | 'VERIFY_EMAIL'

const LoginScreen = () => {

  const [typeForm, setTypeForm] = useState<FormType>('SIGN_IN')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = React.useState('')
  const router = useRouter()
  const {signIn} = useSession()
  const { isLoaded, signUp, setActive } = useSignUp()


  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Must be a valid email'),
    password: yup
      .string()
      .when(([val], schema) => {
        if(typeForm === 'SIGN_UP' || typeForm === 'SIGN_IN') {
          return schema.required('Password is required')
            .min(6, 'Password must be at least 6 characters')
        }
        return schema
      }),
    confirmPassword: yup
      .string().when(([val], schema) => {
        if(typeForm === 'SIGN_UP') {
          return schema.oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required')
        }
        return schema
      })
  })

  const onSignUpPress = async ({bodySignUp}: {bodySignUp: SignUpCreateParams}) => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create(bodySignUp)

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
      setTypeForm('VERIFY_EMAIL')
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async (code: string) => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onSubmit = async (data: Account) => {
    // Handle login logic here
    console.log('data', data)
    // await signIn(data.email)
    switch (typeForm) {
      case "SIGN_UP":
        const payloadSignUp: SignUpCreateParams = {
          emailAddress: data.email,
          password: data.password,
        }
        onSignUpPress({bodySignUp: payloadSignUp})
        break;
      case "VERIFY_EMAIL":
        onPressVerify(code)
      default:
        return
    }
    router.push('/(home)/')
  };

  const {control, setValue, reset,formState: {errors, }, handleSubmit} = useForm<Account>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
    }
  })

  const contextForm = (typeForm: FormType) => {
    switch (typeForm) {
      case "SIGN_IN":
        return {
          title: 'Login',
          button: 'Login'
        }
      case "SIGN_UP":
        return {
          title: 'Register',
          button: 'Sign up'
        }
      case "FORGOT_PASSWORD":
        return {
          title: 'Reset Password',
          button: 'Reset'
        }
      case "VERIFY_EMAIL":
        return {
          title: 'Verify Email',
          button: 'verify'
        }
    }
  }

  const onChangeTypeForm = (key: FormType) => {
    setTypeForm(key)
    reset()
  }

  return (
    <SafeAreaView>
      <View className={'flex'} style={styles.container}>
        {(errors.email || errors.password) && (
          <View style={styles.notification}>
            <Text style={styles.textNotification}>{errors.email?.message || errors.password?.message}</Text>
          </View>
          )}
        <Text style={styles.title}>{contextForm(typeForm).title}</Text>

        <Input
          control={control}
          name='email'
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          // message={errors.email?.message}
          onChangeText={(text)=>{
            setValue("email",text,{shouldValidate: false})
          }}
        />

        {(typeForm === 'SIGN_UP' || typeForm === 'SIGN_IN') && (
          <Input
            control={control}
            name={'password'}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#aaa"
            // message={errors.password?.message}
            onChangeText={(text)=>{
              setValue("password",text,{shouldValidate: false})
            }}
          />
        )}

        {typeForm === 'SIGN_UP' && (
          <Input
            control={control}
            name={'confirmPassword'}
            placeholder="Confirm Password"
            secureTextEntry
            placeholderTextColor="#aaa"
            // message={errors.password?.message}
            onChangeText={(text)=>{
              setValue("confirmPassword",text,{shouldValidate: false})
            }}
          />
        )}

        {typeForm === 'VERIFY_EMAIL' && (
          <Input
            control={control}
            name={'code'}
            placeholder="Code"
            secureTextEntry
            placeholderTextColor="#aaa"
            // message={errors.password?.message}
            onChangeText={(text)=>{
              setValue("code",text,{shouldValidate: false})
            }}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{contextForm(typeForm).button}</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          {typeForm === 'SIGN_IN' && (
            <>
              <Text style={styles.link} onPress={() => {onChangeTypeForm('FORGOT_PASSWORD')}}>
                Forgot Password?
              </Text>
              <Text style={styles.link} onPress={() => {onChangeTypeForm("SIGN_UP")}}>
                Don't have an account? Sign up
              </Text>
            </>
          )}
          {typeForm === 'SIGN_UP' && (
            <Text style={styles.link} onPress={() => {onChangeTypeForm("SIGN_IN")}}>
              Have an account? Sign in
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    marginTop: 10,
    color: '#4CAF50',
    fontSize: 16,
  },
  notification: {
    padding: 16,
    marginVertical: 20,
    alignItems: 'flex-start',
    backgroundColor: '#ffe9e4',
    borderColor: 'red',
    borderWidth: 0.2
  },
  textNotification: {
    color: 'gray'
  }
})

export default LoginScreen;