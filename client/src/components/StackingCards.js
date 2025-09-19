// src/components/StackingCards.js

import React from "react";
import "./StackingCards.css";

const cards = [
  {
    id: 1,
    title: "Connect with Neighbors",
    content: "Stay in touch with your community and build meaningful bonds.",
    bgColor: "#07A0CD",
    textColor: "#FFF8EE",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/80611947706491.58823268ec47a.gif",
  },
  {
    id: 2,
    title: "Share Bright Ideas",
    content: "Bring your ideas to life and inspire others around you.",
    bgColor: "#FFB501",
    textColor: "#0B0B0B",
    video:
      "https://cdnl.iconscout.com/lottie/premium/thumb/idea-sharing-animation-gif-download-6631748.mp4",
  },
  {
    id: 3,
    title: "Grow Together",
    content: "Collaborate, support, and grow stronger as a group.",
    bgColor: "#75B856",
    textColor: "#0B0B0B",
    video:
      "https://cdnl.iconscout.com/lottie/premium/thumb/collaboration-meeting-animation-gif-download-8049582.mp4",
  },
  {
    id: 4,
    title: "Celebrate Success",
    content: "Recognize achievements and share the joy of progress.",
    bgColor: "#FB5521",
    textColor: "#FFF8EE",
    video: "https://cdnl.iconscout.com/lottie/premium/thumb/business-team-celebrate-success-animation-gif-download-9416265.mp4",
  },
];

const StackingCards = () => {
  return (
    <div className="stack-container">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="stack-card"
          style={{
            background: card.bgColor,
            color: card.textColor,
            top: `${index * 50}px`,
            zIndex: index + 1,
          }}
        >
          {card.image ? (
            <img src={card.image} alt={card.title} className="card-media" />
          ) : card.video ? (
            <video
              src={card.video}
              className="card-media"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <div className="icon">{card.icon}</div>
          )}
          <h2>{card.title}</h2>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default StackingCards;
