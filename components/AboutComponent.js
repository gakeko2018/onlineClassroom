import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        teachers: state.teachers
    }
}

function History() {
    return (
        <Card title={"Our History"} >
            <Text >
                Here is the history.
            </Text>
        </Card>
    );
}




class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        const { params } = this.props.navigation.state;

        const renderonlineClass = ({ item, index }) => {
            return (
                <ListItem
                    roundAvatar
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        };

        if (this.props.teachers.isLoading) {
            return (
                <ScrollView>
                    <History />
                    <Card
                        title='Teachers'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.teachers.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <History />
                        <Card
                            title='Corporate teachership'>
                            <Text>{this.props.teachers.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <History />
                        <Card
                            title='Corporate teachership'>
                            <FlatList
                                data={this.props.teachers.teachers}
                                renderItem={renderonlineClass}
                                keyExtractor={item => item.id.toString()}
                            />
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(About);