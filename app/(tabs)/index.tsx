import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addTaxEntry, removeTaxEntry, TaxEntry } from '@/src/store/slices/taxSlice';
import React, { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { entries, totalIncome, totalExpenses } = useAppSelector((state) => state.tax);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleAddEntry = () => {
    if (!description || !amount || !category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newEntry: TaxEntry = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      type,
    };

    dispatch(addTaxEntry(newEntry));
    
    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const handleDeleteEntry = (id: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeTaxEntry(id)) },
      ]
    );
  };

  const renderTaxEntry = ({ item }: { item: TaxEntry }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{item.description}</Text>
          <Text className="text-sm text-gray-600">{item.category}</Text>
          <Text className="text-xs text-gray-500">{item.date}</Text>
        </View>
        <View className="items-end">
          <Text className={`text-lg font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={() => handleDeleteEntry(item.id)}
            className="mt-2 bg-red-500 px-3 py-1 rounded"
          >
            <Text className="text-white text-xs">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-2xl font-bold mb-4">Tax Tracker</Text>
        <View className="flex-row justify-between">
          <View className="bg-green-500 p-3 rounded-lg flex-1 mr-2">
            <Text className="text-white text-sm">Total Income</Text>
            <Text className="text-white text-xl font-bold">${totalIncome.toFixed(2)}</Text>
          </View>
          <View className="bg-red-500 p-3 rounded-lg flex-1 ml-2">
            <Text className="text-white text-sm">Total Expenses</Text>
            <Text className="text-white text-xl font-bold">${totalExpenses.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Add Entry Form */}
      <View className="bg-white p-4 m-4 rounded-lg shadow-sm border border-gray-200">
        <Text className="text-lg font-semibold mb-4 text-gray-800">Add New Entry</Text>
        
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-3"
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-3"
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-3"
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <View className="flex-row mb-4">
          <TouchableOpacity
            onPress={() => setType('expense')}
            className={`flex-1 p-3 rounded-lg mr-2 ${type === 'expense' ? 'bg-red-500' : 'bg-gray-200'}`}
          >
            <Text className={`text-center font-semibold ${type === 'expense' ? 'text-white' : 'text-gray-700'}`}>
              Expense
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setType('income')}
            className={`flex-1 p-3 rounded-lg ml-2 ${type === 'income' ? 'bg-green-500' : 'bg-gray-200'}`}
          >
            <Text className={`text-center font-semibold ${type === 'income' ? 'text-white' : 'text-gray-700'}`}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleAddEntry}
          className="bg-blue-600 p-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-lg">Add Entry</Text>
        </TouchableOpacity>
      </View>

      {/* Entries List */}
      <View className="flex-1 px-4">
        <Text className="text-lg font-semibold mb-3 text-gray-800">Recent Entries</Text>
        <FlatList
          data={entries}
          renderItem={renderTaxEntry}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="bg-white p-8 rounded-lg items-center">
              <Text className="text-gray-500 text-center">No entries yet. Add your first tax entry above!</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
