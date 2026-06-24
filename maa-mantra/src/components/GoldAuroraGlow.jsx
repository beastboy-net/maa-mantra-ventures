import './GoldAuroraGlow.css';

export default function GoldAuroraGlow({ children }) {
  return (
    <div className="gag-wrap">
      {/* Animated blobs */}
      <div className="gag-blob gag-blob--1" />
      <div className="gag-blob gag-blob--2" />
      <div className="gag-blob gag-blob--3" />

      {/* Static dot grid */}
      <div className="gag-dots" />

      {/* Content */}
      <div className="gag-content">
        {children}
      </div>
    </div>
  );
}
