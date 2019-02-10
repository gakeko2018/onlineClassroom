import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'
import { Text, View, StyleSheet, Picker, Switch, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications, Calendar } from 'expo';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Setup A Meeting',
    };

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.presentLocalNotification(this.state.date);
        this.addReservationToCalendar(this.state.date);
        this.resetForm();
    }


    showAlert() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests:' + this.state.guests + '\n' +
            'Smoking:' + this.state.smoking + '\n' +
            'Date and Time' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.handleReservation()
                }
            ],
            { cancelable: false }
        );
    }


    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show the calendar');
            }
        }
        return permission;
    }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        Calendar.createEventAsync(Calendar.DEFAULT, {
            title: "Con Fusion Table Reservation",
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date) + (2 * 60 * 60 * 1000)),
            timeZone: "Asia/Hong_Kong",
            location: "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong",
        })

    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    render() {
        return (
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Setup A Meeting With The Teacher</Text>

                    </View>
                    <Input
                        placeholder="Student Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Teacher Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}

                        containerStyle={styles.formInput}
                    />
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Skype?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='red'
                            onValueChange={(value) => this.setState({ smoking: value })}>
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Select Date/Time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode="datetime"
                            placeholder="select date and Time"
                            minDate="2017-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys. 
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.showAlert()}
                            title="Setup"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </ScrollView>
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18
    },
    formItem: {
        flex: 1
    },
    formInput: {
        margin: 20
    },
});

export default Reservation;