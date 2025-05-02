import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import AppointmentCard, { AppointmentProps } from '@/components/appointments/AppointmentCard';
import { colors, spacing, shadows } from '@/constants/theme';

// Mock data
const appointments: AppointmentProps[] = [
  {
    id: '1',
    title: '3rd Trimester Checkup',
    provider: 'Dr. Sarah Johnson',
    dateTime: new Date(2025, 6, 15, 10, 30),
    location: 'Harmony Birth Center, Suite 205',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Ultrasound Session',
    provider: 'Dr. Michael Chen',
    dateTime: new Date(2025, 7, 2, 14, 0),
    location: 'Harmony Birth Center, Suite 101',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Routine Checkup',
    provider: 'Dr. Sarah Johnson',
    dateTime: new Date(2025, 5, 5, 9, 15),
    location: 'Harmony Birth Center, Suite 205',
    status: 'completed',
    notes: 'Everything looking good. Blood pressure normal. Baby growth on track.',
  },
  {
    id: '4',
    title: 'First Trimester Screening',
    provider: 'Dr. Emily Rodriguez',
    dateTime: new Date(2025, 4, 20, 11, 30),
    location: 'Harmony Birth Center, Suite 302',
    status: 'completed',
  }
];

export default function AppointmentsScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const filteredAppointments = appointments.filter((appointment) => 
    selectedTab === 'upcoming' 
      ? appointment.status === 'upcoming' 
      : appointment.status === 'completed' || appointment.status === 'cancelled'
  );

  const handleReschedule = (id: string) => {
    console.log(`Reschedule appointment ${id}`);
  };

  const handleCancel = (id: string) => {
    console.log(`Cancel appointment ${id}`);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/appointments/${id}`);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="title">Appointments</AppText>
        </View>

        {/* Mini Calendar Summary */}
        <View style={styles.calendarSummary}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity>
              <ChevronLeft size={24} color={colors.neutral[800]} />
            </TouchableOpacity>
            <AppText variant="bodyBold">July 2025</AppText>
            <TouchableOpacity>
              <ChevronRight size={24} color={colors.neutral[800]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.upcomingDates}>
            <TouchableOpacity style={styles.dateItem}>
              <AppText variant="caption" align="center">MON</AppText>
              <View style={[styles.dateCircle]}>
                <AppText variant="bodyBold">13</AppText>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dateItem}>
              <AppText variant="caption" align="center">TUE</AppText>
              <View style={styles.dateCircle}>
                <AppText variant="bodyBold">14</AppText>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dateItem}>
              <AppText variant="caption" align="center">WED</AppText>
              <View style={[styles.dateCircle, styles.activeDateCircle]}>
                <AppText variant="bodyBold" color={colors.neutral.white}>15</AppText>
              </View>
              <View style={styles.dateBadge} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dateItem}>
              <AppText variant="caption" align="center">THU</AppText>
              <View style={styles.dateCircle}>
                <AppText variant="bodyBold">16</AppText>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dateItem}>
              <AppText variant="caption" align="center">FRI</AppText>
              <View style={styles.dateCircle}>
                <AppText variant="bodyBold">17</AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* New Appointment Button */}
        <Button
          title="Schedule New Appointment"
          onPress={() => console.log('Schedule new appointment')}
          leftIcon={<Plus size={18} color={colors.neutral.white} />}
          fullWidth
          style={styles.newAppointmentButton}
        />

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
            onPress={() => setSelectedTab('upcoming')}
          >
            <AppText
              variant={selectedTab === 'upcoming' ? 'bodyBold' : 'body'}
              color={selectedTab === 'upcoming' ? colors.primary[500] : colors.neutral[600]}
            >
              Upcoming
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
            onPress={() => setSelectedTab('past')}
          >
            <AppText
              variant={selectedTab === 'past' ? 'bodyBold' : 'body'}
              color={selectedTab === 'past' ? colors.primary[500] : colors.neutral[600]}
            >
              Past
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Appointment List */}
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              {...item}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
              onViewDetails={handleViewDetails}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Calendar size={48} color={colors.neutral[400]} />
              <AppText variant="body" color={colors.neutral[600]} style={styles.emptyText}>
                No {selectedTab} appointments
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
    marginBottom: spacing.lg,
  },
  calendarSummary: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  upcomingDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    alignItems: 'center',
    position: 'relative',
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  activeDateCircle: {
    backgroundColor: colors.primary[500],
  },
  dateBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary[500],
    position: 'absolute',
    bottom: -10,
  },
  newAppointmentButton: {
    marginBottom: spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    marginBottom: spacing.md,
  },
  tab: {
    paddingVertical: spacing.sm,
    marginRight: spacing.lg,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary[500],
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.md,
  },
});