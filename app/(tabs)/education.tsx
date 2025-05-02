import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Search, BookOpen, Video, Filter } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import ResourceCard, { ResourceProps } from '@/components/education/ResourceCard';
import { colors, spacing, typography, borders } from '@/constants/theme';

// Mock data
const resources: ResourceProps[] = [
  {
    id: '1',
    title: 'Essential Nutrition During Pregnancy',
    description: 'Learn about the essential nutrients needed during pregnancy and how to incorporate them into your diet.',
    category: 'Nutrition',
    imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    estimatedReadTime: 8,
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Understanding Your Changing Body',
    description: 'A comprehensive guide to the physical changes your body undergoes during pregnancy.',
    category: 'Body Changes',
    imageUrl: 'https://images.pexels.com/photos/5938649/pexels-photo-5938649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    estimatedReadTime: 10,
  },
  {
    id: '3',
    title: 'Preparing for Labor and Delivery',
    description: 'Essential tips and techniques to prepare for a smooth labor and delivery experience.',
    category: 'Labor & Delivery',
    imageUrl: 'https://images.pexels.com/photos/5938650/pexels-photo-5938650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    estimatedReadTime: 15,
  },
  {
    id: '4',
    title: 'Newborn Care Basics',
    description: 'Learn essential skills for caring for your newborn in the first weeks after birth.',
    category: 'Newborn Care',
    imageUrl: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    estimatedReadTime: 12,
  },
];

type CategoryType = 'All' | 'Nutrition' | 'Body Changes' | 'Labor & Delivery' | 'Newborn Care' | 'Mental Health';

export default function EducationScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  
  const categories: CategoryType[] = [
    'All', 
    'Nutrition', 
    'Body Changes', 
    'Labor & Delivery', 
    'Newborn Care', 
    'Mental Health'
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleToggleFavorite = (id: string, favorite: boolean) => {
    console.log(`Toggle favorite for resource ${id} to ${favorite}`);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="title">Educational Resources</AppText>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.neutral[500]}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === item && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <AppText
                  variant="body"
                  color={selectedCategory === item ? colors.neutral.white : colors.neutral[800]}
                >
                  {item}
                </AppText>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Content Types */}
        <View style={styles.contentTypes}>
          <TouchableOpacity style={styles.contentTypeButton}>
            <BookOpen size={18} color={colors.primary[500]} />
            <AppText 
              variant="bodyBold" 
              color={colors.primary[500]}
              style={styles.contentTypeText}
            >
              Articles
            </AppText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.contentTypeButton, styles.contentTypeInactive]}>
            <Video size={18} color={colors.neutral[600]} />
            <AppText 
              variant="body" 
              color={colors.neutral[600]}
              style={styles.contentTypeText}
            >
              Videos
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Resource List */}
        <FlatList
          data={filteredResources}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ResourceCard
              {...item}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <BookOpen size={48} color={colors.neutral[400]} />
              <AppText variant="body" color={colors.neutral[600]} style={styles.emptyText}>
                No resources found
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
  filterButton: {
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
    marginBottom: spacing.md,
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
  categoriesContainer: {
    marginBottom: spacing.md,
  },
  categoryButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borders.radius.full,
    backgroundColor: colors.neutral[200],
    marginRight: spacing.sm,
  },
  selectedCategory: {
    backgroundColor: colors.primary[500],
  },
  contentTypes: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  contentTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borders.radius.md,
    backgroundColor: colors.primary[100],
    marginRight: spacing.md,
  },
  contentTypeInactive: {
    backgroundColor: colors.neutral[200],
  },
  contentTypeText: {
    marginLeft: spacing.xs,
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