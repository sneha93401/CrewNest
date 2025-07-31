

'use client';

import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/../convex/_generated/api';

export default function UserDetailsForm() {
  const router = useRouter();
  const user = useQuery(api.users.current);
  const createProfile = useMutation(api.profiles.createProfile);

  const [form, setForm] = useState({
    name: '',
    age: '',
    contact: '',
    bio: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) {
      alert('User not found!');
      return;
    }

    try {
      await createProfile({
        userId: user._id,
        ...form,
      });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return <div className="text-center py-10">Loading profile-form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}
