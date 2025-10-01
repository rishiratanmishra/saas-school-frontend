'use client';
import OrganisationDetails from '@/components/users/admin/Dashboard/Organisation/OrganisationDetails';
import { useGetOrganisationDetails } from '@/service/OrganisationService';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { slug } = useParams();

  const { data: organisation } = useGetOrganisationDetails({
    _id: slug,
  });

  if (!slug) {
    return <div>Error: Missing organisation slug.</div>;
  }

  return (
    <div>
      <OrganisationDetails organisation={organisation?.data} />
    </div>
  );
};

export default Page;
