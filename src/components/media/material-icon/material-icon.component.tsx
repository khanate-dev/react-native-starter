/* eslint-disable no-restricted-imports */
import Icon from '@expo/vector-icons/MaterialIcons';

import type map from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json';

export type MaterialIconName = keyof typeof map;

export const MaterialIcon = Icon;
