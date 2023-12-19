import React from 'react'
import { View } from 'react-native'
import { Text, Switch, useTheme, Button } from 'react-native-paper'
const SettingsScreen = ({ toggleTheme }: any) => {
    const theme = useTheme();
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <View>
            <Switch value={isSwitchOn} onValueChange={() => {
                onToggleSwitch();
                toggleTheme();
            }} />

            <Button mode='contained'>test</Button>
        </View>
    )
}

export default SettingsScreen