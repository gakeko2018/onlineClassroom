import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreator';
import * as Animatable from 'react-native-animatable';



const mapDispatchToProps = (dispatch) => ({
    postFavorite: (onlineClassId) => dispatch(postFavorite(onlineClassId)),
    postComment: (onlineClassId, rating, author, comment) => dispatch(postComment(onlineClassId, rating, author, comment))
});

const mapStateToProps = (state) => {
    return {
        onlineClasses: state.onlineClasses,
        comments: state.comments,
        favorites: state.favorites
    }
}

function RenderonlineClass(props) {

    const onlineClass = props.onlineClass;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200)
            return true;
        else
            return false;
    }

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else
            return false;
    }

    handleViewRef = ref => this.view = ref;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + onlineClass.name + ' to favorite?',
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress() } },
                    ],
                    { cancelable: false }
                );
            if (recognizeComment(gestureState)) props.onPress2();


            return true;
        }
    })

    const shareonlineClass = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
                dialogTitle: 'Share ' + title
            })
    }

    if (onlineClass != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}
            >
                <Card featuredTitle={onlineClass.name}
                    image={{ uri: baseUrl + onlineClass.image }}>
                    <Text style={{ margin: 10 }}>
                        {onlineClass.description}
                    </Text>

                    <View style={styles.viewRow}>

                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />

                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='purple'
                            onPress={() => props.onPress2()}
                        />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareonlineClass(onlineClass.name, onlineClass.description, baseUrl + onlineClass.image)} />
                    </View>
                </Card >
            </Animatable.View >
        )
    }
    else {
        return (<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class onlineClassdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 1,
            author: "",
            comment: '',
            showModal: false
        }
    }
    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(onlineClassId) {
        this.props.postComment(onlineClassId, this.state.rating, this.state.author, this.state.comment);
    }
    resetForm() {
        this.setState({
            rating: 1,
            author: "",
            comment: '',
            showModal: false
        });
    }

    markFavorite(onlineClassId) {
        this.props.postFavorite(onlineClassId);
    }


    static navigationOptions = {
        title: 'onlineClass Details'
    };

    render() {
        const onlineClassId = this.props.navigation.getParam('onlineClassId', '');
        return (
            <ScrollView>
                <RenderonlineClass onlineClass={this.props.onlineClasses.onlineClasses[+onlineClassId]}
                    favorite={this.props.favorites.some(el => el === onlineClassId)}
                    onPress={() => this.markFavorite(onlineClassId)}
                    onPress2={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.onlineClassId === onlineClassId)} />
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            defaultRating={5}
                            onFinishRating={rating => this.setState({ rating })}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={(author) => this.setState({ author })}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={(comment) => this.setState({ comment })}

                        />
                        <Button
                            style={{ marginTop: 10 }}
                            onPress={() => { this.toggleModal(); this.handleComment(onlineClassId); }}
                            color="purple"
                            title="SUBMIT"
                        />
                        <Button
                            style={{ marginTop: 10 }}

                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color="gray"
                            title="CANCEL"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    viewRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    item: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalRating: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(onlineClassdetail);