import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeout: number;

    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  });

  const copyToClipboard = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
          toast.success(`${text} is copied to clipboard`);
        })
        .catch((err) => {
          setIsCopied(false);
        });
    } else {
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setIsCopied(true);
        toast.success(`${text} is copied to clipboard`);
      } catch (err) {
        setIsCopied(false);
      }
    }
  }, []);

  return { copyToClipboard, isCopied };
};

export default useCopyToClipboard;
