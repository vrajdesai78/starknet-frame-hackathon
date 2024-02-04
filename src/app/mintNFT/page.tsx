'use client';

import ConnectWallet from '@/components/connect-wallet';
import { StarknetProvider } from '@/components/starknet-provider';
import { timeValid } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const mintNFT = ({ params }: { params: { id: string } }) => {
  const [invalidVerification, setInvalidVerification] = useState(false);
  const [fid, setFid] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const messageBytes = params.id;
    if (messageBytes) {
      fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageBytes }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (timeValid(res.timestamp)) {
            setFid(res.fid);
            setTimestamp(res.timestamp);
          } else {
            console.log('Timestamp is older than 30 minutes');
            setInvalidVerification(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setInvalidVerification(true);
        });
    }
  }, [params.id]);

  return (
    <div>
      {invalidVerification ? (
        <div>
          <h1>Invalid Verification</h1>
          <p>The verification link is invalid.</p>
        </div>
      ) : (
        <div>
          <StarknetProvider>
            <ConnectWallet fid={fid} timestamp={timestamp} />
          </StarknetProvider>
        </div>
      )}
    </div>
  );
};

export default mintNFT;
