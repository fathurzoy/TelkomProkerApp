import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {showMessage, useForm} from '../../utils';
import {Button, Gap, TextInput} from '../../components/atom';
import {useDispatch} from 'react-redux';
import {signInAction} from '../../redux/action';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log('form: ', form);
    // Axios.post('http://foodmarket-backend.buildwithangga.id/api/login', form)
    //   .then(res => {
    //     console.log('success', res);
    //   })
    //   .catch(err => {
    //     console.log('error', err);
    //   });
    if (form.username && form.password) {
      dispatch(signInAction(form, navigation));
    } else {
      showMessage('Isi form terlebih dahulu');
    }
  };

  return (
    <ImageBackground
      source={require('./../../assets/Ilustration/bggray.gif')}
      style={{width: '100%', height: '100%'}}>
      <View style={styles.page}>
        <Image
          source={require('./../../assets/Ilustration/logo_telkom.png')}
          style={{width: 220, height: 120, marginBottom: 30}}
        />
        <View style={styles.container}>
          <TextInput
            label="Username"
            placeholder="Type your username"
            value={form.username}
            onChangeText={value => setForm('username', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Password"
            placeholder="Type your password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={24} />
          <Button
            text="Login"
            color="red"
            textColor="white"
            onPress={() => {
              onSubmit();
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: 300,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 20,
  },
});
