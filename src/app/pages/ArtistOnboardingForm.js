import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppActions } from '../context/AppContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/Select"; 
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
import { artistCategories, feeRanges, languagesSpoken } from '../data/mockData';
import * as yup from 'yup';

// Artist Onboarding Form Component
// Handles artist submission with validation, dynamic multi-select fields, and user feedback
export default function ArtistOnboardingForm() {
  // Access shared actions from context
  const { addSubmittedArtist, navigate, openDialog } = useAppActions();

  // Define validation schema using Yup
  const schema = yup.object().shape({
    name: yup.string().required('Artist Name is required').min(3, 'Name must be at least 3 characters'),
    bio: yup.string().required('Bio is required').min(20, 'Bio must be at least 20 characters'),
    category: yup.array().min(1, 'Please select at least one category').required('Category is required'),
    languages: yup.array().min(1, 'Please select at least one language').required('Languages are required'),
    feeRange: yup.string().required('Fee Range is required'),
    location: yup.string().required('Location is required').min(2, 'Location must be at least 2 characters'),
    profileImage: yup.mixed()
      // Validate file size if provided
      .test('fileSize', 'File size too large (max 5MB)', (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 5 * 1024 * 1024;
      })
      // Validate file type if provided
      .test('fileType', 'Unsupported file format', (value) => {
        if (!value || !value[0]) return true;
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
      }),
  });

  // Setup form management with default values and validation resolver
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  // Watch selected values for multi-select dropdowns
  const selectedCategories = watch('category');
  const selectedLanguages = watch('languages');

  // Handle category toggle (add/remove)
  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setValue('category', newCategories, { shouldValidate: true });
  };

  // Handle language toggle (add/remove)
  const handleLanguageToggle = (language) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((l) => l !== language)
      : [...selectedLanguages, language];
    setValue('languages', newLanguages, { shouldValidate: true });
  };

  // Form submission handler
  const onSubmit = async (data) => {
    
    addSubmittedArtist(data); // Add artist to context
    openDialog('Success!', 'Artist onboarded successfully!', () => navigate('dashboard')); // Show success dialog
    reset(); // Reset form fields
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter flex items-center justify-center py-8 px-4 text-gray-900 dark:text-gray-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 w-full max-w-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-50 mb-8 text-center">Onboard Your Artist</h2>
        
        {/* Main form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Artist Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-100">Artist Name</label>
            <Input id="name" {...register('name')} placeholder="e.g., Melody Queen" />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>}
          </div>

          {/* Artist Bio Field */}
          <div>
            <label htmlFor="bio" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-100">Bio</label>
            <textarea
              id="bio"
              {...register('bio')}
              rows="5"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
              dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-400"
              placeholder="Tell us about the artist..."
            ></textarea>
            {errors.bio && <p className="text-red-500 text-xs italic mt-1">{errors.bio.message}</p>}
          </div>

          {/* Category Multi-select Dropdown */}
          <MultiSelectDropdown
            label="Category"
            options={artistCategories}
            selectedValues={selectedCategories}
            onToggle={handleCategoryToggle}
            error={errors.category?.message}
          />

          {/* Languages Spoken Multi-select Dropdown */}
          <MultiSelectDropdown
            label="Languages Spoken"
            options={languagesSpoken}
            selectedValues={selectedLanguages}
            onToggle={handleLanguageToggle}
            error={errors.languages?.message}
          />

          {/* Fee Range Select Dropdown */}
          <div>
            <label htmlFor="feeRange" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-100">Fee Range</label>
            <Select {...register('feeRange')} onValueChange={(value) => setValue('feeRange', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Fee Range" />
              </SelectTrigger>
              <SelectContent>
                {feeRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.feeRange && <p className="text-red-500 text-xs italic mt-1">{errors.feeRange.message}</p>}
          </div>

          {/* Location Input Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-100">Location</label>
            <Input type="text" id="location" {...register('location')} placeholder="e.g., Mumbai" />
            {errors.location && <p className="text-red-500 text-xs italic mt-1">{errors.location.message}</p>}
          </div>

          {/* Optional Profile Image Upload */}
          <div>
            <label htmlFor="profileImage" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-100">Profile Image (Optional)</label>
            <Input
              type="file"
              id="profileImage"
              {...register('profileImage')}
              accept="image/*"
              className="file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300 dark:hover:file:bg-indigo-800"
            />
            {errors.profileImage && <p className="text-red-500 text-xs italic mt-1">{errors.profileImage.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Onboard Artist'}
          </Button>
        </form>
      </div>
    </div>
  );
};
