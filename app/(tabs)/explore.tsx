import { useAppSelector } from '@/src/store/hooks';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function ReportsScreen() {
  const { entries, totalIncome, totalExpenses } = useAppSelector((state) => state.tax);

  const netIncome = totalIncome - totalExpenses;
  const incomeEntries = entries.filter(entry => entry.type === 'income');
  const expenseEntries = entries.filter(entry => entry.type === 'expense');

  // Group expenses by category
  const expensesByCategory = expenseEntries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
    return acc;
  }, {} as Record<string, number>);

  // Group income by category
  const incomeByCategory = incomeEntries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-purple-600 pt-12 pb-6 px-4">
        <Text className="text-white text-2xl font-bold">Tax Reports</Text>
        <Text className="text-purple-100 text-sm mt-1">Financial overview and insights</Text>
      </View>

      {/* Summary Cards */}
      <View className="p-4 space-y-4">
        <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Financial Summary</Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total Income:</Text>
              <Text className="font-semibold text-green-600">${totalIncome.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total Expenses:</Text>
              <Text className="font-semibold text-red-600">${totalExpenses.toFixed(2)}</Text>
            </View>
            <View className="border-t border-gray-200 pt-2 mt-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-800 font-semibold">Net Income:</Text>
                <Text className={`font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${netIncome.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Income by Category */}
        {Object.keys(incomeByCategory).length > 0 && (
          <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Text className="text-lg font-semibold text-gray-800 mb-3">Income by Category</Text>
            {Object.entries(incomeByCategory).map(([category, amount]) => (
              <View key={category} className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600 capitalize">{category}</Text>
                <Text className="font-semibold text-green-600">${amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Expenses by Category */}
        {Object.keys(expensesByCategory).length > 0 && (
          <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Text className="text-lg font-semibold text-gray-800 mb-3">Expenses by Category</Text>
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <View key={category} className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600 capitalize">{category}</Text>
                <Text className="font-semibold text-red-600">${amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Recent Activity */}
        <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</Text>
          {entries.length === 0 ? (
            <Text className="text-gray-500 text-center py-4">No entries yet</Text>
          ) : (
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Total Entries:</Text>
                <Text className="font-semibold">{entries.length}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Income Entries:</Text>
                <Text className="font-semibold text-green-600">{incomeEntries.length}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Expense Entries:</Text>
                <Text className="font-semibold text-red-600">{expenseEntries.length}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Tax Insights */}
        <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Tax Insights</Text>
          <View className="space-y-2">
            <View className="bg-blue-50 p-3 rounded-lg">
              <Text className="text-sm text-blue-800 font-medium">💡 Tip</Text>
              <Text className="text-sm text-blue-700 mt-1">
                Keep track of all business expenses for potential tax deductions.
              </Text>
            </View>
            {netIncome > 0 && (
              <View className="bg-yellow-50 p-3 rounded-lg">
                <Text className="text-sm text-yellow-800 font-medium">⚠️ Reminder</Text>
                <Text className="text-sm text-yellow-700 mt-1">
                  Consider setting aside 25-30% of your net income for taxes.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
