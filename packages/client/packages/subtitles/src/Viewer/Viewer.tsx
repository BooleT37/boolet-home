import classNames from "classnames";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import subtitleToFrames from "./utils/subtitleToFrames";
import tickToTime from "./utils/tickToTime";
import "./Viewer.css";

const DELTA = 500;

const Viewer: React.FC = () => {
  const [tick, setTick] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const interval = React.useRef<number>(null);
  const [frames, setFrames] = React.useState(null);
  const [initialFrames, setInitialFrames] = React.useState(null);
  const [step, setStep] = React.useState(DELTA);
  const [fontSize, setFontSize] = React.useState(60);
  const [interfaceShown, setIntefaceShown] = React.useState(true);
  const [eyeShown, setEyeShown] = React.useState(true);

  const play = React.useCallback(() => {
    setPlaying(true);
    interval.current = window.setInterval(() => {
      setTick((t) => t + DELTA);
    }, DELTA);
  }, []);

  const stop = React.useCallback(() => {
    setPlaying(false);
    clearInterval(interval.current);
  }, []);

  const frame = frames?.[0];

  const onSliderChange = React.useCallback(
    (e) => {
      const value = parseInt(e.target.value, 10);
      setTick(value);
      setFrames(initialFrames);
    },
    [initialFrames]
  );

  const onStepBackClick = React.useCallback(() => {
    setTick((t) => Math.max(t - step, 0));
    setFrames(initialFrames);
  }, [initialFrames, step]);

  const onFileChange = React.useCallback((e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const frames = subtitleToFrames(reader.result as string);
      setFrames(frames);
      setInitialFrames(frames);
      setTick(0);
    });
    reader.readAsText(e.target.files[0]);
  }, []);

  React.useEffect(() => {
    if (!frame || frame.startTime > tick) {
      return;
    }
    let index = 0;
    while (frames[index] && frames[index].endTime < tick) {
      index++;
    }
    if (index) {
      setFrames((f) => f.slice(index));
    }
  }, [frame, frames, tick]);

  const hideEyeTimeout = React.useRef<number | null>(null);

  const showEye = React.useCallback(() => {
    setEyeShown(true);
    if (hideEyeTimeout.current) {
      window.clearTimeout(hideEyeTimeout.current);
    }
    hideEyeTimeout.current = window.setTimeout(() => {
      setEyeShown(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    const listener = (): void => {
      showEye();
    };
    document.body.addEventListener("click", listener);
    showEye();
    return () => {
      document.body.removeEventListener("click", listener);
    };
  }, [showEye]);

  return (
    <div className="root">
      <div className="toggle-interface-wrapper">
        <button
          className={classNames("toggle-interface", {
            "toggle-interface-hidden": !eyeShown,
          })}
          onClick={() => {
            showEye();
            if (eyeShown) {
              setIntefaceShown((s) => !s);
            }
          }}
        >
          {interfaceShown ? (
            <FontAwesomeIcon icon={solid("eye")} />
          ) : (
            <FontAwesomeIcon icon={solid("eye-slash")} />
          )}
        </button>
      </div>
      <div className="text" style={{ fontSize }}>
        {frame?.startTime <= tick ? frame?.text : ""}
      </div>
      {interfaceShown && (
        <div>
          <input
            className="file-input"
            disabled={playing}
            type="file"
            accept=".srt"
            onChange={onFileChange}
          ></input>
          {initialFrames && (
            <div>
              <div>
                {playing ? (
                  <button className="button" onClick={stop}>
                    ⏹️
                  </button>
                ) : (
                  <button className="button" onClick={play}>
                    ▶️
                  </button>
                )}
              </div>
              <button className="step-button" onClick={onStepBackClick}>
                ⏪
              </button>
              <input
                type="range"
                value={tick}
                min={0}
                max={frames[frames.length - 1].endTime}
                step={DELTA}
                onChange={onSliderChange}
                className="input"
              />
              <button
                className="step-button"
                onClick={() => {
                  setTick((t) =>
                    Math.min(t + step, frames[frames.length - 1].endTime)
                  );
                }}
              >
                ⏩
              </button>
              <div className="time">{tickToTime(tick)}</div>
              <div>
                <button
                  className="reset"
                  onClick={() => {
                    setTick(0);
                  }}
                >
                  🔁
                </button>
                <fieldset className="steps">
                  <legend>step:</legend>
                  {step}
                  <button
                    onClick={() => {
                      setStep((s) => Math.max(s - DELTA, DELTA));
                    }}
                  >
                    ➖
                  </button>
                  <button
                    onClick={() => {
                      setStep((s) => s + DELTA);
                    }}
                  >
                    ➕
                  </button>
                </fieldset>
                <fieldset className="font-size">
                  <legend>font size:</legend>
                  <span>{fontSize}</span>
                  <button
                    onClick={() => {
                      setFontSize((s) => Math.max(s - 10, 10));
                    }}
                  >
                    ➖
                  </button>
                  <button
                    onClick={() => {
                      setFontSize((s) => s + 10);
                    }}
                  >
                    ➕
                  </button>
                </fieldset>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Viewer;
