'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useFetch } from "@/helper/customHook/useFetch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const fetch = useFetch()

  useEffect(() => {
    fetch.get('/user?_id=' + id).then(user => {
      if (user) { setUser(user), setIsLoading(false) };
    })
  }, []);
  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch.put('/user', { ...data, _id: id })
        if (res)
          resolve();
      } catch (error) {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved',
      error: 'An error has occurred while saving the user',
    });
  }

  if (loading) {
    return 'Loading ...';
  }

  if (!data?.isAdmin) {
    return 'Not an admin';
  }


  return (
    !isLoading ?
      user ?
        <section className="mt-8 mx-auto max-w-2xl">
          <UserTabs isAdmin={true} />
          <div className="mt-8">
            <UserForm user={user} onSave={handleSaveButtonClick} />
          </div>
        </section> :
        <>
          <section className="mt-8 text-center">
            <SectionHeaders mainHeader="Ooh No!!!" />
            <p className="mt-4">"can not find user" 😔</p>
          </section>
        </> :
      <>
        <p>Loading...</p>
      </>
  );
}