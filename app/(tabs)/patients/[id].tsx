import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Calendar, MessageCircle, Activity, CircleAlert as AlertCircle } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { colors, spacing, borders } from '@/constants/theme';

// Mock data - in a real app, this would come from your API
const patientDetails = {
  id: '1',
  name: 'Emma Thompson',
  dueDate: new Date(2025, 9, 15),
  lastVisit: new Date(2025, 6, 10),
  status: 'active' as const,
  weekOfPregnancy: 24,
  age: 28,
  bloodType: 'A+',
  height: '5\'6"',
  weight: '145 lbs',
  address: '123 Main St, San Francisco, CA 94110',
  phone: '(555) 123-4567',
  email: 'emma.thompson@example.com',
  emergencyContact: {
    name: 'John Thompson',
    relation: 'Husband',
    phone: '(555) 987-6543',
  },
  medicalHistory: {
    conditions: ['Gestational diabetes', 'Mild hypertension'],
    allergies: ['Penicillin'],
    medications: ['Prenatal vitamins', 'Iron supplements'],
  },
  pregnancyHistory: {
    gravida: 2,
    para: 1,
    previousDeliveries: [
      {
        date: new Date(2023, 3, 15),
        type: 'Vaginal',
        complications: 'None',
      },
    ],
  },
  currentPregnancy: {
    conception: new Date(2025, 1, 1),
    firstVisit: new Date(2025, 2, 15),
    riskFactors: ['Previous gestational diabetes'],
    notes: 'Regular checkups, maintaining good control of blood sugar levels.',
  },
  upcomingAppointments: [
    {
      id: '1',
      date: new Date(2025, 6, 20),
      type: 'Regular Checkup',
    },
    {
      id: '2',
      date: new Date(2025, 7, 5),
      type: 'Ultrasound',
    },
  ],
  recentMetrics: [
    {
      id: '1',
      type: 'Blood Pressure',
      value: '118/78',
      date: new Date(2025, 6, 10),
    },
    {
      id: '2',
      type: 'Weight',
      value: '145 lbs',
      date: new Date(2025, 6, 10),
    },
    {
      id: '3',
      type: 'Blood Sugar',
      value: '95 mg/dL',
      date: new Date(2025, 6, 10),
    },
  ],
};

export default function PatientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
          <AppText variant="title">Patient Details</AppText>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Patient Summary */}
          <Card variant="elevated" style={styles.summaryCard}>
            <View style={styles.patientHeader}>
              <View>
                <AppText variant="headingMedium">{patientDetails.name}</AppText>
                <AppText variant="body" color={colors.neutral[600]}>
                  Week {patientDetails.weekOfPregnancy} • Due {formatDate(patientDetails.dueDate)}
                </AppText>
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

            <View style={styles.vitals}>
              <View style={styles.vitalItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Age</AppText>
                <AppText variant="bodyBold">{patientDetails.age}</AppText>
              </View>
              <View style={styles.vitalItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Blood Type</AppText>
                <AppText variant="bodyBold">{patientDetails.bloodType}</AppText>
              </View>
              <View style={styles.vitalItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Height</AppText>
                <AppText variant="bodyBold">{patientDetails.height}</AppText>
              </View>
              <View style={styles.vitalItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Weight</AppText>
                <AppText variant="bodyBold">{patientDetails.weight}</AppText>
              </View>
            </View>
          </Card>

          {/* Medical Alerts */}
          {patientDetails.medicalHistory.conditions.length > 0 && (
            <Card variant="elevated" style={styles.alertCard}>
              <View style={styles.cardHeader}>
                <AlertCircle size={20} color={colors.error[500]} />
                <AppText variant="bodyBold" style={styles.cardTitle}>Medical Alerts</AppText>
              </View>
              {patientDetails.medicalHistory.conditions.map((condition, index) => (
                <View key={index} style={styles.alertItem}>
                  <View style={styles.alertDot} />
                  <AppText variant="body">{condition}</AppText>
                </View>
              ))}
            </Card>
          )}

          {/* Contact Information */}
          <Card variant="elevated" style={styles.card}>
            <AppText variant="bodyBold" style={styles.cardTitle}>Contact Information</AppText>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Phone</AppText>
                <AppText variant="body">{patientDetails.phone}</AppText>
              </View>
              <View style={styles.contactItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Email</AppText>
                <AppText variant="body">{patientDetails.email}</AppText>
              </View>
              <View style={styles.contactItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Address</AppText>
                <AppText variant="body">{patientDetails.address}</AppText>
              </View>
            </View>
          </Card>

          {/* Emergency Contact */}
          <Card variant="elevated" style={styles.card}>
            <AppText variant="bodyBold" style={styles.cardTitle}>Emergency Contact</AppText>
            <View style={styles.emergencyContact}>
              <AppText variant="bodyBold">{patientDetails.emergencyContact.name}</AppText>
              <AppText variant="body" color={colors.neutral[600]}>
                {patientDetails.emergencyContact.relation}
              </AppText>
              <AppText variant="body">{patientDetails.emergencyContact.phone}</AppText>
            </View>
          </Card>

          {/* Pregnancy History */}
          <Card variant="elevated" style={styles.card}>
            <AppText variant="bodyBold" style={styles.cardTitle}>Pregnancy History</AppText>
            <View style={styles.pregnancyHistory}>
              <View style={styles.historyItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Gravida</AppText>
                <AppText variant="bodyBold">{patientDetails.pregnancyHistory.gravida}</AppText>
              </View>
              <View style={styles.historyItem}>
                <AppText variant="caption" color={colors.neutral[500]}>Para</AppText>
                <AppText variant="bodyBold">{patientDetails.pregnancyHistory.para}</AppText>
              </View>
            </View>
            {patientDetails.pregnancyHistory.previousDeliveries.map((delivery, index) => (
              <View key={index} style={styles.deliveryItem}>
                <AppText variant="body">{formatDate(delivery.date)}</AppText>
                <AppText variant="body">{delivery.type} delivery</AppText>
                <AppText variant="body" color={colors.neutral[600]}>
                  Complications: {delivery.complications}
                </AppText>
              </View>
            ))}
          </Card>

          {/* Current Pregnancy */}
          <Card variant="elevated" style={styles.card}>
            <AppText variant="bodyBold" style={styles.cardTitle}>Current Pregnancy</AppText>
            <View style={styles.currentPregnancy}>
              <View style={styles.pregnancyDetail}>
                <AppText variant="caption" color={colors.neutral[500]}>Conception Date</AppText>
                <AppText variant="body">{formatDate(patientDetails.currentPregnancy.conception)}</AppText>
              </View>
              <View style={styles.pregnancyDetail}>
                <AppText variant="caption" color={colors.neutral[500]}>First Visit</AppText>
                <AppText variant="body">{formatDate(patientDetails.currentPregnancy.firstVisit)}</AppText>
              </View>
              {patientDetails.currentPregnancy.riskFactors.length > 0 && (
                <View style={styles.riskFactors}>
                  <AppText variant="caption" color={colors.neutral[500]}>Risk Factors</AppText>
                  {patientDetails.currentPregnancy.riskFactors.map((factor, index) => (
                    <View key={index} style={styles.riskItem}>
                      <View style={styles.riskDot} />
                      <AppText variant="body">{factor}</AppText>
                    </View>
                  ))}
                </View>
              )}
              {patientDetails.currentPregnancy.notes && (
                <View style={styles.notes}>
                  <AppText variant="caption" color={colors.neutral[500]}>Notes</AppText>
                  <AppText variant="body">{patientDetails.currentPregnancy.notes}</AppText>
                </View>
              )}
            </View>
          </Card>

          {/* Recent Metrics */}
          <Card variant="elevated" style={styles.card}>
            <View style={styles.cardHeader}>
              <AppText variant="bodyBold">Recent Health Metrics</AppText>
              <Button
                title="View All"
                variant="outline"
                size="sm"
                onPress={() => router.push('/health')}
              />
            </View>
            {patientDetails.recentMetrics.map((metric, index) => (
              <View key={metric.id} style={[
                styles.metricItem,
                index < patientDetails.recentMetrics.length - 1 && styles.metricBorder
              ]}>
                <View>
                  <AppText variant="bodyBold">{metric.type}</AppText>
                  <AppText variant="body">{metric.value}</AppText>
                </View>
                <AppText variant="caption" color={colors.neutral[500]}>
                  {formatDate(metric.date)}
                </AppText>
              </View>
            ))}
          </Card>

          {/* Upcoming Appointments */}
          <Card variant="elevated" style={[styles.card, styles.lastCard]}>
            <View style={styles.cardHeader}>
              <AppText variant="bodyBold">Upcoming Appointments</AppText>
              <Button
                title="Schedule"
                variant="outline"
                size="sm"
                onPress={() => router.push('/appointments/new')}
              />
            </View>
            {patientDetails.upcomingAppointments.map((appointment, index) => (
              <View key={appointment.id} style={[
                styles.appointmentItem,
                index < patientDetails.upcomingAppointments.length - 1 && styles.appointmentBorder
              ]}>
                <View>
                  <AppText variant="bodyBold">{appointment.type}</AppText>
                  <AppText variant="body">{formatDate(appointment.date)}</AppText>
                </View>
                <Button
                  title="Details"
                  variant="outline"
                  size="sm"
                  onPress={() => router.push(`/appointments/${appointment.id}`)}
                />
              </View>
            ))}
          </Card>
        </ScrollView>
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
  summaryCard: {
    margin: spacing.md,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
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
  vitals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.md,
    padding: spacing.md,
  },
  vitalItem: {
    alignItems: 'center',
  },
  alertCard: {
    margin: spacing.md,
    marginTop: 0,
    borderLeftWidth: 4,
    borderLeftColor: colors.error[500],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    marginLeft: spacing.sm,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  alertDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error[500],
    marginRight: spacing.sm,
  },
  card: {
    margin: spacing.md,
    marginTop: 0,
  },
  contactInfo: {
    gap: spacing.sm,
  },
  contactItem: {
    marginBottom: spacing.sm,
  },
  emergencyContact: {
    gap: spacing.xs,
  },
  pregnancyHistory: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  historyItem: {
    marginRight: spacing.xl,
  },
  deliveryItem: {
    padding: spacing.md,
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.md,
    marginBottom: spacing.sm,
  },
  currentPregnancy: {
    gap: spacing.md,
  },
  pregnancyDetail: {
    marginBottom: spacing.sm,
  },
  riskFactors: {
    gap: spacing.sm,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.warning[500],
    marginRight: spacing.sm,
  },
  notes: {
    padding: spacing.md,
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.md,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  metricBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  appointmentBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  lastCard: {
    marginBottom: spacing.xl,
  },
});