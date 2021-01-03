import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import Home from './src/pages/Home/Home';
import Login from './src/pages/login/Login';
import AuthContext, { AuthProvider } from './src/providers/AuthProvider';
import CreateAccount from './src/pages/CreateAccount';
import Exams from './src/pages/Exams';
import Exam from './src/pages/Exams/exam';
import Files from './src/pages/Files';
import AddExam from './src/pages/Exams/addExam';
import Vaccines from './src/pages/Vaccine';
import Vaccine from './src/pages/Vaccine/vaccine';
import AddVaccine from './src/pages/Vaccine/addVaccine';
import Profile from './src/pages/Profile';
import Medicines from './src/pages/Medicines';
import ForgotPassword from './src/pages/ForgotPassword';
import Gyms from './src/pages/Gym';
import ExpandCard from './src/components/ExpandCard';
import Training from './src/pages/Training';
import ViewFile from './src/pages/Files/viewFile';
import FilesVaccine from './src/pages/FilesVaccine';
import ViewFileVaccine from './src/pages/FilesVaccine/viewFile';
import AddMedicine from './src/pages/Medicines/addMedicine';
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
                    <AppStack.Screen name='ForgotPassword' component={ForgotPassword} />


                </AppStack.Navigator>
            </NavigationContainer>
            :
            <NavigationContainer>
                <AppStack.Navigator
                    headerMode="none">
                    <AppStack.Screen name='Home' component={Home} />
                    <AppStack.Screen name='Exams' component={Exams} />
                    <AppStack.Screen name='Exam' component={Exam} />
                    <AppStack.Screen name='Files' component={Files} />
                    <AppStack.Screen name='AddExam' component={AddExam} />
                    <AppStack.Screen name='Vaccines' component={Vaccines} />
                    <AppStack.Screen name='Vaccine' component={Vaccine} />
                    <AppStack.Screen name='Gyms' component={Gyms} />
                    <AppStack.Screen name='AddVaccine' component={AddVaccine} />
                    <AppStack.Screen name='Profile' component={Profile} />
                    <AppStack.Screen name='Medicines' component={Medicines} />
                    <AppStack.Screen name='Training' component={Training} />
                    <AppStack.Screen name='ViewFile' component={ViewFile} />
                    <AppStack.Screen name='ViewFileVaccine' component={ViewFileVaccine} />
                    <AppStack.Screen name='FilesVaccine' component={FilesVaccine} />
                    <AppStack.Screen name='AddMedicine' component={AddMedicine} />
                </AppStack.Navigator>
            </NavigationContainer>
    )

}

export default Routes