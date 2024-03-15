// TODO: 청첩장 카드
import CardTop from '@/components/InvitationCard/cardTop';
import Sentence from '@/components/InvitationCard/sentence';
import CardMid from '@/components/InvitationCard/cardMid';
import Location from '@/components/InvitationCard/location';
import Album from '@/components/InvitationCard/album';
import Wishlist from '@/components/InvitationCard/wishlist';

// 타입지정하고 값 내려줘야할듯
const InvitationCard = () => {
  return (
    <main>
      <CardTop />
      <hr />
      <Sentence />
      <hr />
      <CardMid />
      <hr />
      <Location />
      <hr />
      <Album />
      <hr />
      <Wishlist />
    </main>
  )
}

export default InvitationCard;
