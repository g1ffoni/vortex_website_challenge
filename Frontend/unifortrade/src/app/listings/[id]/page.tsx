import ListingDetail from "./ListingDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  return <ListingDetail id={Number(id)} />;
}
