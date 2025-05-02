import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react-native';
import Card from '@/components/common/Card';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import { colors, spacing, typography } from '@/constants/theme';

export interface AppointmentProps {
  id: string;
  title: string;
  provider: string;
  dateTime: Date;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function AppointmentCard({
  id,
  title,
  provider,
  dateTime,
  location,
  status,
  notes,
  onReschedule,
  onCancel,
  onViewDetails,
}: AppointmentProps) {
  const isUpcoming = status === 'upcoming';
  
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming': return colors.primary[500];
      case 'completed': return colors.success[500];
      case 'cancelled': return colors.error[500];
      default: return colors.neutral[500];
    }
  };

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText variant="headingMedium">{title}</AppText>
          <AppText variant="body" color={colors.neutral[600]}>with {provider}</AppText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <AppText 
            variant="caption" 
            color={colors.neutral.white} 
            style={styles.statusText}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </AppText>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Calendar size={18} color={colors.primary[500]} />
          <AppText style={styles.detailText}>
            {format(dateTime, 'EEEE, MMMM d, yyyy')}
          </AppText>
        </View>
        <View style={styles.detailRow}>
          <Clock size={18} color={colors.primary[500]} />
          <AppText style={styles.detailText}>
            {format(dateTime, 'h:mm a')}
          </AppText>
        </View>
        <AppText variant="body" color={colors.neutral[600]} style={styles.location}>
          {location}
        </AppText>
      </View>
      
      {notes && (
        <View style={styles.notes}>
          <AppText variant="caption">Notes:</AppText>
          <AppText variant="body" color={colors.neutral[700]}>{notes}</AppText>
        </View>
      )}
      
      <View style={styles.actions}>
        <Button 
          title="Details" 
          variant="outline" 
          size="sm"
          onPress={() => onViewDetails?.(id)}
          style={styles.actionButton}
        />
        {isUpcoming && (
          <>
            <Button 
              title="Reschedule" 
              variant="secondary" 
              size="sm"
              onPress={() => onReschedule?.(id)}
              style={[styles.actionButton, styles.rescheduleButton]}
            />
            <Button 
              title="Cancel" 
              variant="ghost" 
              size="sm"
              textStyle={{ color: colors.error[500] }}
              onPress={() => onCancel?.(id)}
              style={styles.actionButton}
            />
          </>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily.bodyBold,
  },
  details: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  detailText: {
    marginLeft: spacing.sm,
  },
  location: {
    marginTop: spacing.xs,
  },
  notes: {
    padding: spacing.sm,
    backgroundColor: colors.neutral[100],
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  actionButton: {
    minWidth: 90,
    marginRight: spacing.sm,
  },
  rescheduleButton: {
    marginHorizontal: spacing.sm,
  },
});