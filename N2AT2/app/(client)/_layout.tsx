import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Inicio'
                }}
            />
            <Tabs.Screen
                name='create'
                options={{
                    title: 'Despesas'
                }}
            />
        </Tabs>
    );
}
