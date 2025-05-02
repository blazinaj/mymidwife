import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Search } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Card from '@/components/common/Card';
import { colors, spacing, typography, borders } from '@/constants/theme';

interface Provider {
  id: string;
  name: string;
  role: string;
  isOnline?: boolean;
}

// Mock data
const providers: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Lead Midwife',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Ultrasound Specialist',
  },
  {
    id: '3',
    name: 'Nurse Olivia Wilson',
    role: 'Prenatal Nurse',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Dr. Emily Rodriguez',
    role: 'Nutrition Specialist',
  },
  {
    id: '5',
    name: 'Dr. James Wilson',
    role: 'OB/GYN',
  },
];

export default function NewMessageScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = searchQuery
    ? providers.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : providers;

  const handleSelectProvider = (id: string) => {
    router.push(`/messages/${id}`);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
          <AppText variant="title">New Message</AppText>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search care providers"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.neutral[500]}
            autoFocus
          />
        </View>

        {/* Provider List */}
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectProvider(item.id)}>
              <Card 
                variant="default" 
                padding="md" 
                style={styles.providerCard}
              >
                <View style={styles.providerContent}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                      <AppText variant="headingMedium" color={colors.primary[500]}>
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </AppText>
                    </View>
                    {item.isOnline && <View style={styles.onlineIndicator} />}
                  </View>
                  
                  <View style={styles.providerInfo}>
                    <AppText variant="bodyBold">{item.name}</AppText>
                    <AppText variant="caption" color={colors.neutral[600]}>
                      {item.role}
                    </AppText>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <AppText variant="body" color={colors.neutral[600]}>
                No providers found
              </AppText>
            </View>
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  backButton: {
    marginRight: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    margin: spacing.md,
    borderRadius: borders.radius.md,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: colors.neutral[800],
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.md,
  },
  providerCard: {
    marginHorizontal: spacing.md,
  },
  providerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success[500],
    borderWidth: 2,
    borderColor: colors.neutral.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  providerInfo: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
});