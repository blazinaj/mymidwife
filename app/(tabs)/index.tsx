import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Calendar, MessageCircle, Book, Activity, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Card from '@/components/common/Card';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import MilestoneCard from '@/components/progress/MilestoneCard';
import { colors, spacing, shadows, borders } from '@/constants/theme';

const { width } = Dimensions.get('window');

// Mock data
const upcomingAppointment = {
  id: '1',
  title: '3rd Trimester Checkup',
  provider: 'Dr. Sarah Johnson',
  dateTime: new Date(2025, 6, 15, 10, 30),
  location: 'Harmony Birth Center, Suite 205',
  status: 'upcoming' as const,
};

const currentMilestone = {
  id: '1',
  title: 'Second Trimester Begins',
  description: 'Your baby is now the size of a peach and can move its arms and legs. You may start feeling movement soon.',
  week: 14,
  isCompleted: false,
  isCurrent: true,
};

export default function HomeScreen() {
  const router = useRouter();

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
    <Screen scroll>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <AppText variant="title">Hello, Emma</AppText>
            <AppText variant="body" color={colors.neutral[600]}>
              Week 14 - Second Trimester
            </AppText>
          </View>
        </View>

        {/* Progress Bar */}
        <Card variant="elevated" style={styles.progressCard}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '35%' }]} />
            </View>
            <View style={styles.progressLabels}>
              <AppText variant="caption">Week 1</AppText>
              <AppText variant="caption">Week 20</AppText>
              <AppText variant="caption">Week 40</AppText>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/appointments')}
          >
            <View style={styles.actionIcon}>
              <Calendar color={colors.primary[500]} size={24} />
            </View>
            <AppText variant="bodyBold" style={styles.actionText}>
              Appointments
            </AppText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/messages')}
          >
            <View style={styles.actionIcon}>
              <MessageCircle color={colors.primary[500]} size={24} />
            </View>
            <AppText variant="bodyBold" style={styles.actionText}>
              Messages
            </AppText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/education')}
          >
            <View style={styles.actionIcon}>
              <Book color={colors.primary[500]} size={24} />
            </View>
            <AppText variant="bodyBold" style={styles.actionText}>
              Resources
            </AppText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/health')}
          >
            <View style={styles.actionIcon}>
              <Activity color={colors.primary[500]} size={24} />
            </View>
            <AppText variant="bodyBold" style={styles.actionText}>
              Health
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Next Appointment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="headingMedium">Next Appointment</AppText>
            <TouchableOpacity onPress={() => router.push('/appointments')}>
              <AppText 
                variant="bodyBold" 
                color={colors.primary[500]}
                style={styles.viewAll}
              >
                View All
              </AppText>
            </TouchableOpacity>
          </View>
          <AppointmentCard 
            {...upcomingAppointment}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
            onViewDetails={handleViewDetails}
          />
        </View>

        {/* Current Milestone */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="headingMedium">Current Milestone</AppText>
            <TouchableOpacity>
              <AppText 
                variant="bodyBold" 
                color={colors.primary[500]}
                style={styles.viewAll}
              >
                Timeline
              </AppText>
            </TouchableOpacity>
          </View>
          <MilestoneCard {...currentMilestone} />
        </View>

        {/* Care Team */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="headingMedium">Your Care Team</AppText>
          </View>
          <Card variant="elevated" style={styles.careTeamCard}>
            <View style={styles.careTeamMember}>
              <View style={styles.careTeamImage}>
                <AppText variant="headingMedium" color={colors.primary[500]}>SJ</AppText>
              </View>
              <View style={styles.careTeamInfo}>
                <AppText variant="bodyBold">Dr. Sarah Johnson</AppText>
                <AppText variant="body" color={colors.neutral[600]}>
                  Lead Midwife
                </AppText>
                <TouchableOpacity 
                  style={styles.messageButton}
                  onPress={() => router.push('/messages')}
                >
                  <AppText variant="bodyBold" color={colors.primary[500]}>
                    Message
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>

        {/* Recommended Resources */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="headingMedium">Recommended For You</AppText>
            <TouchableOpacity onPress={() => router.push('/education')}>
              <AppText 
                variant="bodyBold" 
                color={colors.primary[500]}
                style={styles.viewAll}
              >
                View All
              </AppText>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resourcesContainer}
          >
            <TouchableOpacity 
              style={styles.resourceCard}
              onPress={() => router.push('/education/1')}
            >
              <AppText variant="bodyBold">Second Trimester Nutrition Guide</AppText>
              <AppText variant="caption" color={colors.neutral[600]} style={styles.resourceMeta}>
                5 min read
              </AppText>
              <View style={styles.resourceFooter}>
                <ArrowRight size={16} color={colors.primary[500]} />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.resourceCard}
              onPress={() => router.push('/education/2')}
            >
              <AppText variant="bodyBold">Preparing for Childbirth Classes</AppText>
              <AppText variant="caption" color={colors.neutral[600]} style={styles.resourceMeta}>
                3 min read
              </AppText>
              <View style={styles.resourceFooter}>
                <ArrowRight size={16} color={colors.primary[500]} />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
  progressCard: {
    marginBottom: spacing.xl,
    padding: spacing.md,
  },
  progressContainer: {
    width: '100%',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.neutral[200],
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary[500],
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
    width: (width - (spacing.md * 2) - (spacing.sm * 3)) / 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    ...shadows.sm,
  },
  actionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  viewAll: {
    marginRight: spacing.xs,
  },
  careTeamCard: {
    padding: spacing.md,
  },
  careTeamMember: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  careTeamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  careTeamInfo: {
    flex: 1,
  },
  messageButton: {
    marginTop: spacing.sm,
  },
  resourcesContainer: {
    paddingRight: spacing.md,
  },
  resourceCard: {
    width: 240,
    backgroundColor: colors.neutral.white,
    borderRadius: borders.radius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    ...shadows.sm,
  },
  resourceMeta: {
    marginTop: spacing.xs,
  },
  resourceFooter: {
    marginTop: spacing.md,
    alignItems: 'flex-end',
  },
});