'use client';
import EditableImage from "@/components/layout/EditableImage";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useFetch } from "@/helper/customHook/useFetch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  // const session = useSession();
  const fetch = useFetch()
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  // const { status } = session;

  useEffect(() => {
    // if (status === 'authenticated') {
    fetch.get('/user').then(data => {
      setUser(data);
      setIsAdmin(data.isAdmin);
      setProfileFetched(true);
    });
  }, []);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch.put('/user', data)
        if (response) resolve()
      } catch (error) {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    });
  }
  if (!profileFetched) {
    return 'Loading...';
  }
  // if (status === 'unauthenticated') {
  //   return redirect('/login');
  // }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-4xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} isAdmin={isAdmin} />
      </div>
    </section>
  );
}