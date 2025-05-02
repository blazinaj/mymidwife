import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MapPin, Clock, Calendar, Phone, Mail, MessageSquare } from 'lucide-react-native';
import { format } from 'date-fns';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { colors, spacing, borders } from '@/constants/theme';

// Mock data - in a real app, this would come from your API
const appointmentDetails = {
  id: '1',
  title: '3rd Trimester Checkup',
  provider: {
    name: 'Dr. Sarah Johnson',
    role: 'Lead Midwife',
    phone: '+1 (555) 123-4567',
    email: 'dr.johnson@harmonybirth.com',
    image: 'SJ',
  },
  dateTime: new Date(2025, 6, 15, 10, 30),
  duration: 45, // minutes
  location: {
    name: 'Harmony Birth Center',
    address: '123 Wellness Street',
    suite: 'Suite 205',
    city: 'San Francisco',
    state: 'CA',
    zip: '94110',
  },
  status: 'upcoming',
  type: 'Regular Checkup',
  purpose: 'Routine prenatal checkup to monitor baby\'s growth and maternal health.',
  preparation: [
    'Bring any new symptoms or concerns to discuss',
    'Have a light meal before the appointment',
    'Wear comfortable clothing',
    'Bring your pregnancy journal if you keep one',
  ],
  notes: null,
};

export default function AppointmentDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleCall = () => {
    // In a real app, this would use Linking to make a phone call
    console.log(`Calling ${appointmentDetails.provider.phone}`);
  };

  const handleEmail = () => {
    // In a real app, this would use Linking to open email
    console.log(`Emailing ${appointmentDetails.provider.email}`);
  };

  const handleMessage = () => {
    router.push('/messages');
  };

  const handleGetDirections = () => {
    // In a real app, this would open maps with directions
    console.log('Opening maps with directions');
  };

  const handleReschedule = () => {
    console.log('Open reschedule modal');
  };

  const handleCancel = () => {
    console.log('Open cancel confirmation');
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
          <AppText variant="title">Appointment Details</AppText>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <AppText 
                variant="caption" 
                color={colors.neutral.white}
                style={styles.statusText}
              >
                {appointmentDetails.status.toUpperCase()}
              </AppText>
            </View>
          </View>

          {/* Main Info */}
          <AppText variant="heading" style={styles.title}>
            {appointmentDetails.title}
          </AppText>

          <Card variant="elevated" style={styles.mainInfoCard}>
            <View style={styles.infoRow}>
              <Calendar size={20} color={colors.primary[500]} />
              <AppText variant="body" style={styles.infoText}>
                {format(appointmentDetails.dateTime, 'EEEE, MMMM d, yyyy')}
              </AppText>
            </View>

            <View style={styles.infoRow}>
              <Clock size={20} color={colors.primary[500]} />
              <AppText variant="body" style={styles.infoText}>
                {format(appointmentDetails.dateTime, 'h:mm a')} • {appointmentDetails.duration} minutes
              </AppText>
            </View>

            <View style={styles.infoRow}>
              <MapPin size={20} color={colors.primary[500]} />
              <View style={styles.locationContainer}>
                <AppText variant="body">{appointmentDetails.location.name}</AppText>
                <AppText variant="body" color={colors.neutral[600]}>
                  {appointmentDetails.location.address}, {appointmentDetails.location.suite}
                </AppText>
                <AppText variant="body" color={colors.neutral[600]}>
                  {appointmentDetails.location.city}, {appointmentDetails.location.state} {appointmentDetails.location.zip}
                </AppText>
                <TouchableOpacity 
                  onPress={handleGetDirections}
                  style={styles.directionsButton}
                >
                  <AppText 
                    variant="bodyBold" 
                    color={colors.primary[500]}
                  >
                    Get Directions
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Provider Info */}
          <Card variant="elevated" style={styles.providerCard}>
            <View style={styles.providerHeader}>
              <View style={styles.providerImage}>
                <AppText variant="headingMedium" color={colors.primary[500]}>
                  {appointmentDetails.provider.image}
                </AppText>
              </View>
              <View style={styles.providerInfo}>
                <AppText variant="bodyBold">
                  {appointmentDetails.provider.name}
                </AppText>
                <AppText variant="body" color={colors.neutral[600]}>
                  {appointmentDetails.provider.role}
                </AppText>
              </View>
            </View>

            <View style={styles.providerActions}>
              <TouchableOpacity 
                style={styles.providerAction}
                onPress={handleCall}
              >
                <Phone size={20} color={colors.primary[500]} />
                <AppText variant="caption">Call</AppText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.providerAction}
                onPress={handleEmail}
              >
                <Mail size={20} color={colors.primary[500]} />
                <AppText variant="caption">Email</AppText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.providerAction}
                onPress={handleMessage}
              >
                <MessageSquare size={20} color={colors.primary[500]} />
                <AppText variant="caption">Message</AppText>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Appointment Details */}
          <Card variant="elevated" style={styles.detailsCard}>
            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Appointment Type
            </AppText>
            <AppText variant="body" style={styles.sectionContent}>
              {appointmentDetails.type}
            </AppText>

            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Purpose
            </AppText>
            <AppText variant="body" style={styles.sectionContent}>
              {appointmentDetails.purpose}
            </AppText>

            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Preparation
            </AppText>
            <View style={styles.preparationList}>
              {appointmentDetails.preparation.map((item, index) => (
                <View key={index} style={styles.preparationItem}>
                  <View style={styles.bullet} />
                  <AppText variant="body" style={styles.preparationText}>
                    {item}
                  </AppText>
                </View>
              ))}
            </View>
          </Card>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <Button
            title="Reschedule"
            variant="outline"
            onPress={handleReschedule}
            style={styles.footerButton}
          />
          <Button
            title="Cancel"
            variant="ghost"
            onPress={handleCancel}
            textStyle={{ color: colors.error[500] }}
            style={styles.footerButton}
          />
        </View>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  backButton: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  statusContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  statusBadge: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borders.radius.full,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  title: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  mainInfoCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  infoText: {
    marginLeft: spacing.md,
  },
  locationContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  directionsButton: {
    marginTop: spacing.xs,
  },
  providerCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  providerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  providerInfo: {
    flex: 1,
  },
  providerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.md,
  },
  providerAction: {
    alignItems: 'center',
  },
  detailsCard: {
    margin: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.xs,
  },
  sectionContent: {
    marginBottom: spacing.md,
    color: colors.neutral[700],
  },
  preparationList: {
    marginTop: spacing.xs,
  },
  preparationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary[500],
    marginTop: 8,
    marginRight: spacing.sm,
  },
  preparationText: {
    flex: 1,
    color: colors.neutral[700],
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    ...Platform.select({
      ios: {
        paddingBottom: spacing.xl,
      },
    }),
  },
  footerButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});