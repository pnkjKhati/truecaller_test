import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import ChatScreen from '../../screens/ChatScreen';
import DaiScreen from '../../screens/DaiScreen';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Dial" component={DaiScreen} />

        </Stack.Navigator>
    );
}
export default MyStack