import { useState, useRef } from 'react';

interface FaceTimeState {
  canSave: boolean;
  curImage: string | null;
  savedImages: { [key: string]: string };
}

export default function FaceTime() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [state, setState] = useState<FaceTimeState>({
    canSave: false,
    curImage: null,
    savedImages: {}
  });
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', aspectRatio: 16 / 9 },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraError(null);
    } catch (err) {
      setCameraError('Unable to access camera. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setState(prev => ({ ...prev, curImage: imageData, canSave: true }));
      }
    }
  };

  const savePhoto = () => {
    if (state.curImage) {
      const timestamp = Date.now().toString();
      setState(prev => ({
        ...prev,
        savedImages: { ...prev.savedImages, [timestamp]: prev.curImage! },
        canSave: false
      }));
    }
  };

  const retake = () => {
    setState(prev => ({ ...prev, curImage: null, canSave: false }));
  };

  const deleteImage = (key: string) => {
    setState(prev => {
      const newImages = { ...prev.savedImages };
      delete newImages[key];
      return { ...prev, savedImages: newImages };
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="h-full flex bg-zinc-900">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900/90 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-4 space-y-2">
          {!stream ? (
            <button
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={startCamera}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              Start Camera
            </button>
          ) : (
            <>
              <button
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                onClick={state.curImage ? retake : takePhoto}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="3.2"/>
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                </svg>
                {state.curImage ? 'Retake' : 'Take Photo'}
              </button>
              <button
                className={`w-full py-2 px-4 text-white text-sm rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  state.canSave 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-zinc-600 opacity-50 cursor-not-allowed'
                }`}
                disabled={!state.canSave}
                onClick={savePhoto}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                </svg>
                Save Photo
              </button>
              <button
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                onClick={stopCamera}
              >
                Stop Camera
              </button>
            </>
          )}
        </div>

        {/* Saved Photos */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-white/60 text-xs mb-2">Recent Photos</div>
          {Object.keys(state.savedImages).reverse().map(key => (
            <div
              key={key}
              className={`relative flex items-center gap-2 p-2 rounded-lg mb-2 cursor-pointer hover:bg-white/10 ${
                state.curImage === state.savedImages[key] ? 'bg-green-700/50' : ''
              }`}
              onClick={() => setState(prev => ({ ...prev, curImage: state.savedImages[key], canSave: false }))}
            >
              <img
                src={state.savedImages[key]}
                alt="saved"
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <div className="text-white text-sm">Photo</div>
                <div className="text-white/60 text-xs">{formatTime(key)}</div>
              </div>
              <button
                className="text-white/40 hover:text-white"
                onClick={(e) => { e.stopPropagation(); deleteImage(key); }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 bg-zinc-800 flex items-center justify-center relative">
        <canvas ref={canvasRef} className="hidden" />
        
        {cameraError ? (
          <div className="text-center text-white/60 p-8">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-4 opacity-50">
              <path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zM5 16l2.38-3.17L9 15l2.62-3.5L15 16H5z"/>
            </svg>
            <p>{cameraError}</p>
          </div>
        ) : !stream ? (
          <div className="text-center text-white/60">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-4 opacity-50">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
            <p>Click "Start Camera" to begin</p>
          </div>
        ) : state.curImage ? (
          <img
            src={state.curImage}
            alt="captured"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="max-w-full max-h-full object-contain"
            style={{ transform: 'scaleX(-1)' }}
          />
        )}
      </div>
    </div>
  );
}
