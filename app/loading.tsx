export default function Loading() {
  const dots = Array.from({ length: 8 });

  return (
    <div className="relative w-16 h-16">
      {dots.map((_, i) => {
        const angle = (i * 360) / dots.length;
        const radius = 48;
        const delay = (i * 0.12).toFixed(2);

        return (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-dot-fade"
            style={{
              top: `${80 + radius * -Math.cos((angle * Math.PI) / 180)}%`,
              left: `${80 + radius * Math.sin((angle * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
