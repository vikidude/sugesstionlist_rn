import React from 'react';
import AppNavigator from './AppNavigator.js';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
    }
  }
  componentDidMount() {
    // SplashScreen.hide();
    // NetInfo.fetch().then(state => {
    //   if (state.isConnected) {
    //     this.setState({ online: true });
    //   } else {
    //     this.setState({ online: false });
    //   }
    // });
    // NetInfo.addEventListener(this.handleConnectivityChange);
  }

  // componentWillUnmount() {
  //   NetInfo.removeEventListener(this.handleConnectivityChange);
  // }

  // handleConnectivityChange = state => {
  //   if (state.isConnected) {
  //     this.setState({ online: true });
  //   } else {
  //     this.setState({ online: false });
  //   }
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
       
          <AppNavigator />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  TextStyle: {
    fontSize: 20,
    textAlign: 'center',
  }
});

export default App;