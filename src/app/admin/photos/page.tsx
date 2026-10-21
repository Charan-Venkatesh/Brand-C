"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Upload, Trash2, CheckCircle2, Star, User, Shield } from "lucide-react";
import { HCCStore, MediaItem } from "@/lib/store";

export default function AdminPhotos() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState("Profile");
  const [classification, setClassification] = useState("PUBLIC");
  const [isHero, setIsHero] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const loadMedia = async () => {
    setLoading(false);
    const data = await HCCStore.getMedia();
    setMediaList(data);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAltText(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("category", category);
    formData.append("classification", classification);
    formData.append("altText", altText);
    formData.append("isHero", isHero ? "true" : "false");
    formData.append("isPrimary", isPrimary ? "true" : "false");

    const created = await HCCStore.uploadMedia(formData);
    setUploading(false);

    if (created) {
      setMediaList([created, ...mediaList]);
      setSelectedFile(null);
      setPreviewUrl(null);
      setNotification(`Photo "${created.fileName}" uploaded & persisted successfully!`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleSetHero = async (item: MediaItem) => {
    const ok = await HCCStore.setHeroMedia(item.id);
    if (ok) {
      setMediaList(mediaList.map((m) => ({ ...m, isHero: m.id === item.id })));
      setNotification(`Set ${item.fileName} as Homepage Hero Photo!`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleSetPrimary = async (item: MediaItem) => {
    const ok = await HCCStore.setPrimaryMedia(item.id);
    if (ok) {
      setMediaList(mediaList.map((m) => ({ ...m, isPrimary: m.id === item.id })));
      setNotification(`Set ${item.fileName} as Primary Profile Photo!`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (confirm(`Delete photo "${item.fileName}"?`)) {
      const ok = await HCCStore.deleteMedia(item.id);
      if (ok) {
        setMediaList(mediaList.filter((m) => m.id !== item.id));
        setNotification(`Photo removed.`);
        setTimeout(() => setNotification(null), 4000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <ImageIcon className="w-6 h-6 text-blue-600" />
            <span>Profile Photos & Media Library</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real multipart upload to server storage with instant database persistence. Set your Hero and Primary photo without changing source code.
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Upload Box */}
      <form onSubmit={handleUpload} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
          <Upload className="w-4 h-4 text-blue-600" />
          <span>Upload Real Photo / Media Asset</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Select File</label>
            <input
              type="file"
              accept="image/*,.pdf"
              required
              onChange={handleFileChange}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewUrl && (
              <div className="mt-3 p-2 bg-slate-50 border border-slate-200 rounded-lg inline-block">
                <p className="text-[10px] text-slate-400 mb-1">Upload Preview:</p>
                <img src={previewUrl} alt="Preview" className="h-28 w-28 object-cover rounded-md border border-slate-200" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              >
                <option value="Profile">Profile Photo</option>
                <option value="Professional">Professional Photo</option>
                <option value="Projects">Projects Screenshot</option>
                <option value="Efftronics">Efftronics R&D</option>
                <option value="Meghana Technologies">Meghana Technologies</option>
                <option value="Indian Navy / Defense">Indian Navy / Defense (Protected)</option>
                <option value="GDSC">Google Developer Student Club</option>
                <option value="Hult Prize">Hult Prize</option>
                <option value="Certifications">Certifications</option>
                <option value="Events">Events & Speaking</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Classification (Security)</label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              >
                <option value="PUBLIC">PUBLIC (Visible on Public Website)</option>
                <option value="LIMITED DETAILS">LIMITED DETAILS (Watermarked / restricted view)</option>
                <option value="PRIVATE">PRIVATE (Internal Only / Defense Restricted)</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 pt-1">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHero}
                  onChange={(e) => setIsHero(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-700">Set as Homepage Hero Photo</span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-700">Set as Primary Profile Photo</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-200">
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition disabled:opacity-50 flex items-center space-x-2"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? "Uploading to Server..." : "Upload Photo to Library"}</span>
          </button>
        </div>
      </form>

      {/* Media Grid */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Media Assets & Photos in Database ({mediaList.length})
        </h2>

        {mediaList.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No media uploaded yet. Use the upload box above to add your headshot, project screenshots, or event photos.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mediaList.map((item) => (
              <div key={item.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video rounded-md overflow-hidden bg-slate-200 mb-2 border border-slate-200">
                    <img
                      src={`http://localhost:5000${item.publicUrl}`}
                      alt={item.altText || item.fileName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute top-1.5 right-1.5 flex space-x-1">
                      {item.isHero && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-600 text-white uppercase shadow-sm">
                          Hero Photo
                        </span>
                      )}
                      {item.isPrimary && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-600 text-white uppercase shadow-sm">
                          Primary
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="font-semibold text-xs text-slate-900 truncate" title={item.fileName}>
                    {item.fileName}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between mt-0.5">
                    <span>{item.category}</span>
                    <span className="px-1 rounded bg-slate-200 text-slate-700 text-[9px] font-bold">
                      {item.classification}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200 text-xs">
                  <div className="flex items-center space-x-1">
                    {!item.isHero && (
                      <button
                        onClick={() => handleSetHero(item)}
                        className="p-1 text-slate-500 hover:text-blue-600"
                        title="Set as Hero Photo"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {!item.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(item)}
                        className="p-1 text-slate-500 hover:text-emerald-600"
                        title="Set as Primary Profile"
                      >
                        <User className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(item)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
