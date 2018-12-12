import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
//import TextInput from "react-native-material-textinput";
import Dimensions from "Dimensions";
import Colors from "../../constants/colors";
import commonStyles from '../../commonStyle/commonStyle'

export default class TextInputComponent extends Component {
    render() {
        return (
            <View>
                <TextInput
                    style={this.props.style}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={Colors.TEXT_INPUT_LABLE_COLOR}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    autoCapitalize='none'
                    maxLength={40}
                    underlineColorAndroid='transparent'
                    secureTextEntry={this.props.secureTextEntry}
                />
            </View>
        );
    }
}