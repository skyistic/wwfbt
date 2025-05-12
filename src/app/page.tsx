import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: "We Were Fighting Before This Podcast – Hosted by Disguised Toast & Yvonnie Ng",
  description: "Tune in to 'We Were Fighting Before This,' the podcast where Disguised Toast and Yvonnie Ng dive into unfiltered arguments, banter, and real talk. New episode out now – stream it today!",
};

export default function Page() {
  return <ClientPage />;
}
