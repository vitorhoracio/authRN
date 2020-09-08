import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';
import api from '../services/api';

interface User{
    name: string,
    email: string,
}

interface AuthContextData{
    signed: boolean,
    user: User | null,
    signIn(): Promise<void>;
    loading: boolean;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

            await new Promise(resolve => setTimeout(resolve, 1000));

            if(storagedUser && storagedToken){
                api.defaults.headers['Autorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }
        loadStoragedData();
    }, []);

    async function signIn(){
        const response = await auth.signIn();
        setUser(response.user);

        api.defaults.headers['Autorization'] = `Bearer ${response.token}`;

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@RNAuth:token', response.token);
    }

    async function signOut(){
        AsyncStorage.clear().then(()=>{
            setUser(null);
        });
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}