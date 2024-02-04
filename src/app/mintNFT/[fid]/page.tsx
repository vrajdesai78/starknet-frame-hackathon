import Minter from '@/components/minter';

const MintNFT = async ({ params }: { params: { fid: string } }) => {
  return <Minter id={undefined} farcasterId={params.fid} />;
};

export default MintNFT;
