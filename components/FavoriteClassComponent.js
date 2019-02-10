import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreator';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        onlineClasses: state.onlineClasses,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (onlineClassId) => dispatch(deleteFavorite(onlineClassId))
})


class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite onlineClass ' + item.name + '?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false }
                        );

                    }
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation="fadeInRightBig" duration={2000}>
                        <ListItem
                            key={index}
                            title={item.name}
                            subtitle={item.description}
                            hideChevron={true}
                            onPress={() => navigate('onlineClassdetail', { onlineClassId: item.id })}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}
                        />
                    </Animatable.View>
                </Swipeout>
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
                    <Text>{this.props.onlineClasses.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <FlatList
                    data={this.props.onlineClasses.onlineClasses.filter(onlineClass => this.props.favorites.some(el => el === onlineClass.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);