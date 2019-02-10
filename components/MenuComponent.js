import React, { Component } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        onlineClasses: state.onlineClasses
    }
}

class Menu extends Component {


    static navigationOptions = {
        title: 'Menu'
    };
    /*                 <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('onlineClassdetail', { onlineClassId: item.id })}
                        leftAvatar={{ source: require('./images/uthappizza.png') }}
                    /> */
    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            return (

                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('onlineClassdetail', { onlineClassId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </Animatable.View>
            );
        };

        if (this.props.onlineClasses.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.onlineClasses.errMess) {
            return (
                <View>
                    <Text>{props.onlineClasses.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <View>
                    <FlatList
                        data={this.props.onlineClasses.onlineClasses}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                    <Button
                        onPress={() => {
                            navigate("onlineClassdetail", { onlineClassId: 1 });
                        }}
                        title="Show Chef's Special."
                    />
                </View>
            )
        }

    }
}

export default connect(mapStateToProps)(Menu);