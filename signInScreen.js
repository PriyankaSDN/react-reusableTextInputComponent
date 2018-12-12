import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Strings from "../../constants/strings";
import { connect } from 'react-redux';
import Colors from "../../constants/colors";
import commonStyles from '../../commonStyle/commonStyle'
import { userLogin } from '../../actions/actionCreators'
import { validateEmail, showErrorMessage } from '../../constants/commonFunctions';
import TextInputComponent from '../commonComponent/TextInputComponent'
import ButtonComponent from '../commonComponent/buttonComponent'
import { StackActions } from 'react-navigation';

const window = Dimensions.get('window')
const pushAction = StackActions.push({
  routeName: 'splashScreen',
  params: {
    myUserId: 9,
  },
});

class signInScreen extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      isLoading: ''
    };
  }

  componentWillMount() {
    console.log('USER ID ==== ', this.props.myUserId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: false })
    if (nextProps.signInReducer != '' && nextProps.signInReducer != undefined) {
      console.log('CWRP RESPONE == ', JSON.stringify(nextProps.signInReducer))
      AsyncStorage.setItem(Strings.LOGIN_RESPONSE, JSON.stringify(nextProps.signInReducer))
      alert('sucess')
    }
  }

  onUserNameChange(text) {
    this.setState({ userName: text })
  }
  onPasswordChange(text) {
    this.setState({ password: text })
  }

  signInClick() {
    if (this.state.userName == '') {
      showErrorMessage(Strings.ERROR_EMPTY_EMAIL)
    } else if (!validateEmail(this.state.userName)) {
      showErrorMessage(Strings.ERROR_INVALID_EMAIL)
    } else if (this.state.password == '') {
      showErrorMessage(Strings.ERROR_EMPTY_PASSWORD)
    } else {

      this.setState({ isLoading: true })
      postData = {
        email: this.state.userName,
        password: this.state.password
      };
      this.props.userLogin(postData)
    }
  }

  render() {
    return (

      <ImageBackground style={loginStyles.mainContainer}
      //source={require("../../assets/login1.png")}
      >

        <ImageBackground style={loginStyles.firstView}
          source={require("../../assets/bg.png")}>

          <Text style={loginStyles.textLogin}>{Strings.LOGIN}</Text>
          <Text style={loginStyles.textToContinue}> {Strings.TO_CONTINUE}</Text>

        </ImageBackground>

        <View style={loginStyles.secondView}>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            extraHeight={40}
            extraScrollHeight={40}
            keyboardShouldPersistTaps='handled'
            enableAutoAutomaticScroll={true}
            enableOnAndroid={true}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: window.height / 7.5, alignItems: 'center', justifyContent: 'center' }}
          >

            <TextInputComponent
              style={commonStyles.textInputStyle}
              placeholder={Strings.USERNAME}
              onChangeText={this.onUserNameChange.bind(this)}
              value={this.state.userName}
              secureTextEntry = {false}
            />

            <TextInputComponent
              style={[commonStyles.textInputStyle, { marginTop: 30 }]}
              placeholder={Strings.PASSWORD}
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.state.password}
              secureTextEntry = {true}
            />

            <TouchableOpacity
             onPress={() => this.props.navigation.navigate('forgotPasswordScreen')}
             // onPress={() => this.props.navigation.dispatch(pushAction) }
              >

              <Text style={loginStyles.textForgotPass}>
                {Strings.FORGOT_PASSWORD}
              </Text>
            </TouchableOpacity>
            
            

            <ButtonComponent
              txtvalue={Strings.SUBMIT}
              onPress={() => this.signInClick()}
            />

          </KeyboardAwareScrollView>
        </View>

        {
          this.state.isLoading ?
            <View style={commonStyles.activityIndicatorStyle}>
              <UIActivityIndicator color={Colors.APP_COLOR} />
            </View>
            : null
        }
      </ImageBackground>
    )
  }
}

const loginStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.WHITE },
  firstView: { flex: 0.3, alignItems: 'center', justifyContent: 'center' },
  secondView: { flex: 0.7, alignItems: 'center', justifyContent: 'center' },
  textLogin: { fontSize: window.height / 18, color: Colors.WHITE , fontWeight:'600'},
  textToContinue: { fontSize: window.height / 45, marginTop: 10, color: Colors.WHITE },
  textForgotPass: { color: Colors.TEXT_COLOR, marginTop: 25 }
})


function mapStateToProps(state) {
  return {
    signInReducer: state.signInReducer.signInResponse
  }
}

export default connect(
  mapStateToProps,
  {
    userLogin
  }

)(signInScreen)
