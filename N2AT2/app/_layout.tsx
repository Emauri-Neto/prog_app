import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name='(client)' options={{ headerShown: false }} />
                <Stack.Screen name='create' options={{ headerShown: false }} />
            </Stack>
            <StatusBar style='auto' />
        </>
    );
}
