import { Text, View } from 'react-native';

export default function ExpensesTab() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-inter-bold">Expenses</Text>
      <Text className="text-base font-inter mt-4 text-center mx-8">
        Track your tax-deductible expenses here. You can add, edit, and categorize your expenses.
      </Text>
    </View>
  );
}