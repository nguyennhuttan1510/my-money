import {useCallback, useEffect, useState} from "react";
import {Platform} from "react-native";
import * as SecureStore from 'expo-secure-store';
import {tokenCache} from "@/libs/storage";
import {flag} from "arg";

export function useStorageState(key: string) {
  const [state, setState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      setIsLoading(true)
      SecureStore.getItemAsync(key).then(value => {
        setState(value);
      }).catch((e) => {
        console.error('get storage state failed from SecureStore', e)
      }).finally(() => {
        setIsLoading(false)
      });
    }
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setIsLoading(true)
      try {
        if(value) {
          setState(value);
          // setStorageItemAsync(key, value);
          tokenCache.saveToken(key, value)
        } else {
          setState(value);
          tokenCache.deleteToken(key)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }

    },
    [key]
  );
  return [{state, isLoading}, setValue] as const
}