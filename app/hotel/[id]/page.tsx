import HotelDetailClient from './HotelDetailClient';

export async function generateStaticParams() {
  const ids = await fetchHotelIds();
  return ids.map(id => ({ id: id.toString() }));
}
export default function HotelDetail({ params }) {
  return <HotelDetailClient id={params.id} />;
}
async function fetchHotelIds() {
  return [1, 2, 3];
}

