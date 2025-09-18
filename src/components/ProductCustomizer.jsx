import { useState } from "react";
import LogoUploader from "./LogoUploader";

export default function ProductCustomizer() {
  const [logoUrl, setLogoUrl] = useState("");

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-2">Customize Your Uniform</h2>
      <LogoUploader onUpload={setLogoUrl} />
      <div className="mt-4">
        <div className="relative w-48 h-64 bg-gray-100 border mx-auto flex items-center justify-center">
          <p className="text-gray-400">Uniform Preview</p>
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Uploaded Logo"
              className="absolute w-20 h-20 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
