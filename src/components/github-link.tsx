import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Icons } from './icons';

const FALLBACK_STAR_COUNT = 0;

async function getGithubStarCount(): Promise<number> {
  try {
    const res = await fetch('https://ungh.cc/repos/pocket-id/pocket-id');
    const data = await res.json();
    return data.repo?.stars ?? FALLBACK_STAR_COUNT;
  } catch (error) {
    console.error(error);
    return FALLBACK_STAR_COUNT;
  }
}

export default function GithubLink() {
  const [stars, setStars] = useState(FALLBACK_STAR_COUNT);

  useEffect(() => {
    const fetchStars = async () => {
      const starCount = await getGithubStarCount();
      setStars(starCount);
    };

    fetchStars();
  }, []);

  const formatStars = (count: number): string => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toLocaleString();
  };

  return (
    <Button asChild variant="outline" className="shadow-none">
      <a href="https://github.com/pocket-id/pocket-id" target="_blank" rel="noreferrer" className="no-underline">
        <Icons.gitHub className="text-white" />
        <span className="text-muted-foreground text-xs tabular-nums">{formatStars(stars)}</span>
      </a>
    </Button>
  );
}
