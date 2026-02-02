import { useState, useRef } from "react";
import { Camera, X, Upload, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  userId: string;
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
}

const ImageUpload = ({ userId, onImageUploaded, currentImageUrl }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError, data } = await supabase.storage
        .from("complaint-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("complaint-images")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;
      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);

      toast({
        title: "Image uploaded",
        description: "Your photo has been attached to the complaint.",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        id="complaint-image-upload"
      />

      {previewUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img
            src={previewUrl}
            alt="Complaint preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="complaint-image-upload"
          className={`border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer flex flex-col items-center gap-2 ${
            uploading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {uploading ? (
            <>
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Camera className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Add a Photo</p>
                <p className="text-sm text-muted-foreground">
                  Click to upload or take a photo (max 5MB)
                </p>
              </div>
            </>
          )}
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
