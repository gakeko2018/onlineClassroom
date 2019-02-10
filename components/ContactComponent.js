import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';





class ContactComponent extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['onlineclassroom@onlineclassroom.net'],
            subject: 'Classes',
            body: 'Hi'
        })
    }

    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} >
                <Card
                    title='Contact Information'>
                    <Text >istiklal caddesi</Text>
                    <Text >istanbul  </Text>
                    <Text >Türkiye  </Text>
                    <Text >Tel: +90 234 223 44 44  </Text>
        
                    <Button
                        title="Send Email"
                        buttonStyle={{ backgroundColor: "#512DA8" }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                    />
                </Card>
            </Animatable.View>
        );
    }
}

export default ContactComponent;