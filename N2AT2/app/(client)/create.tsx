import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

type Expense = {
    id: number;
    name: string;
    category: 'INVESTIMENTO' | 'LAZER' | 'ESSENCIAL';
    amount: number;
    isEntry: boolean;
};

export default function create() {
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('LAZER');
    const [name, setName] = useState<string>('');
    const [isEntry, setIsEntry] = useState<boolean>(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const Create = async (newTks: any) => {
        await AsyncStorage.setItem('@expense', JSON.stringify(newTks));
        setExpenses(newTks);
    };

    const handleAdd = () => {
        if (!amount || !category || !name) {
            Alert.alert('Erro', 'Preencha todos os campos para registrar uma despesa');
            return;
        }

        const newXp = {
            id: Date.now(),
            amount: parseFloat(amount),
            category: category as 'INVESTIMENTO' | 'LAZER' | 'ESSENCIAL',
            name,
            isEntry
        };

        const xp = async () => {
            const exp = await AsyncStorage.getItem('tasks');
            if (exp) setExpenses(JSON.parse(exp));
        };

        const all = [...expenses, newXp];
        Create(all);

        setAmount('');
        setName('');
    };
    return (
        <View>
            <Text style={styles.title}>Adicionar Despesa</Text>

            <TextInput placeholder='Nome da Despesa' value={name} onChangeText={setName} style={styles.input} />

            <TextInput placeholder='Valor' keyboardType='numeric' value={amount} onChangeText={setAmount} style={styles.input} />

            <Text style={styles.label}>Categoria</Text>
            <Picker selectedValue={category} onValueChange={itemValue => setCategory(itemValue)} style={styles.picker}>
                <Picker.Item label='LAZER' value='LAZER' />
                <Picker.Item label='INVESTIMENTO' value='INVESTIMENTO' />
                <Picker.Item label='ESSENCIAL' value='ESSENCIAL' />
            </Picker>

            <Text style={styles.label}>Entrada ou Saída?</Text>
            <View style={styles.entryButtons}>
                <Button title='Entrada' onPress={() => setIsEntry(true)} />
                <Button title='Saída' onPress={() => setIsEntry(false)} />
            </View>

            <Button title='Adicionar Despesa' onPress={handleAdd} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 16,
        marginBottom: 10
    },
    entryButtons: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: 20
    },
    picker: {
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5
    }
});
