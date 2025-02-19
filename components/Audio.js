// AudioPlayer.js
import React, { useEffect, useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Rewind,
  FastForward,
  Play,
  Pause,
  X, // Import the X icon
} from "lucide-react";
import { Typography } from "@mui/material";

const AudioPlayer = React.forwardRef((props, ref) => {
  const {
    audioUrl,
    isPlaying,
    currentTime,
    duration,
    onPlayPause,
    onSeek,
    onSkipTime,
  } = props;
  const audioRef = useRef(null);
  const [localIsPlaying, setLocalIsPlaying] = useState(isPlaying);
  const [localCurrentTime, setLocalCurrentTime] = useState(currentTime);
  const [localDuration, setLocalDuration] = useState(duration);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [timeInput, setTimeInput] = useState("");
  const [isVisible, setIsVisible] = useState(true); // New state for visibility

  useEffect(() => {
    if (ref) {
      ref.current = audioRef.current;
    }
  }, [ref]);

  useEffect(() => {
    setLocalIsPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    setLocalCurrentTime(currentTime);
  }, [currentTime]);

  useEffect(() => {
    setLocalDuration(duration);
  }, [duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setLocalDuration(audio.duration);
      setTimeInput(formatDetailedTime(0));
    };

    const handleTimeUpdate = () => {
      if (!isSeeking) {
        setLocalCurrentTime(audio.currentTime);
        setTimeInput(formatDetailedTime(audio.currentTime));
      }
    };

    const handleEnded = () => {
      setLocalIsPlaying(false);
      setLocalCurrentTime(0);
      setTimeInput(formatDetailedTime(0));
      if (onPlayPause) {
        onPlayPause();
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isSeeking, onPlayPause]);

  const formatDetailedTime = (time) => {
    if (isNaN(time)) return "00:00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  const parseTimeInput = (timeString) => {
    const [time, ms] = timeString.split(".");
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds + (ms ? Number(ms) / 100 : 0);
  };

  const handleTimeInputChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleTimeInputBlur = () => {
    try {
      const newTime = parseTimeInput(timeInput);
      if (!isNaN(newTime) && newTime >= 0 && newTime <= localDuration) {
        if (audioRef.current) {
          audioRef.current.currentTime = newTime;
        }

        setLocalCurrentTime(newTime);
      } else {
        setTimeInput(formatDetailedTime(localCurrentTime));
      }
    } catch (error) {
      setTimeInput(formatDetailedTime(localCurrentTime));
    }
  };

  const handleTimeInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTimeInputBlur();
    }
  };

  const handleSeek = (event) => {
    const newTime = parseFloat(event.target.value);
    setLocalCurrentTime(newTime);
    setTimeInput(formatDetailedTime(newTime));
    if (onSeek) {
      onSeek(event);
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = (event) => {
    const newTime = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setLocalCurrentTime(newTime);
      setTimeInput(formatDetailedTime(newTime));
    }
    setIsSeeking(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skipTime = (seconds) => {
    if (onSkipTime) {
      onSkipTime(seconds);
    }
  };

  const changePlaybackRate = (rate) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }

    setPlaybackRate(rate);
  };

  // Function to close the audio player
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Don't render anything if not visible
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md m-2 mr pr-2 relative">
      {" "}
      {/* Added relative for absolute positioning */}
      <audio ref={audioRef} src={audioUrl} />
      <Typography>Benim Sesimden Dinleyin💫</Typography>
      {/* Close Button (X icon) - Absolute position in top right corner */}
      <div className="pb-3">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-2 ml-4 hover:bg-black text-black bg-transparent rounded-full transition"
        >
          <X className="w-5 h-5 bg-transparent" />
        </button>
      </div>
      {/* Time Display and Input */}
      <div className="flex flex-col items-center mb-2">
        {/* Current time display and input */}
        <div className="flex items-center mb-2 w-full">
          <input
            type="text"
            value={timeInput}
            onChange={handleTimeInputChange}
            onBlur={handleTimeInputBlur}
            onKeyDown={handleTimeInputKeyDown}
            className="bg-gray-200 px-2 py-1 rounded text-sm font-mono w-32 text-center"
            title="Format: HH:MM:SS.ms"
          />
          <span className="text-sm text-gray-600 ml-2">
            / {formatDetailedTime(localDuration)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-4 w-full">
          <input
            type="range"
            min="0"
            max={localDuration}
            step="0.01"
            value={localCurrentTime}
            onChange={handleSeek}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center space-x-4 w-full">
          <button
            onClick={() => skipTime(-10)}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <Rewind className="w-5 h-5" />
          </button>

          <button
            onClick={onPlayPause}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            {localIsPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => skipTime(10)}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <FastForward className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 w-full">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <select
            value={playbackRate}
            onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
            className="bg-gray-200 rounded px-2 py-1 text-sm"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export default AudioPlayer;
