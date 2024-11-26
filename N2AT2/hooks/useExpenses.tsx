import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveExpense = async (key: string, expense: string) => {
    try {
        const exp = await AsyncStorage.getItem(key);
        const expenses = exp ? JSON.parse(exp) : [];

        expenses.push(expense);
        await AsyncStorage.setItem(key, JSON.stringify(expenses));
    } catch (error) {
        console.error(error);
    }
};

export const GetExpense = async (key: string) => {
    try {
        const exp = await AsyncStorage.getItem(key);
        return exp ? JSON.parse(exp) : [];
    } catch (error) {
        console.error(error);
    }
};

export const DeleteAllExpenses = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
};

export const DeleteOneExpense = async (key: string, index: any) => {
    try {
        const existingExpenses = await AsyncStorage.getItem(key);
        const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];

        if (index < 0 || index >= expenses.length) {
            return;
        }

        expenses.splice(index, 1);

        await AsyncStorage.setItem(key, JSON.stringify(expenses));
    } catch (error) {
        console.error(error);
    }
};
