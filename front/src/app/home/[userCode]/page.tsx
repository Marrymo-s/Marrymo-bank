// export { default } from '@/containers/home';
import Home from '@/containers/home';
import InvitationCard from "@/components/InvitationCard";
import {fetchInstance} from "@/services";

interface Props {
  params: { userCode: string};
}

const HomePage = async ({ params }: Props ) => {
  const { userCode } = params;
  const data = await fetchInstance(`users/${userCode}`)

  return <InvitationCard {...data} />
}

export default HomePage;