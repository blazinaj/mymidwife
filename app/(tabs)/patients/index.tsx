import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Search, Plus, Calendar, MessageCircle, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Card from '@/components/common/Card';
import { colors, spacing, typography, borders } from '@/constants/theme';

interface Patient {
  id: string;
  name: string;
  dueDate: Date;
  lastVisit: Date;
  status: 'active' | 'high-risk' | 'postpartum';
  weekOfPregnancy: number;
}

// Mock data
const patients: Patient[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    dueDate: new Date(2025, 9, 15),
    lastVisit: new Date(2025, 6, 10),
    status: 'active',
    weekOfPregnancy: 24,
  },
  {
    id: '2',
    name: 'Sophie Martinez',
    dueDate: new Date(2025, 8, 20),
    lastVisit: new Date(2025, 6, 8),
    status: 'high-risk',
    weekOfPregnancy: 28,
  },
  {
    id: '3',
    name: 'Lucy Anderson',
    dueDate: new Date(2025, 11, 5),
    lastVisit: new Date(2025, 6, 12),
    status: 'active',
    weekOfPregnancy: 16,
  },
  {
    id: '4',
    name: 'Maria Garcia',
    dueDate: new Date(2025, 7, 30),
    lastVisit: new Date(2025, 6, 5),
    status: 'postpartum',
    weekOfPregnancy: 2,
  },
];

export default function PatientsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = searchQuery
    ? patients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patients;

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'high-risk': return colors.error[500];
      case 'postpartum': return colors.accent[500];
      default: return colors.success[500];
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleAddPatient = () => {
    router.push('/patients/new');
  };

  const handlePatientPress = (id: string) => {
    router.push(`/patients/${id}`);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="title">My Patients</AppText>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddPatient}
          >
            <Plus size={24} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.neutral[500]}
          />
        </View>

        {/* Patient List */}
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card 
              variant="elevated" 
              style={styles.patientCard}
              onPress={() => handlePatientPress(item.id)}
            >
              <View style={styles.patientHeader}>
                <View>
                  <AppText variant="bodyBold">{item.name}</AppText>
                  <View style={styles.statusContainer}>
                    <View 
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(item.status) }
                      ]} 
                    />
                    <AppText 
                      variant="caption" 
                      color={colors.neutral[600]}
                      style={styles.statusText}
                    >
                      {item.status === 'postpartum' 
                        ? 'Postpartum' 
                        : `Week ${item.weekOfPregnancy}`}
                    </AppText>
                  </View>
                </View>
                <View style={styles.quickActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => router.push('/appointments/new')}
                  >
                    <Calendar size={20} color={colors.primary[500]} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => router.push('/messages/new')}
                  >
                    <MessageCircle size={20} color={colors.primary[500]} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => router.push('/health')}
                  >
                    <Activity size={20} color={colors.primary[500]} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.patientDetails}>
                <View style={styles.detailItem}>
                  <AppText variant="caption" color={colors.neutral[500]}>
                    Due Date
                  </AppText>
                  <AppText variant="body">{formatDate(item.dueDate)}</AppText>
                </View>
                
                <View style={styles.detailItem}>
                  <AppText variant="caption" color={colors.neutral[500]}>
                    Last Visit
                  </AppText>
                  <AppText variant="body">{formatDate(item.lastVisit)}</AppText>
                </View>
              </View>
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <AppText variant="body" color={colors.neutral[600]}>
                No patients found
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
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
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
  patientCard: {
    marginBottom: spacing.md,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusText: {
    textTransform: 'capitalize',
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  patientDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.md,
    padding: spacing.md,
  },
  detailItem: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
});