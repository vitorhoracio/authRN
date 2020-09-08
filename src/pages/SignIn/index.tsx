import React, {useContext, useState} from 'react';
import { Button, Text, View } from 'react-native';

import {useAuth} from '../../contexts/auth';

const SignIn: React.FC = () => {
  const {signed, user, signIn} = useAuth();

  async function handleSignIn(){ 
    signIn();
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Clique abaixo para Entrar!
      </Text>
      <Button title="Sign in" onPress={handleSignIn}/>
    </View>
  );
}

export default SignIn;
