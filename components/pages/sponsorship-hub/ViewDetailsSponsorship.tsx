import { Bus, Footprints, Pill, UtensilsCrossed, Calendar, X, Globe, Mail, Phone, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useSponsorshipDetail } from "@/hooks/useSponsorship";
import { formatCurrency, formatDate } from "@/lib/utils";

// Fake data for development
const fakeSponsorshipData = {
  id: "cm9xyzabc0001sponsorship",
  sponsorshipId: "sp_12345",
  brandName: "Nike",
  brandLogo: "https://example.com/nike-logo.png",
  category: "APPAREL",
  budget: 50000,
  currency: "USD",
  description: "Looking for content creators to promote our summer collection 2026. We need high-quality Instagram and TikTok content.",
  requirements: [
    "Minimum 10k followers on social media",
    "Previous brand partnership experience",
    "Content creation skills in video and photography",
    "Active engagement rate above 5%"
  ],
  startDate: "2026-06-01T00:00:00Z",
  endDate: "2026-08-31T23:59:59Z",
  status: "ACTIVE",
  applicationsCount: 24,
  contactEmail: "partnerships@nike.com",
  contactPhone: "+1-503-671-6453",
  website: "https://nike.com",
  socialLinks: {
    instagram: "https://instagram.com/nike",
    twitter: "https://twitter.com/nike",
    linkedin: "https://linkedin.com/company/nike"
  },
  termsAndConditions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  createdAt: "2026-04-15T10:30:00Z",
  updatedAt: "2026-05-07T14:22:00Z"
};

export default function ViewDetailsSponsorship({ id }: { id: string }) {
  const { data: sponsorshipDetail, isLoading, error } = useSponsorshipDetail(id);
  
  // Use fake data in development if API returns empty
  const sponsorship = process.env.NODE_ENV === 'development' && !sponsorshipDetail?.data 
    ? fakeSponsorshipData 
    : sponsorshipDetail?.data;




  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 p-5 rounded-2xl border border-white/10 bg-[#161616]">
        <div className="animate-pulse space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-700"></div>
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-700 rounded"></div>
                <div className="h-3 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="h-8 w-48 bg-gray-700 rounded"></div>
            <div className="h-16 w-full bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !sponsorship) {
    return (
      <div className="flex flex-col gap-5 p-5 rounded-2xl border border-red-500/30 bg-[#161616]">
        <div className="text-red-500 text-center">
          <p>Error loading sponsorship details</p>
          <p className="text-sm text-neutral-400 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!sponsorship) {
    return (
      <div className="flex flex-col gap-5 p-5 rounded-2xl border border-white/10 bg-[#161616]">
        <div className="text-neutral-400 text-center">
          No sponsorship details available
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      {/* Outer Card Container */}
      <div className="flex flex-col gap-5 p-5 rounded-2xl border border-white/10 bg-[#161616]">
        
        {/* Profile Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white">
              {sponsorship.brandLogo && sponsorship.brandLogo !== "https://example.com/nike-logo.png" ? (
                <Image 
                  src={sponsorship.brandLogo} 
                  alt={sponsorship.brandName} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#F6D642] to-[#D4A800] flex items-center justify-center">
                  <span className="text-black text-xl font-bold">{sponsorship.brandName?.[0]}</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{sponsorship.brandName}</h3>
              <p className="text-neutral-500 text-sm">{sponsorship.category}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
            sponsorship.status === 'ACTIVE' 
              ? 'border-[#22C55E] bg-[#22C55E]/10' 
              : 'border-[#2F80ED] bg-[#2F80ED]/10'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              sponsorship.status === 'ACTIVE' ? 'bg-[#22C55E]' : 'bg-[#2F80ED]'
            }`} />
            <span className={`text-xs font-medium ${
              sponsorship.status === 'ACTIVE' ? 'text-[#22C55E]' : 'text-[#2F80ED]'
            }`}>
              {sponsorship.status}
            </span>
          </div>
        </div>

        {/* Date & Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-neutral-500 text-sm">
            <Calendar size={14} />
            <span>{formatDate(sponsorship.startDate)} - {formatDate(sponsorship.endDate)}</span>
          </div>
          <h2 className="text-white text-xl font-bold uppercase tracking-tight">
            {sponsorship.brandName} Sponsorship Program
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            {sponsorship.description}
          </p>
        </div>

        {/* Budget */}
        <div className="p-3 bg-black/40 rounded-xl border border-white/5">
          <p className="text-neutral-400 text-xs">Budget</p>
          <p className="text-white text-xl font-bold">
            {formatCurrency(sponsorship.budget, sponsorship.currency)}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 justify-between">
          
        {/* Requirements */}
        {sponsorship.requirements && sponsorship.requirements.length > 0 && (
          <div className="space-y-2">
            <p className="text-neutral-400 text-xs font-medium">Requirements</p>
            <ul className="list-disc list-inside space-y-1">
              {sponsorship.requirements.map((req, index) => (
                <li key={index} className="text-white text-xs">{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2">
          <p className="text-neutral-400 text-xs font-medium">Contact Information</p>
          <div className="flex items-center gap-2 text-white text-sm">
            <Mail size={14} className="text-neutral-400" />
            <span>{sponsorship.contactEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <Phone size={14} className="text-neutral-400" />
            <span>{sponsorship.contactPhone}</span>
          </div>
          {sponsorship.website && (
            <div className="flex items-center gap-2 text-white text-sm">
              <Globe size={14} className="text-neutral-400" />
              <a href={sponsorship.website} target="_blank" rel="noopener noreferrer" 
                 className="hover:text-[#F6D642] transition-colors">
                {sponsorship.website}
              </a>
            </div>
          )}
        </div>
        </div>

        {/* Social Links */}
        {sponsorship.socialLinks && Object.keys(sponsorship.socialLinks).length > 0 && (
          <div className="space-y-2">
            <p className="text-neutral-400 text-xs font-medium">Social Links</p>
            <div className="flex gap-3">
              {sponsorship.socialLinks.instagram && (
                <a href={sponsorship.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                   className="text-neutral-400 hover:text-[#F6D642] transition-colors text-sm flex items-center gap-1">
                  Instagram <ExternalLink size={12} />
                </a>
              )}
              {sponsorship.socialLinks.twitter && (
                <a href={sponsorship.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                   className="text-neutral-400 hover:text-[#F6D642] transition-colors text-sm flex items-center gap-1">
                  Twitter <ExternalLink size={12} />
                </a>
              )}
              {sponsorship.socialLinks.linkedin && (
                <a href={sponsorship.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                   className="text-neutral-400 hover:text-[#F6D642] transition-colors text-sm flex items-center gap-1">
                  LinkedIn <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Applications Count */}
        <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
          <span className="text-neutral-400 text-sm">Applications Received</span>
          <span className="text-white font-bold text-lg">{sponsorship.applicationsCount}</span>
        </div>

        {/* Terms & Conditions */}
        {sponsorship.termsAndConditions && (
          <div className="space-y-1">
            <p className="text-neutral-400 text-xs font-medium">Terms & Conditions</p>
            <p className="text-neutral-500 text-xs leading-relaxed">
              {sponsorship.termsAndConditions}
            </p>
          </div>
        )}

        {/* Contact Button */}
        <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors mt-2">
          Contact {sponsorship.brandName}
        </button>
      </div>

      {/* Footer Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="py-3 bg-[#EB5757] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all">
          Reject
        </button>
        <button className="py-3 bg-[#6366F1] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all">
          Approve
        </button>
      </div>
    </div>
  );
}