import axios from 'axios';
import { useEffect, useState } from 'react';

async function getTwitchStatus() {
  const status = await axios.get('/api/twitch').then((res) => res.data);
  return status;
}

export function useLive() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const execute = async () => {
      const isLive = await getTwitchStatus();
      setLive(isLive);
    };

    execute();

    const id = setInterval(() => execute(), 60000);
    return () => clearInterval(id);
  }, []);
  return live;
}
