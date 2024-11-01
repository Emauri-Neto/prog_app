import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
    id: number;
    name: string;
}

export default function Index() {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        List();
    }, [tasks]);

    const List = async () => {
        const tks = await AsyncStorage.getItem('tasks');
        if (tks) setTasks(JSON.parse(tks));
    };

    const Create = async (newTks: any) => {
        await AsyncStorage.setItem('tasks', JSON.stringify(newTks));
        setTasks(newTks);
    };

    const Remove = async (id: number) => {
        const updatedTasks = tasks.filter(item => item.id !== id);
        await Create(updatedTasks);
    };

    const HandleAdd = async () => {
        if (name.trim()) {
            const newTks = { id: Date.now(), name };
            const all = [...tasks, newTks];
            Create(all);
        }
        setName('');
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Add a new task' value={name} onChangeText={setName} />
            <Button title={'Adicionar Tarefa'} onPress={HandleAdd} />
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text style={styles.task}>{item.name}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => Remove(item.id)} style={styles.deleteButton}>
                                <Icon name='remove' size={16} color='#fff' />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        marginTop: 8
    },
    task: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'semibold'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    editButton: {
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 5,
        marginRight: 5
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});
