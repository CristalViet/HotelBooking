'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Upload, 
  X, 
  Image as ImageIcon, 
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface PhotoUploaderProps {
  photos: File[];
  onPhotoUpload: (photos: File[]) => void;
}

const PhotoUploader = ({ photos, onPhotoUpload }: PhotoUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxPhotos = 10;
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload only JPEG, PNG, or WebP images';
    }
    if (file.size > maxFileSize) {
      return 'File size must be less than 5MB';
    }
    return null;
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else if (photos.length + newFiles.length < maxPhotos) {
        newFiles.push(file);
      } else {
        errors.push(`Maximum ${maxPhotos} photos allowed`);
      }
    });

    if (errors.length > 0) {
      setUploadError(errors[0]);
      setTimeout(() => setUploadError(''), 5000);
    } else {
      setUploadError('');
    }

    if (newFiles.length > 0) {
      onPhotoUpload([...photos, ...newFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onPhotoUpload(updatedPhotos);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getPhotoPreview = (file: File): string => {
    return URL.createObjectURL(file);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <Camera className="w-5 h-5 mr-2 text-blue-600" />
          Share Your Photos
          <Badge variant="secondary" className="ml-2">
            Optional
          </Badge>
        </CardTitle>
        <p className="text-gray-600">
          Help other travelers by sharing photos of your stay. You can upload up to {maxPhotos} photos.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Drop photos here or click to upload
              </h3>
              <p className="text-gray-600 mb-4">
                JPEG, PNG, or WebP files up to 5MB each
              </p>
              
              <Button 
                onClick={openFileDialog}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose Photos
              </Button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{uploadError}</span>
          </div>
        )}

        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Uploaded Photos ({photos.length}/{maxPhotos})
              </h3>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Ready to share</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={getPhotoPreview(photo)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  
                  {/* File Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-xs truncate">{photo.name}</p>
                    <p className="text-xs text-gray-300">
                      {(photo.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Add More Button */}
              {photos.length < maxPhotos && (
                <button
                  onClick={openFileDialog}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all duration-200 group"
                >
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
                    <span className="text-sm text-gray-500 group-hover:text-blue-600">
                      Add More
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Photo Tips */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2">Photo Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Show the room, bathroom, and views</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Capture hotel amenities and facilities</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Include food and dining experiences</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Take well-lit, clear photos</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUploader;