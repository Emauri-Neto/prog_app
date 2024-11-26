import { DeleteAllExpenses, GetExpense, SaveExpense } from '@/hooks/useExpenses';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Expense = {
    id: number;
    name: string;
    category: 'INVESTIMENTO' | 'LAZER' | 'ESSENCIAL';
    amount: number;
    isEntry: boolean;
};

export default function index() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const List = async () => {
        const xp = await AsyncStorage.getItem('@expense');
        if (xp) setExpenses(JSON.parse(xp));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            List();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const Create = async (newXp: any) => {
        await AsyncStorage.setItem('@expense', JSON.stringify(newXp));
        setExpenses(newXp);
    };

    const Remove = async (id: number) => {
        const updatedTasks = expenses.filter(item => item.id !== id);
        await Create(updatedTasks);
    };

    return (
        <View style={styles.container}>
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
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <Text style={styles.description}>{item.name}</Text>
                        <Text>{item.category}</Text>
                        <Text style={[styles.amount, { color: item.isEntry ? 'green' : 'red' }]}>
                            R$ {item.isEntry ? '+' : '-'}
                            {item.amount.toFixed(2)}
                        </Text>
                        <TouchableOpacity onPress={() => Remove(item.id)} style={styles.deleteButton}>
                            <Icon name='remove' size={16} color='#fff' />
                        </TouchableOpacity>
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
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5
    }
});
