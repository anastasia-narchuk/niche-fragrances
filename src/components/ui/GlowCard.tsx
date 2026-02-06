import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlowCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverable?: boolean;
}

export function GlowCard({
  children,
  className,
  glowColor = 'rgba(201, 169, 110, 0.15)',
  hoverable = true,
  ...props
}: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm',
        'transition-all duration-300',
        hoverable && 'cursor-pointer hover:bg-white/[0.06] hover:border-gold/30',
        className
      )}
      whileHover={hoverable ? {
        y: -2,
        boxShadow: `0 0 30px ${glowColor}`,
      } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
