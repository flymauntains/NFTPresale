import { motion } from "framer-motion";

export default function Rotate({
  children,
  value = 150,
  delay = 0.5,
  direction = "right",
  rotateStart = 0,
  RotateEnd = 0,
}) {
  const x = direction === "left" ? value : -value;
  return (
    <motion.span
      className="rotate inline-block"
      whileInView={{
        opacity: 1,
        x: 0,
        rotate: rotateStart,
        transition: {
          duration: 0.5,
          delay: delay,
          bounce: 0.5,
        },
      }}
      viewport={{ once: true }}
      initial={{ opacity: 0, x, rotate: RotateEnd }}
    >
      {children}
    </motion.span>
  );
}
