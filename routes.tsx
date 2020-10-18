import React from 'react'
import { NavigationContainer, Route } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useContext } from 'react';
import Home from './src/pages/Home/Home';
import Login from './src/pages/login/Login';
import AuthContext, { AuthProvider } from './src/providers/AuthProvider';
import CreateAccount from './src/pages/CreateAccount';
import Exams from './src/pages/Exams';
import Exam from './src/pages/Exams/exam';
import Files from './src/pages/Files';
import AddExam from './src/pages/Exams/addExam';
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

                    <AppStack.Screen name='Home' component={Home} />
                    <AppStack.Screen name='Exams' component={Exams} />
                    <AppStack.Screen name='Exam' component={Exam} />
                    <AppStack.Screen name='Files' component={Files} />
                    <AppStack.Screen name='AddExam' component={AddExam} />
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