"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, Star } from 'lucide-react';

interface StaffMember {
  name: string;
  role: string;
  expertise: string;
  photo: string;
  color: string;
}

interface StaffGridProps {
  members: StaffMember[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function StaffGrid({ members }: StaffGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {members.map((member, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Photo */}
          <div className={`relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br ${member.color}`}>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/60 via-transparent to-transparent"></div>
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-1">{member.name}</h3>
            <div className="flex items-center gap-1.5 mb-3">
              <Briefcase className="w-4 h-4 text-[var(--color-secondary)] flex-shrink-0" />
              <span className="text-sm font-semibold text-[var(--color-secondary)]">{member.role}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-500 leading-relaxed">{member.expertise}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
