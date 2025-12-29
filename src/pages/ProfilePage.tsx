import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Shield,
  Save,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Button from "../components/Button";
import Input from "../components/Input";
import axiosInstance from "../api/axiosInstance";

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    university: "",
    avatar: user?.avatar || "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        avatar: user.avatar || "",
      }));
    }
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, avatar: data.secure_url }));

        // Auto-save the avatar to the backend
        await axiosInstance.patch("/ambassador/me", {
          avatar: data.secure_url,
        });
        updateUser({ avatar: data.secure_url });

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error?.message || "Cloudinary upload failed");
      }
    } catch (err: any) {
      console.error("Cloudinary Upload Error:", err);
      setError("Failed to upload image. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axiosInstance.patch("/ambassador/me", {
        phone: formData.phone,
        university: formData.university,
        avatar: formData.avatar,
      });

      updateUser({
        avatar: response.data.profile?.avatar,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-neutral-900">
          Your Profile
        </h1>
        <p className="text-neutral-500 text-sm mt-1 font-heading">
          Manage your personal information and account settings.
        </p>
      </div>

      {(success || error) && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 font-bold font-heading text-sm ${
            success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {success ? "Profile updated successfully!" : error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-xl overflow-hidden">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </span>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={24} />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform"
              >
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <h2 className="text-xl font-bold font-heading text-neutral-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-neutral-500 text-sm font-heading mb-6">
              Ambassador
            </p>

            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold font-heading uppercase tracking-wider">
              <CheckCircle2 size={14} /> Verified Account
            </div>
          </div>

          <div className="bg-neutral-900 rounded-3xl p-8 text-white shadow-xl shadow-neutral-900/10">
            <div className="flex items-center gap-3 mb-4 font-heading">
              <Shield className="text-blue-400" />
              <h3 className="font-bold">Security</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Your account is secured with end-to-end encryption. You can change
              your password at any time.
            </p>
            <Button
              variant="ghost"
              className="w-full bg-white/10 hover:bg-white/20 text-white border-none text-xs"
            >
              Change Password
            </Button>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                icon={<User size={16} className="text-neutral-400" />}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                icon={<User size={16} className="text-neutral-400" />}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              disabled
              icon={<Mail size={16} className="text-neutral-400" />}
            />

            <div className="h-px bg-neutral-50"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                placeholder="+234 ..."
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                icon={<Phone size={16} className="text-neutral-400" />}
              />
              <Input
                label="University"
                placeholder="University of Lagos"
                value={formData.university}
                onChange={(e) =>
                  setFormData({ ...formData, university: e.target.value })
                }
                icon={<MapPin size={16} className="text-neutral-400" />}
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              {success && (
                <div className="flex items-center gap-2 text-green-600 font-bold font-heading text-sm animate-in fade-in slide-in-from-left-2">
                  <CheckCircle2 size={18} /> Profile updated!
                </div>
              )}
              <Button
                type="submit"
                className="ml-auto px-12 h-12"
                isLoading={loading}
                rightIcon={<Save size={18} />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
