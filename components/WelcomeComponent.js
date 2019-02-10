import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        onlineClasses: state.onlineClasses,
        comments: state.comments,
        promotions: state.promotions,
        teachers: state.teachers
    }
}

function RenderItem(props) {

    const item = props.item;
    if (props.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.errMess) {
        return (
            <View>
                <Text>{props.erreMess}</Text>
            </View>
        );
    }
    else {
        if (item != null) {
            return (
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{ uri: baseUrl + item.image }}>
                    <Text
                        style={{ margin: 10 }}>
                        {item.description}</Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }
    static navigationOptions = {
        title: 'Home',
    };

    componentDidMount() {
        this.animate()
    }

    animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }

    render() {
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            outputRange: [0, 30, 50, 30, 0, -20, -30, -20, 0]
        })
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [1, 2, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })

        return (
            <View >
                <Animated.View style={{ transform: [{ translateX: xpos1 }] }}>
                    <RenderItem item={this.props.onlineClasses.onlineClasses.filter((onlineClass) => onlineClass.featured)[0]}
                        isLoading={this.props.onlineClasses.isLoading}
                        erreMess={this.props.onlineClasses.erreMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }}>
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        isLoading={this.props.promotions.isLoading}
                        erreMess={this.props.promotions.erreMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }}>
                    <RenderItem item={this.props.teachers.teachers.filter((teacher) => teacher.featured)[0]}
                        isLoading={this.props.teachers.isLoading}
                        erreMess={this.props.teachers.erreMess}
                    />
                </Animated.View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);