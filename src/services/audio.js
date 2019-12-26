import React, { useState, useEffect } from "react"

export const useAudio = () => {
  const [audio] = useState(
    new Audio(
      "https://d369ls1rsdbvlu.cloudfront.net/music/speeding%2Blooped.mp3"
    )
  )
  const [playing, setPlaying] = useState(true)
  const [hasPlayed, setHasPlayed] = useState(true)

  const toggle = () => {
    setPlaying(!playing)
    setHasPlayed(true)
  }

  const firstPlay = () => {
    if (!hasPlayed) {
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasPlayed(true)
            setPlaying(true)
          })
          .catch(error => {
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
            setPlaying(false)
            setHasPlayed(false)
          })
      }
    }
  }

  useEffect(() => {
    audio.loop = true

    const playPromise = playing ? audio.play() : audio.pause()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("auto playback started")
        })
        .catch(error => {
          console.log("auto playback failed")
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
          setPlaying(false)
          setHasPlayed(false)
        })
    }
  }, [audio, playing])

  return { playing, toggle, firstPlay }
}
