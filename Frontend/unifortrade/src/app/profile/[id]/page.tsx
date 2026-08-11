import ProfileView from "./ProfileView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  return <ProfileView id={Number(id)} />;
}
