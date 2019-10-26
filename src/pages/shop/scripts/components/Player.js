import React from "react";

export default function Player(props) {
  const { audio } = props;
  const { playing, toggle } = audio;

  return (
    <button className="player-toggle" onClick={toggle}>
      {playing ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
    </button>
  );
}
