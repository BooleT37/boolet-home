import classNames from "classnames";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import subtitleToFrames from "./utils/subtitleToFrames";
import tickToTime from "./utils/tickToTime";
import { Frame } from "./types";

import "./Viewer.css";

const TICK_DELTA = 500;

const round = (num: number, percision: number): number =>
  Math.round(num * Math.pow(10, percision)) / Math.pow(10, percision);

const Viewer: React.FC = () => {
  const [tick, setTick] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const interval = React.useRef<number>(null);
  const [frames, setFrames] = React.useState<Frame[]>(null);
  const [initialFrames, setInitialFrames] = React.useState<Frame[]>(null);
  const [step, setStep] = React.useState(TICK_DELTA);
  const [fontSize, setFontSize] = React.useState(60);
  const [interfaceShown, setIntefaceShown] = React.useState(true);
  const [eyeShown, setEyeShown] = React.useState(true);
  const [speed, setSpeed] = React.useState(1);
  const [speedDeltaPow, setSpeedDeltaPow] = React.useState(-1);

  const play = React.useCallback(() => {
    setPlaying(true);
    interval.current = window.setInterval(() => {
      setTick((t) => t + TICK_DELTA);
    }, TICK_DELTA);
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
    if (!frame || frame.startTime > tick * speed) {
      return;
    }
    let index = 0;
    while (frames[index] && frames[index].endTime < tick * speed) {
      index++;
    }
    if (index) {
      setFrames((f) => f.slice(index));
    }
  }, [frame, frames, tick, speed]);

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

  const speedDelta = Math.pow(10, speedDeltaPow);

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
        {frame?.startTime <= tick * speed ? frame?.text : ""}
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
                    <FontAwesomeIcon icon={solid("stop")} />
                  </button>
                ) : (
                  <button className="button" onClick={play}>
                    <FontAwesomeIcon icon={solid("play")} />
                  </button>
                )}
              </div>
              <button className="step-button button" onClick={onStepBackClick}>
                <FontAwesomeIcon icon={solid("backward")} />
              </button>
              <input
                type="range"
                value={tick}
                min={0}
                max={initialFrames[initialFrames.length - 1].endTime}
                step={TICK_DELTA}
                onChange={onSliderChange}
                className="input"
              />
              <button
                className="step-button button"
                onClick={() => {
                  setTick((t) =>
                    Math.min(
                      t + step,
                      initialFrames[initialFrames.length - 1].endTime
                    )
                  );
                }}
              >
                <FontAwesomeIcon icon={solid("forward")} />
              </button>
              <div className="time">
                {tickToTime(tick)}
                {speed !== 1
                  ? ` (adj.\u00A0${tickToTime(round(tick * speed, 0))})`
                  : null}
              </div>
              <div>
                <button
                  className="reset button"
                  onClick={() => {
                    setTick(0);
                  }}
                >
                  <FontAwesomeIcon icon={solid("repeat")} />
                </button>
                <fieldset className="fieldset">
                  <legend>step:</legend>
                  {step}
                  <button
                    onClick={() => {
                      setStep((s) => Math.max(s - TICK_DELTA, TICK_DELTA));
                    }}
                  >
                    <FontAwesomeIcon icon={solid("minus")} />
                  </button>
                  <button
                    onClick={() => {
                      setStep((s) => s + TICK_DELTA);
                    }}
                  >
                    <FontAwesomeIcon icon={solid("plus")} />
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
                    <FontAwesomeIcon icon={solid("minus")} />
                  </button>
                  <button
                    onClick={() => {
                      setFontSize((s) => s + 10);
                    }}
                  >
                    <FontAwesomeIcon icon={solid("plus")} />
                  </button>
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend>speed:</legend>
                  {speedDeltaPow > 0 ? speed : round(speed, -speedDeltaPow)}
                  <button
                    onClick={() => {
                      setSpeed((s) => Math.max(s - speedDelta, speedDelta));
                    }}
                  >
                    <FontAwesomeIcon icon={solid("minus")} />
                  </button>
                  <button
                    onClick={() => {
                      setSpeed((s) => s + speedDelta);
                    }}
                  >
                    <FontAwesomeIcon icon={solid("plus")} />
                  </button>
                </fieldset>
                <fieldset className="font-size">
                  <legend>speed delta:</legend>
                  <span>{round(speedDelta, -speedDeltaPow)}</span>
                  <button
                    onClick={() => {
                      setSpeedDeltaPow((s) => s - 1);
                    }}
                  >
                    <FontAwesomeIcon icon={solid("minus")} />
                  </button>
                  <button
                    onClick={() => {
                      setSpeedDeltaPow((s) => s + 1);
                    }}
                  >
                    <FontAwesomeIcon icon={solid("plus")} />
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
