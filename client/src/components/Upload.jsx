import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useRef } from "react";
import { IoAdd } from "react-icons/io5";

const Upload = ({ setImage }) => {
  const fileInputRef = useRef(null);
  const abortController = new AbortController();

  //authentication check for imdfkit
  const authenticator = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth");
    if (!res.ok) throw new Error("Auth failed");
    return res.json();
  };

  // main upload handler
  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    // Convert to base64 for Gemini
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];

      setImage(prev => ({
        ...prev,
        isLoading: true,
        aiData: {
          data: base64,
          mimeType: file.type,
        },
      }));
    };
    reader.readAsDataURL(file);

    // Upload to ImageKit
    let auth;
    try {
      auth = await authenticator();
    } catch (error) {
      console.error("Auth error:", error);
      return;
    }

    const { signature, expire, token, publicKey } = auth;

    try {
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        expire,
        token,
        signature,
        publicKey,
        abortSignal: abortController.signal,
      });

      setImage(prev => ({
        ...prev,
        isLoading: false,
        dbData: uploadResponse,
      }));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    < div className="flex place-self-end">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
      />

      <button
        onClick={() => fileInputRef.current.click()}
        className="flex py-2  lg:p-2 rounded-full hover:bg-(--ternary-bg-color)"
      >
        <IoAdd className="text-3xl" />
      </button>
    </div>
  );
};

export default Upload;

