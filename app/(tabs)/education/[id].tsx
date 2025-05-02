import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Bookmark, Share as ShareIcon } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { colors, spacing, borders } from '@/constants/theme';

// Mock data - in a real app, this would come from your API
const resourceDetails = {
  id: '1',
  title: 'Essential Nutrition During Pregnancy',
  description: 'Learn about the essential nutrients needed during pregnancy and how to incorporate them into your diet.',
  content: [
    {
      type: 'paragraph',
      text: 'Proper nutrition during pregnancy is crucial for both mother and baby. This comprehensive guide will help you understand the most important nutrients and how to ensure you\'re getting enough of them in your daily diet.',
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      caption: 'A balanced diet is essential during pregnancy',
    },
    {
      type: 'heading',
      text: 'Key Nutrients for Pregnancy',
    },
    {
      type: 'paragraph',
      text: 'During pregnancy, your body needs additional nutrients to support your baby\'s growth and development. Here are some of the most important ones:',
    },
    {
      type: 'list',
      items: [
        'Folic Acid: Critical for preventing birth defects',
        'Iron: Supports increased blood volume',
        'Calcium: Builds strong bones and teeth',
        'Protein: Essential for tissue growth',
        'Omega-3 Fatty Acids: Supports brain development',
      ],
    },
  ],
  estimatedReadTime: 8,
  category: 'Nutrition',
  relatedResources: [
    {
      id: '2',
      title: 'Meal Planning for Each Trimester',
      category: 'Nutrition',
      estimatedReadTime: 6,
    },
    {
      id: '3',
      title: 'Managing Morning Sickness',
      category: 'Wellness',
      estimatedReadTime: 5,
    },
  ],
};

export default function ResourceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${resourceDetails.title}`,
        url: `https://your-app.com/education/${id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, you would persist this to storage/backend
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const progress = (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100;
    setReadProgress(Math.min(Math.max(progress, 0), 100));
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              onPress={handleSave}
              style={[styles.iconButton, isSaved && styles.savedButton]}
            >
              <Bookmark 
                size={20} 
                color={isSaved ? colors.neutral.white : colors.neutral[800]}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleShare}
              style={styles.iconButton}
            >
              <ShareIcon size={20} color={colors.neutral[800]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar,
              { width: `${readProgress}%` }
            ]} 
          />
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.meta}>
            <AppText variant="caption" color={colors.primary[600]}>
              {resourceDetails.category}
            </AppText>
            <AppText variant="caption" color={colors.neutral[600]}>
              {resourceDetails.estimatedReadTime} min read
            </AppText>
          </View>

          <AppText variant="heading" style={styles.title}>
            {resourceDetails.title}
          </AppText>

          <AppText variant="body" color={colors.neutral[600]} style={styles.description}>
            {resourceDetails.description}
          </AppText>

          {resourceDetails.content.map((item, index) => {
            switch (item.type) {
              case 'paragraph':
                return (
                  <AppText 
                    key={index}
                    variant="body" 
                    style={styles.paragraph}
                  >
                    {item.text}
                  </AppText>
                );
              case 'image':
                return (
                  <View key={index} style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.url }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    {item.caption && (
                      <AppText 
                        variant="caption" 
                        color={colors.neutral[600]}
                        style={styles.imageCaption}
                      >
                        {item.caption}
                      </AppText>
                    )}
                  </View>
                );
              case 'heading':
                return (
                  <AppText 
                    key={index}
                    variant="headingMedium" 
                    style={styles.sectionHeading}
                  >
                    {item.text}
                  </AppText>
                );
              case 'list':
                return (
                  <View key={index} style={styles.list}>
                    {item.items.map((listItem, itemIndex) => (
                      <View key={itemIndex} style={styles.listItem}>
                        <View style={styles.bullet} />
                        <AppText variant="body" style={styles.listItemText}>
                          {listItem}
                        </AppText>
                      </View>
                    ))}
                  </View>
                );
              default:
                return null;
            }
          })}

          {/* Related Resources */}
          <View style={styles.relatedSection}>
            <AppText variant="headingMedium" style={styles.relatedTitle}>
              Related Resources
            </AppText>
            {resourceDetails.relatedResources.map((resource) => (
              <TouchableOpacity
                key={resource.id}
                style={styles.relatedCard}
                onPress={() => router.push(`/education/${resource.id}`)}
              >
                <View style={styles.relatedContent}>
                  <AppText variant="bodyBold" style={styles.relatedResourceTitle}>
                    {resource.title}
                  </AppText>
                  <View style={styles.relatedMeta}>
                    <AppText variant="caption" color={colors.primary[600]}>
                      {resource.category}
                    </AppText>
                    <AppText variant="caption" color={colors.neutral[600]}>
                      {resource.estimatedReadTime} min read
                    </AppText>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  savedButton: {
    backgroundColor: colors.primary[500],
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: colors.neutral[200],
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary[500],
  },
  content: {
    flex: 1,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  title: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  description: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  paragraph: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    lineHeight: 24,
  },
  imageContainer: {
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageCaption: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    fontStyle: 'italic',
  },
  sectionHeading: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary[500],
    marginTop: 8,
    marginRight: spacing.sm,
  },
  listItemText: {
    flex: 1,
  },
  relatedSection: {
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
  },
  relatedTitle: {
    marginBottom: spacing.md,
  },
  relatedCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borders.radius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    overflow: 'hidden',
  },
  relatedContent: {
    padding: spacing.md,
  },
  relatedResourceTitle: {
    marginBottom: spacing.xs,
  },
  relatedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});