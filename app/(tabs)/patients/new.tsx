import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import { colors, spacing, typography, borders } from '@/constants/theme';

export default function NewPatientScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    
    lastMenstrualPeriod: '',
    previousPregnancies: '',
    notes: '',
  });

  const handleSubmit = () => {
    // Here you would typically save the patient data to your backend
    console.log('Form data:', formData);
    router.back();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.dateOfBirth.trim() &&
      formData.email.trim() &&
      formData.phone.trim()
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            variant="ghost"
            leftIcon={<ChevronLeft size={24} color={colors.neutral[800]} />}
            title="Back"
            onPress={() => router.back()}
          />
          <AppText variant="title">New Patient</AppText>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Personal Information */}
          <View style={styles.section}>
            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Personal Information
            </AppText>
            
            <View style={styles.inputContainer}>
              <AppText variant="caption">First Name *</AppText>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => updateFormData('firstName', value)}
                placeholder="Enter first name"
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Last Name *</AppText>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => updateFormData('lastName', value)}
                placeholder="Enter last name"
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Date of Birth *</AppText>
              <TextInput
                style={styles.input}
                value={formData.dateOfBirth}
                onChangeText={(value) => updateFormData('dateOfBirth', value)}
                placeholder="MM/DD/YYYY"
              />
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Contact Information
            </AppText>
            
            <View style={styles.inputContainer}>
              <AppText variant="caption">Email *</AppText>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Phone *</AppText>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Address</AppText>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.address}
                onChangeText={(value) => updateFormData('address', value)}
                placeholder="Enter full address"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.section}>
            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Emergency Contact
            </AppText>
            
            <View style={styles.inputContainer}>
              <AppText variant="caption">Name</AppText>
              <TextInput
                style={styles.input}
                value={formData.emergencyContactName}
                onChangeText={(value) => updateFormData('emergencyContactName', value)}
                placeholder="Enter emergency contact name"
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Phone</AppText>
              <TextInput
                style={styles.input}
                value={formData.emergencyContactPhone}
                onChangeText={(value) => updateFormData('emergencyContactPhone', value)}
                placeholder="Enter emergency contact phone"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Relationship</AppText>
              <TextInput
                style={styles.input}
                value={formData.emergencyContactRelation}
                onChangeText={(value) => updateFormData('emergencyContactRelation', value)}
                placeholder="Enter relationship"
              />
            </View>
          </View>

          {/* Medical History */}
          <View style={styles.section}>
            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Medical History
            </AppText>
            
            <View style={styles.inputContainer}>
              <AppText variant="caption">Medical Conditions</AppText>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.medicalHistory}
                onChangeText={(value) => updateFormData('medicalHistory', value)}
                placeholder="Enter any medical conditions"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Current Medications</AppText>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.currentMedications}
                onChangeText={(value) => updateFormData('currentMedications', value)}
                placeholder="Enter current medications"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Allergies</AppText>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.allergies}
                onChangeText={(value) => updateFormData('allergies', value)}
                placeholder="Enter any allergies"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Pregnancy Information */}
          <View style={styles.section}>
            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Pregnancy Information
            </AppText>
            
            <View style={styles.inputContainer}>
              <AppText variant="caption">Last Menstrual Period</AppText>
              <TextInput
                style={styles.input}
                value={formData.lastMenstrualPeriod}
                onChangeText={(value) => updateFormData('lastMenstrualPeriod', value)}
                placeholder="MM/DD/YYYY"
              />
            </View>

            <View style={styles.inputContainer}>
              <AppText variant="caption">Previous Pregnancies</AppText>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.previousPregnancies}
                onChangeText={(value) => updateFormData('previousPregnancies', value)}
                placeholder="Enter details about previous pregnancies"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Additional Notes */}
          <View style={styles.section}>
            <AppText variant="bodyBold" style={styles.sectionTitle}>
              Additional Notes
            </AppText>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.notes}
                onChangeText={(value) => updateFormData('notes', value)}
                placeholder="Enter any additional notes"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Add Patient"
            onPress={handleSubmit}
            disabled={!isValid()}
            fullWidth
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: borders.radius.md,
    padding: spacing.sm,
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[800],
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
});