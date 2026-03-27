import { Bus, Footprints, Pill, UtensilsCrossed, Calendar, X } from "lucide-react";
import Image from "next/image";

export default function ViewDetailsSponsorship() {
  return (
    <div className="">
        {/* flex flex-col gap-6 w-full max-w-lg bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 */}
      {/* Outer Card Container */}
      <div className="flex flex-col gap-5 p-5 rounded-2xl border border-white/10 bg-[#161616]">
        
        {/* Profile Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white">
               <Image src="/avatars/jordan.jpg" alt="Profile" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Jordan Davies</h3>
              <p className="text-neutral-500 text-sm">Sydney · Age 29</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#2F80ED] bg-[#2F80ED]/10">
            <div className="w-2 h-2 rounded-full bg-[#2F80ED]" />
            <span className="text-[#2F80ED] text-xs font-medium">Open</span>
          </div>
        </div>

        {/* Date & Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-neutral-500 text-sm">
            <Calendar size={14} />
            <span>Mar 10, 2026</span>
          </div>
          <h2 className="text-white text-3xl font-bold uppercase tracking-tight font-serif">
            Run Across Australia
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            A 4,000km solo run from Perth to Sydney raising awareness for mental health in sport. 
            Looking for brands who share the vision of pushing beyond limits.
          </p>
        </div>

        {/* Needs Grid */}
        <div className="grid grid-cols-2 gap-3 m">
          <NeedItem icon={<Footprints size={18} />} title="Footwear" desc="Trail running shoes" />
          <NeedItem icon={<UtensilsCrossed size={18} />} title="Nutrition" desc="Gel, Hydration" />
          <NeedItem icon={<Bus size={18} />} title="Transport" desc="Support Vehicle" />
          <NeedItem icon={<Pill size={18} />} title="Suppliments" desc="Recovery" />
        </div>

        {/* Contact Button */}
        <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors mt-2">
          Contact Jordan to Sponsor
        </button>
      </div>

      {/* Footer Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="py-4 bg-[#EB5757] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all">
          Reject
        </button>
        <button className="py-4 bg-[#6366F1] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all">
          Approve
        </button>
      </div>
    </div>
  );
}

function NeedItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
      <div className="text-neutral-400">{icon}</div>
      <div>
        <p className="text-white text-sm font-semibold">{title}</p>
        <p className="text-neutral-500 text-[11px]">{desc}</p>
      </div>
    </div>
  );
}