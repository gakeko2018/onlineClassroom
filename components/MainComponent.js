import React, { Component } from 'react';
import Home from './WelcomeComponent';
import Menu from './MenuComponent';
import onlineClassdetail from './onlineClassdetailComponent';
import { Icon } from 'react-native-elements';
import ContactComponent from './ContactComponent';
import About from './AboutComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet, NetInfo, ToastAndroid, Alert } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchonlineClasses, fetchComments, fetchPromos, fetchteachers } from '../redux/ActionCreator';
import Reservation from './MeetingComponent';
import Favorites from './FavoriteClassComponent';
import Login from './RegisterComponent';

const mapStateToProps = state => {
  return {
    onlineClasses: state.onlineClasses,
    comments: state.comments,
    promotions: state.promotions,
    teachers: state.teachers
  }
}
const mapDispatchToProps = dispatch => ({
  fetchonlineClasses: () => dispatch(fetchonlineClasses()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchteachers: () => dispatch(fetchteachers()),
})


const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }}
        onPress={() => navigation.toggleDrawer()} />
    })
  })

const LoginNavigator = createStackNavigator({
  Login: Login
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      title: 'Register',
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }}
        onPress={() => navigation.toggleDrawer()} />
    })
  });

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }}
        onPress={() => navigation.toggleDrawer()} />
    })
  })
const MenuNavigator = createStackNavigator({
  Menu: {
    screen: Menu,

    navigationOptions: ({ navigation }) => ({

      headerLeft: <Icon name="menu" size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />

    })
  },
  onlineClassdetail: { screen: onlineClassdetail }
},
  {
    initialRouteName: 'Menu',
    navigationOptions:
    {
      headerStyle: {
        backgroundColor: "blue"
      },
      headerTintColor: 'yellow',
      headerTitleStyle: {
        color: "pink"
      }
    }

  }
);

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,

    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "green"
      },
      headerTitleStyle: {
        color: "blue"
      },
      headerTintColor: "black",
      headerLeft: <Icon name="menu" size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  }
}
);

const ContactNavigator = createStackNavigator({
  Contact: ContactComponent
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "purple"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintColor: "blue",
      headerLeft: <Icon name="menu" size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  });

const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "purple"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintColor: "blue",
      headerLeft: <Icon name="menu" size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  });


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);



const MainNavigator = createDrawerNavigator({
  Login:
  {
    screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='sign-in'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Home:
  {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='home'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      ),
    }
  },
  Menu:
  {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='list'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      ),
    },
  },
  Favorites:
  {
    screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLabel: 'My Favorites',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='heart'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Reservation:
  {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='cutlery'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },

  Contact:
  {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='address-card'
          type='font-awesome'
          size={22}
          color={tintColor}
        />
      ),
    },
  },

  About:
  {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='info-circle'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      ),
    },
  }
},
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent

  });


class Main extends Component {

  componentDidMount() {
    this.props.fetchonlineClasses();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchteachers();

    NetInfo.getConnectionInfo()
      .then((connectionInfo) => {
        ToastAndroid.show('Initial Network Connectivity Type: '
          + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
          ToastAndroid.LONG)
      });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        Alert.alert('You are now offline!');
        //ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        Alert.alert('You are now connected to WiFi!');
        //ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }
  render() {

    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);