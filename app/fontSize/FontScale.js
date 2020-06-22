const {width, height} = Dimensions.get('window');
import {
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
  } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SCALE = 375;
export default ScaleFont = (fontSize)=> {
    const ratio = fontSize / SCALE; // get ratio based on your standard scale
    const newSize = Math.round(ratio * width);
    return newSize;
  };