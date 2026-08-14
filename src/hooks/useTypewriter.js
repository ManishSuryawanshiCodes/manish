import { useState, useEffect, useMemo } from 'react';

export const useTypewriter = (words = [], typingSpeed = 120, deletingSpeed = 80, pauseTime = 2000) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const safeWords = useMemo(() => {
    return Array.isArray(words) && words.length > 0
      ? words
      : ["Full-Stack Developer", "AI SaaS Builder"];
  }, [words]);

  // Typing timer logic
  useEffect(() => {
    const currentWord = safeWords[index % safeWords.length] || "";

    const timer = setTimeout(() => {
      if (!reverse) {
        if (subIndex < currentWord.length) {
          setSubIndex(prev => prev + 1);
        } else {
          setReverse(true);
        }
      } else {
        if (subIndex > 0) {
          setSubIndex(prev => prev - 1);
        } else {
          setReverse(false);
          setIndex(prev => (prev + 1) % safeWords.length);
        }
      }
    }, reverse ? deletingSpeed : (subIndex === currentWord.length ? pauseTime : typingSpeed));

    return () => clearTimeout(timer);
  }, [subIndex, index, reverse, safeWords, typingSpeed, deletingSpeed, pauseTime]);

  const currentWord = safeWords[index % safeWords.length] || "";
  return currentWord.substring(0, Math.max(0, Math.min(subIndex, currentWord.length)));
};
