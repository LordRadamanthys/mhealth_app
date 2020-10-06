import React from 'react'
import { NavigationContainer, Route } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useContext } from 'react';
import Home from './src/pages/Home/Home';
import Login from './src/pages/login/Login';
import AuthContext, { AuthProvider } from './src/providers/AuthProvider';
import CreateAccount from './src/pages/CreateAccount';
const AppStack = createStackNavigator()

const Routes = () => {
    const { signed } = useContext(AuthContext)

    return (
        !signed ?
            <NavigationContainer>
                <AppStack.Navigator
                    headerMode="none">
                    <AppStack.Screen name='Login' component={Login} />
                    <AppStack.Screen name='CreateAccount' component={CreateAccount} />
                </AppStack.Navigator>
            </NavigationContainer>
            :
            <NavigationContainer>
                <AppStack.Navigator
                    headerMode="none">
                    <AppStack.Screen name='Home' component={Home} />
                </AppStack.Navigator>
            </NavigationContainer>
    )

}

export default Routes