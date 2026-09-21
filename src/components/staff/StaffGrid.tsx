"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, GraduationCap } from 'lucide-react';

interface StaffMember {
  name: string;
  role: string;
  university?: string;
  universities?: string[];
  expertise?: string;
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
      className={`grid grid-cols-1 sm:grid-cols-2 ${members.length <= 2 ? 'max-w-3xl' : 'lg:grid-cols-3 max-w-[300px] sm:max-w-none'} gap-6 sm:gap-8 mx-auto`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {members.map((member, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
        >
          {/* Photo */}
          <div className={`relative w-full h-64 sm:h-auto sm:aspect-[3/4] overflow-hidden bg-gradient-to-br ${member.color}`}>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/60 via-transparent to-transparent"></div>
          </div>

          {/* Info */}
          <div className="p-4 sm:p-6 flex flex-col gap-1.5 sm:gap-2 flex-1 justify-between">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">{member.name}</h3>
              
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--color-secondary)]">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span>{member.role}</span>
              </div>
            </div>

            {/* Universities */}
            <div className="flex flex-col gap-1 mt-1">
              {member.universities && member.universities.length > 0 ? (
                member.universities.map((uni, uIdx) => (
                  <div key={uIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl">
                    <GraduationCap className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{uni}</span>
                  </div>
                ))
              ) : member.university ? (
                <div className="flex items-start gap-1.5 text-[11px] sm:text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl">
                  <GraduationCap className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{member.university}</span>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
