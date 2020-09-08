import React, {useContext, useState} from 'react';
import { Button, Text, View } from 'react-native';

import {useAuth} from '../../contexts/auth';

const SignIn: React.FC = () => {
  const {signOut, user} = useAuth();

  async function handleSignOut(){ 
    signOut();
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Bem Vindo, {user?.name}!
      </Text>
      <Button title="Sign out" onPress={handleSignOut}/>
    </View>
  );
}

export default SignIn;

