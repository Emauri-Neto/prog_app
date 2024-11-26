import { DeleteAllExpenses, GetExpense, SaveExpense } from '@/hooks/useExpenses';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Expense = {
    id: string;
    name: string;
    category: 'INVESTIMENTO' | 'LAZER' | 'ESSENCIAL';
    amount: number;
    isEntry: boolean;
};

export default function index() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('LAZER');
    const [name, setName] = useState<string>('');
    const [isEntry, setIsEntry] = useState<boolean>(true);

    useEffect(() => {
        const load = async () => {
            try {
                const xp = await GetExpense('@expenses');
                if (xp) {
                    setExpenses(JSON.parse(xp));
                    await DeleteAllExpenses('@expenses');
                }
            } catch (error) {
                console.error('Error loading expenses:', error);
            }
        };
        load();
    }, []);

    useEffect(() => {
        const saveExpenses = async () => {
            try {
                await SaveExpense('@expenses', JSON.stringify(expenses));
            } catch (error) {
                console.error('Error saving expenses:', error);
            }
        };
        saveExpenses();
    }, [expenses]);

    const handleAdd = () => {
        if (!amount || !category || !name) {
            Alert.alert('Erro', 'Preencha todos os campos para registrar uma despesa');
            return;
        }

        const newXp: Expense = {
            id: Date.now().toString(),
            amount: parseFloat(amount),
            category: category as 'INVESTIMENTO' | 'LAZER' | 'ESSENCIAL',
            name,
            isEntry
        };

        setExpenses(prev => [...prev, newXp]);
        setAmount('');
        setName('');
    };

    return (
        <View style={styles.container}>
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

            <View style={{ display: 'flex' }}>
                <Text style={styles.used}>Total utilizado:</Text>
                <Text
                    style={[
                        styles.amount,
                        {
                            color:
                                expenses.reduce((total, expense) => {
                                    return expense.isEntry ? total + expense.amount : total - expense.amount;
                                }, 0) >= 0
                                    ? 'green'
                                    : 'red'
                        }
                    ]}
                >
                    {expenses.reduce((total, expense) => {
                        return expense.isEntry ? total + expense.amount : total - expense.amount;
                    }, 0)}
                </Text>
            </View>

            <FlatList
                data={expenses}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <Text style={styles.description}>{item.name}</Text>
                        <Text>{item.category}</Text>
                        <Text style={[styles.amount, { color: item.isEntry ? 'green' : 'red' }]}>
                            R$ {item.isEntry ? '+' : '-'}
                            {item.amount.toFixed(2)}
                        </Text>
                    </View>
                )}
                style={styles.expenseList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7'
    },
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
    picker: {
        height: 50,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5
    },
    entryButtons: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: 20
    },
    expenseList: {
        flex: 1
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
    },
    description: {
        fontSize: 16,
        color: '#333'
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    used: {
        fontSize: 16,
        marginTop: 16,
        fontWeight: 'semibold'
    }
});
