'use client';

import HeaderNavbar from '@/components/HeaderNavbar';
import { UserProfile } from './UserProfile';

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      <div className="pt-16">
        <UserProfile />
      </div>
    </div>
  );
}