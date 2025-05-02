import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Card from '@/components/common/Card';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import { colors, spacing, borders } from '@/constants/theme';

const { width } = Dimensions.get('window');

export interface ResourceProps {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  estimatedReadTime?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, favorite: boolean) => void;
}

export default function ResourceCard({
  id,
  title,
  description,
  category,
  imageUrl,
  estimatedReadTime,
  isFavorite = false,
  onToggleFavorite,
}: ResourceProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/education/${id}`);
  };

  return (
    <Card 
      variant="elevated" 
      padding="none" 
      style={styles.card}
      onPress={handlePress}
    >
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <BookOpen color={colors.primary[500]} size={40} />
        </View>
      )}
      
      <View style={styles.content}>
        <View style={styles.category}>
          <AppText variant="caption" color={colors.primary[600]}>
            {category}
          </AppText>
        </View>
        
        <AppText variant="headingMedium" style={styles.title}>
          {title}
        </AppText>
        
        <AppText variant="body" color={colors.neutral[600]} style={styles.description}>
          {description.length > 100 
            ? description.substring(0, 100) + '...' 
            : description}
        </AppText>
        
        <View style={styles.meta}>
          {estimatedReadTime && (
            <View style={styles.readTime}>
              <AppText variant="caption" color={colors.neutral[500]}>
                {estimatedReadTime} min read
              </AppText>
            </View>
          )}
          
          {onToggleFavorite && (
            <Button 
              title={isFavorite ? "Saved" : "Save"} 
              variant={isFavorite ? "primary" : "outline"}
              size="sm"
              onPress={() => onToggleFavorite(id, !isFavorite)} 
            />
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 2 * spacing.md,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: borders.radius.lg,
    borderTopRightRadius: borders.radius.lg,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: borders.radius.lg,
    borderTopRightRadius: borders.radius.lg,
  },
  content: {
    padding: spacing.md,
  },
  category: {
    marginBottom: spacing.xs,
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});