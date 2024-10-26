import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    GigaSans_400Regular: require('@/assets/fonts/GigaSansRegular.otf'),
    GigaSans_500Medium: require('@/assets/fonts/GigaSansMedium.otf'),
    GigaSans_600SemiBold: require('@/assets/fonts/GigaSansSemiBold.otf'),
    ...FontAwesome.font,
  });

  return {
    fontsLoaded,
  };
};
