'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { Trash2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80';

type Booking = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roomType?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequest?: string;
  createdAt?: string;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [roomType, setRoomType] = useState<string | ''>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [minGuests, setMinGuests] = useState<number | ''>('');
  const [maxGuests, setMaxGuests] = useState<number | ''>('');

  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const [selected, setSelected] = useState<Booking | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const processed = useMemo(() => {
    let list = [...bookings];

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        b =>
          b.name.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q)
      );
    }

    // Filter Room Type
    if (roomType) {
      list = list.filter(b => b.roomType === roomType);
    }

    // Filter Guests
    if (minGuests !== '') {
      list = list.filter(b => b.guests >= Number(minGuests));
    }
    if (maxGuests !== '') {
      list = list.filter(b => b.guests <= Number(maxGuests));
    }

    // Filter Dates
    if (dateFrom) {
      const from = new Date(dateFrom);
      list = list.filter(b => new Date(b.checkIn) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      list = list.filter(b => new Date(b.checkOut) <= to);
    }

    // Sort
   list.sort((a: Booking, b: Booking) => {
  const aVal = a[sortBy as keyof Booking];
  const bVal = b[sortBy as keyof Booking];

  // guests → numeric
  if (sortBy === "guests") {
    return sortDir === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  }

  // dates or strings
  const aParsed =
    typeof aVal === "string" && !isNaN(Date.parse(aVal))
      ? Date.parse(aVal)
      : String(aVal).toLowerCase();

  const bParsed =
    typeof bVal === "string" && !isNaN(Date.parse(bVal))
      ? Date.parse(bVal)
      : String(bVal).toLowerCase();

  if (aParsed < bParsed) return sortDir === "asc" ? -1 : 1;
  if (aParsed > bParsed) return sortDir === "asc" ? 1 : -1;
  return 0;
});


    return list;
  }, [
    bookings,
    query,
    roomType,
    dateFrom,
    dateTo,
    minGuests,
    maxGuests,
    sortBy,
    sortDir,
  ]);

  const toggleSort = (key: string) => {
    if (sortBy === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = confirm('Delete this booking? This action cannot be undone.');
    if (!ok) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('delete failed');
      toast.success('Booking deleted');
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
    >
      <div className="bg-black/70 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-white mb-6">
          Admin – All Bookings
        </h1>

        <div className="mb-6 space-y-4">
          <div className="flex justify-center flex-wrap gap-3">
            <input
              className=" w-[30%] p-2 rounded bg-gray-800 text-white"
              placeholder="Search by name / email / phone"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            <select
              className="p-2 rounded bg-gray-800 text-white"
              value={roomType}
              onChange={e => setRoomType(e.target.value)}
            >
              <option value="">All room types</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>

            <input
              type="date"
              className="p-2 rounded bg-gray-800 text-white"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
            <input
              type="date"
              className="p-2 rounded bg-gray-800 text-white"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />

            <input
              type="number"
              min={1}
              className="p-2 w-20 rounded bg-gray-800 text-white"
              placeholder="Min G"
value={minGuests === '' ? '' : String(minGuests)}
              onChange={e =>
                setMinGuests(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
            />
            <input
              type="number"
              min={1}
              className="p-2 w-20 rounded bg-gray-800 text-white"
              placeholder="Max G"
              value={maxGuests === '' ? '' : String(maxGuests)}
              onChange={e =>
                setMaxGuests(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
            />

            <button
              className="px-4 py-2 bg-teal-500 rounded-[20px] hover:bg-teal-600"
              onClick={() => {
                setQuery('');
                setRoomType('');
                setDateFrom('');
                setDateTo('');
                setMinGuests('');
                setMaxGuests('');
                toast.success('Filters reset');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-300">Loading …</p>
        ) : (
          <div
            className="
  overflow-x-auto 
  rounded-xl 
  p-4 
  bg-white/40 
  backdrop-blur-lg 
  border border-white/40 
  shadow-[0_8px_32px_rgba(0,0,0,0.25)]
"
          >
            <table className="min-w-full">
              <thead>
                <tr className="bg-white/20 backdrop-blur-md text-black">
                  <th
                    className="p-3 cursor-pointer"
                    onClick={() => toggleSort('name')}
                  >
                    Name{' '}
                    {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>

                  <th
                    className="p-3 cursor-pointer"
                    onClick={() => toggleSort('email')}
                  >
                    Email{' '}
                    {sortBy === 'email' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>

                  <th className="p-3">Phone</th>

                  <th
                    className="p-3 cursor-pointer"
                    onClick={() => toggleSort('checkIn')}
                  >
                    Check-In{' '}
                    {sortBy === 'checkIn'
                      ? sortDir === 'asc'
                        ? '▲'
                        : '▼'
                      : ''}
                  </th>

                  <th
                    className="p-3 cursor-pointer"
                    onClick={() => toggleSort('checkOut')}
                  >
                    Check-Out{' '}
                    {sortBy === 'checkOut'
                      ? sortDir === 'asc'
                        ? '▲'
                        : '▼'
                      : ''}
                  </th>

                  <th className="p-3">Guests</th>
                  <th className="p-3">Room Type</th>

                  <th className="p-3">Special Request</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {processed.map(b => (
                  <tr
                    key={b._id}
                    className="
            border-b border-white/20 
            hover:bg-white/10 
            text-black
            text-center
          "
                  >
                    <td className="p-3">{b.name}</td>
                    <td className="p-3">{b.email}</td>
                    <td className="p-3">{b.phone}</td>
                    <td className="p-3">{b.checkIn}</td>
                    <td className="p-3">{b.checkOut}</td>
                    <td className="p-3">{b.guests}</td>
                    <td className="p-3">{b.roomType}</td>

                    <td className="p-3 italic">{b.specialRequest || '—'}</td>

                    <td className="p-3 space-x-2 flex">
                      <button
                        className="px-3 py-1 cursor-pointer bg-teal-500/80 shadow-lg rounded-[20px] hover:bg-yellow-600 text-sm"
                        onClick={() => setSelected(b)}
                      >
                        View
                      </button>

                      <button
                        className="p-2  rounded-full cursor-pointer text-sm flex items-center justify-center"
                        onClick={() => handleDelete(b._id)}
                        disabled={deletingId === b._id}
                      >
                        {deletingId === b._id ? (
                          '...'
                        ) : (
                          <Trash2 className="h-4 w-4 text-black hover:text-red-800 " />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected && (
          <div className="fixed inset-0 bg-black/60 grid place-items-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full text-black shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Booking Details</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Name:</strong> {selected.name}
                </p>
                <p>
                  <strong>Email:</strong> {selected.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selected.phone}
                </p>
                <p>
                  <strong>Room Type:</strong> {selected.roomType || '—'}
                </p>
                <p>
                  <strong>Check-In:</strong> {selected.checkIn}
                </p>
                <p>
                  <strong>Check-Out:</strong> {selected.checkOut}
                </p>
                <p>
                  <strong>Guests:</strong> {selected.guests}
                </p>
                <p>
                  <strong>Special Request:</strong>{' '}
                  {selected.specialRequest || 'None'}
                </p>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => {
                    handleDelete(selected._id);
                    setSelected(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
