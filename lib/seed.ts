import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const hashedPassword = await hash('password123', 12)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'sarah.johnson@email.com' },
    update: {},
    create: {
      email: 'sarah.johnson@email.com',
      password: hashedPassword,
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      loyaltyTier: 'GOLD',
      loyaltyPoints: 8750,
      language: 'en',
      memberSince: new Date('2020-03-15'),
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'john.doe@email.com' },
    update: {},
    create: {
      email: 'john.doe@email.com',
      password: hashedPassword,
      name: 'John Doe',
      phone: '+1 (555) 987-6543',
      loyaltyTier: 'SILVER',
      loyaltyPoints: 3200,
      language: 'en',
      memberSince: new Date('2021-06-20'),
    },
  })

  // Create sample hotels
  const hotel1 = await prisma.hotel.upsert({
    where: { id: 'hotel_paris_001' },
    update: {},
    create: {
      id: 'hotel_paris_001',
      name: 'Hotel des Grands Boulevards',
      description: 'Luxury hotel in the heart of Paris with stunning views of the Eiffel Tower',
      location: 'Paris, France',
      address: '123 Champs-Élysées, 75008 Paris, France',
      city: 'Paris',
      country: 'France',
      postalCode: '75008',
      latitude: 48.8566,
      longitude: 2.3522,
      rating: 4.8,
      reviews: 1247,
      priceFrom: 285,
      priceTo: 850,
      starRating: 5,
      isFeatured: true,
    },
  })

  const hotel2 = await prisma.hotel.upsert({
    where: { id: 'hotel_tokyo_001' },
    update: {},
    create: {
      id: 'hotel_tokyo_001',
      name: 'Park Hyatt Tokyo',
      description: 'Iconic luxury hotel with panoramic city views and world-class service',
      location: 'Tokyo, Japan',
      address: '3-7-1-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-1055, Japan',
      city: 'Tokyo',
      country: 'Japan',
      postalCode: '163-1055',
      latitude: 35.6762,
      longitude: 139.6503,
      rating: 4.9,
      reviews: 892,
      priceFrom: 320,
      priceTo: 1200,
      starRating: 5,
      isFeatured: true,
    },
  })

  const hotel3 = await prisma.hotel.upsert({
    where: { id: 'hotel_santorini_001' },
    update: {},
    create: {
      id: 'hotel_santorini_001',
      name: 'Canaves Oia Suites',
      description: 'Boutique hotel with infinity pools and breathtaking caldera views',
      location: 'Santorini, Greece',
      address: 'Oia, Santorini 847 02, Greece',
      city: 'Oia',
      country: 'Greece',
      postalCode: '847 02',
      latitude: 36.4619,
      longitude: 25.3764,
      rating: 4.7,
      reviews: 634,
      priceFrom: 210,
      priceTo: 650,
      starRating: 4,
      isFeatured: false,
    },
  })

  // Create hotel images
  await prisma.hotelImage.createMany({
    data: [
      {
        hotelId: hotel1.id,
        url: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Eiffel Tower view from hotel',
        isPrimary: true,
        order: 1,
      },
      {
        hotelId: hotel1.id,
        url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Hotel lobby',
        isPrimary: false,
        order: 2,
      },
      {
        hotelId: hotel2.id,
        url: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Tokyo city view',
        isPrimary: true,
        order: 1,
      },
      {
        hotelId: hotel3.id,
        url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Santorini caldera view',
        isPrimary: true,
        order: 1,
      },
    ],
    skipDuplicates: true,
  })

  // Create hotel amenities
  await prisma.hotelAmenity.createMany({
    data: [
      { hotelId: hotel1.id, name: 'Free WiFi', icon: 'wifi', category: 'Internet' },
      { hotelId: hotel1.id, name: 'Swimming Pool', icon: 'pool', category: 'Recreation' },
      { hotelId: hotel1.id, name: 'Spa & Wellness', icon: 'spa', category: 'Wellness' },
      { hotelId: hotel1.id, name: 'Restaurant', icon: 'restaurant', category: 'Dining' },
      { hotelId: hotel2.id, name: 'Free WiFi', icon: 'wifi', category: 'Internet' },
      { hotelId: hotel2.id, name: 'Fitness Center', icon: 'fitness', category: 'Recreation' },
      { hotelId: hotel2.id, name: 'Business Center', icon: 'business', category: 'Business' },
      { hotelId: hotel3.id, name: 'Free WiFi', icon: 'wifi', category: 'Internet' },
      { hotelId: hotel3.id, name: 'Infinity Pool', icon: 'pool', category: 'Recreation' },
      { hotelId: hotel3.id, name: 'Terrace', icon: 'terrace', category: 'Outdoor' },
    ],
    skipDuplicates: true,
  })

  // Create rooms
  const room1 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      name: 'Deluxe Suite',
      description: 'Spacious suite with Eiffel Tower view and luxury amenities',
      type: 'Suite',
      capacity: 2,
      price: 450,
      discount: 0,
    },
  })

  const room2 = await prisma.room.create({
    data: {
      hotelId: hotel2.id,
      name: 'City View Room',
      description: 'Modern room with panoramic Tokyo city views',
      type: 'Standard',
      capacity: 1,
      price: 320,
      discount: 0,
    },
  })

  const room3 = await prisma.room.create({
    data: {
      hotelId: hotel3.id,
      name: 'Infinity Pool Suite',
      description: 'Luxury suite with private infinity pool and caldera views',
      type: 'Suite',
      capacity: 2,
      price: 210,
      discount: 0,
    },
  })

  // Create sample bookings
  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id,
      hotelId: hotel1.id,
      bookingReference: 'PF2024001',
      status: 'CONFIRMED',
      checkIn: new Date('2024-12-15'),
      checkOut: new Date('2024-12-22'),
      guests: 2,
      totalAmount: 2850,
      currency: 'USD',
      specialRequests: 'Late check-in requested',
    },
  })

  const booking2 = await prisma.booking.create({
    data: {
      userId: user1.id,
      hotelId: hotel2.id,
      bookingReference: 'TJ2024002',
      status: 'COMPLETED',
      checkIn: new Date('2024-03-10'),
      checkOut: new Date('2024-03-17'),
      guests: 1,
      totalAmount: 3200,
      currency: 'USD',
    },
  })

  const booking3 = await prisma.booking.create({
    data: {
      userId: user1.id,
      hotelId: hotel3.id,
      bookingReference: 'SG2024003',
      status: 'COMPLETED',
      checkIn: new Date('2024-08-05'),
      checkOut: new Date('2024-08-12'),
      guests: 2,
      totalAmount: 2100,
      currency: 'USD',
    },
  })

  // Create booking rooms
  await prisma.bookingRoom.createMany({
    data: [
      { bookingId: booking1.id, roomId: room1.id, quantity: 1, price: 450 },
      { bookingId: booking2.id, roomId: room2.id, quantity: 1, price: 320 },
      { bookingId: booking3.id, roomId: room3.id, quantity: 1, price: 210 },
    ],
    skipDuplicates: true,
  })

  // Create guest info
  await prisma.guestInfo.createMany({
    data: [
      {
        bookingId: booking1.id,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        isPrimary: true,
      },
      {
        bookingId: booking1.id,
        name: 'Michael Johnson',
        email: 'michael.johnson@email.com',
        phone: '+1 (555) 123-4568',
        isPrimary: false,
      },
      {
        bookingId: booking2.id,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        isPrimary: true,
      },
      {
        bookingId: booking3.id,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        isPrimary: true,
      },
      {
        bookingId: booking3.id,
        name: 'Michael Johnson',
        email: 'michael.johnson@email.com',
        phone: '+1 (555) 123-4568',
        isPrimary: false,
      },
    ],
    skipDuplicates: true,
  })

  // Create sample reviews
  await prisma.review.createMany({
    data: [
      {
        userId: user1.id,
        hotelId: hotel2.id,
        bookingId: booking2.id,
        overallRating: 5,
        cleanliness: 5,
        service: 5,
        location: 5,
        value: 4,
        title: 'Exceptional experience at Park Hyatt Tokyo',
        content: 'The service was impeccable and the views were breathtaking. Highly recommend!',
        isVerified: true,
        isHelpful: 12,
      },
      {
        userId: user1.id,
        hotelId: hotel3.id,
        bookingId: booking3.id,
        overallRating: 4,
        cleanliness: 4,
        service: 4,
        location: 5,
        value: 4,
        title: 'Beautiful location with amazing views',
        content: 'The infinity pool was incredible and the staff was very friendly.',
        isVerified: true,
        isHelpful: 8,
      },
    ],
    skipDuplicates: true,
  })

  // Create user preferences
  await prisma.userPreference.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      language: 'en',
      currency: 'USD',
      timezone: 'America/New_York',
      searchHistory: [],
      favorites: [],
    },
  })

  await prisma.userPreference.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      language: 'en',
      currency: 'USD',
      timezone: 'America/Los_Angeles',
      searchHistory: [],
      favorites: [],
    },
  })

  // Create notification settings
  await prisma.notificationSettings.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      email: true,
      push: true,
      sms: false,
      marketing: true,
      bookingUpdates: true,
      priceAlerts: true,
      promotions: true,
    },
  })

  console.log('✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 