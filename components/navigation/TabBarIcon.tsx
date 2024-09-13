// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({size=28, style, typeIcon,...rest }: IconProps<ComponentProps<typeof Ionicons>['name'] | ComponentProps<typeof MaterialIcons>['name']> & {typeIcon: 'ion' | 'material'}) {
  switch (typeIcon) {
    case "ion":
      return <Ionicons size={size} style={[{ marginBottom: -3 }, style]} {...rest} />
    case "material":
      return <MaterialIcons size={size} style={[{ marginBottom: -3 }, style]} {...rest} />
  }
}
