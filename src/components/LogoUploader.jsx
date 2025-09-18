import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LogoUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("logos")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("logos")
        .getPublicUrl(fileName);

      onUpload(data.publicUrl);
    } catch (err) {
      console.error("Upload error:", err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="my-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
